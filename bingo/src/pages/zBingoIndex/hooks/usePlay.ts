import {
  BigNumberJs,
  ChainId,
  ChainRpcUrls,
  getProvider,
  getWeb3Sign,
  GlobalVar,
  refreshBalanceState,
  SetterOrUpdater,
  sleep,
  txStatus,
  useAccountInvitation,
  usePublicNodeWaitForTransaction,
  useRecoilState,
  useSetRecoilState,
  useWalletHandler
} from '@ui/src'
import { ethers } from 'ethers'
import { sample } from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TransactionReceipt } from 'viem'
import { Address } from 'wagmi'

import { gasPrice } from '@/constants/constants'
import bingoCard from '@/contract/bingoCard'
import bingoLobby, { bingoLobbyFromRpc } from '@/contract/bingoLobby'
import { useActiveWeb3ReactForBingo } from '@/hooks/useActiveWeb3ReactForBingo'
import { useChainIdParams } from '@/hooks/useChainIdParams'
import { gameRoomState, GameRoomStateType, IBingoVersion, joinGameState, JoinGameStateType, startGameStep } from '@/pages/state/state'
import { env } from '@/utils/config'
import generateCardNumbers, { CardNumbersType } from '@/utils/generateCardNumbers'
import { ILocalPathUrl, localPathUrl } from '@/utils/localPathUrl'
import { toBingoPlayHref } from '@/utils/toBingoHref'

export const usePlay = () => {
  const [, setCurrentStep] = useRecoilState(startGameStep)
  const chainIdParams = useChainIdParams()
  const navigate = useNavigate()
  useWalletHandler()
  const { account, chainId, bingoVersion } = useActiveWeb3ReactForBingo()
  const [_joinGame, _setJoinGameState] = useRecoilState(joinGameState)
  const [cardNumbers, setCardNumbers] = useState(generateCardNumbers({ cols: 5, rows: 5, minNum: 1, maxNum: 35 }))
  const [gameRoom, setGameRoom] = useRecoilState(gameRoomState)
  const { waitForTransaction } = usePublicNodeWaitForTransaction(env)
  const { postAccountUpdate } = useAccountInvitation(env)
  const [refreshBalance, setRefreshBalanceState] = useRecoilState(refreshBalanceState)
  const playInTg = async () => {
    let joinGame = _joinGame
    try {
      if (!chainId || !account || !GlobalVar.walletClient) {
        console.log(1)
        return
      }
      const lobbyContract = bingoLobby({
        chainId,
        env,
        bingoVersion,
        walletClient: GlobalVar.walletClient
      })
      const label = await lobbyContract.read.getNextKeyLabel([account])
      const signedLabel = await getWeb3Sign(label, account, false, GlobalVar.walletClient)
      if (typeof signedLabel === 'string') {
        joinGame = {
          ...joinGame,
          signedLabel
        }
      }

      const cardContract = bingoCard({
        chainId,
        env,
        bingoVersion,
        walletClient: GlobalVar.walletClient
      })
      const cardNums = cardNumbers.reduce(
        (prev, curr) => {
          prev[curr.row - 1].push(curr.num)
          return prev
        },
        [[], [], [], [], []] as number[][]
      )
      console.log(4, cardNums)
      const encodedNumbers = await cardContract.read.encodeCardNumbers([cardNums])
      console.log(5, { encodedNumbers, joinGame: joinGame.signedLabel })
      const hashedCardBytes = ethers.utils.hexConcat([
        '0x456e7472797074656420436172643a20', // 'Encrypted Card: '
        joinGame.signedLabel,
        encodedNumbers
      ])
      console.log(5)
      const signedCard = await getWeb3Sign(hashedCardBytes, account, true, GlobalVar.walletClient)
      console.log(6)
      if (typeof signedCard === 'string') {
        joinGame = {
          ...joinGame,
          signedCard: signedCard
        }
      }
      console.log(5)
      setGameRoom(room => ({
        ...room,
        cardNumbers
      }))
      _setJoinGameState(joinGame)
      if (!chainId || !account || !GlobalVar.walletClient) {
        console.log(`submitCardBeta1`, !chainId, !account, !GlobalVar.walletClient)
        throw Object.assign(new Error('Not Ready'))
      }
      console.log(`submitCardBeta2`)
      console.log(`submitCardBeta3`)
      const provider = await getProvider(sample(ChainRpcUrls[chainId]))
      const bingoLobbyContract = await bingoLobbyFromRpc({
        chainId,
        bingoVersion,
        library: provider,
        account
      })
      console.log(`submitCardBeta4`)
      const [lineupUsers] = await bingoLobbyContract.functions.lineupUsers()
      if (lineupUsers && lineupUsers.length && lineupUsers.map((v: string) => v.toLowerCase()).includes(account.toLowerCase())) {
        const txn = await lobbyContract.write.leave({
          account: account,
          maxFeePerGas: gasPrice[chainId],
          maxPriorityFeePerGas: gasPrice[chainId]
        })
        console.log(`submitCardBeta5`)
        const hash = typeof txn === 'string' ? txn : txn.hash
        const leaveTx: TransactionReceipt | undefined = await waitForTransaction({ confirmations: 1, hash })
        if (leaveTx && leaveTx.status === txStatus) {
          postAccountUpdate({ tx: leaveTx })
        } else {
          throw Object.assign(new Error('Leave Transaction Failed'), {
            name: 'Leave'
          })
        }
      }
      const localpath = localPathUrl(chainId)
      let res
      if (
        localpath === ILocalPathUrl.COMBO ||
        localpath === ILocalPathUrl.MANTA ||
        localpath === ILocalPathUrl.MANTLE ||
        localpath === ILocalPathUrl.TaikoHeklaTestnet9 ||
        localpath === ILocalPathUrl.Hypr
      ) {
        const donationFee = await bingoLobbyContract.functions.joinFee()
        res = await lobbyContract.write.join([joinGame.signedCard], {
          value: new BigNumberJs(donationFee).toString(),
          account: account,
          maxFeePerGas: gasPrice[chainId],
          maxPriorityFeePerGas: gasPrice[chainId]
        })
      } else {
        // 0x519ea991d62f74be98529a3c6bf8b021c978b6d97f8a06587290f6042e944adc2378ce88073ff1a9761a7f921d5207da66b61e0194484b43b3f0083f8d3e671c1c
        console.log(`submitCardBeta6`, joinGame.signedCard)
        try {
          res = await lobbyContract.write.join([joinGame.signedCard], {
            account: account,
            maxFeePerGas: gasPrice[chainId],
            maxPriorityFeePerGas: gasPrice[chainId]
          })
        } catch (e) {
          throw e
        }
        console.log(`submitCardBeta7`, res)
      }
      console.log({ res })
      const hash = typeof res === 'string' ? res : res.hash
      const joinTx: TransactionReceipt | undefined = await waitForTransaction({
        confirmations: 1,
        hash
      })
      if (joinTx && joinTx.status === txStatus) {
        postAccountUpdate({ tx: joinTx })
        setRefreshBalanceState(refreshBalance + 1)
        setCurrentStep(3)
        toBingoPlayHref({
          chainIdParams,
          navigate
        })
      } else {
        throw Object.assign(new Error('Join Transaction Failed'), {
          name: 'Join'
        })
      }
    } catch (e) {
      throw e
    }
  }
  return { playInTg }
}

export const useGetSignedLabel = () => {
  const { account, chainId, bingoVersion } = useActiveWeb3ReactForBingo()
  const setJoinGameState = useSetRecoilState(joinGameState)

  const getSignedLabel = () => getSignedLabelFn({ chainId, account, bingoVersion, setJoinGameState })
  return {
    getSignedLabel
  }
}

export const useGetSignedCard = () => {
  const { account, chainId, bingoVersion } = useActiveWeb3ReactForBingo()
  const [joinGame, setJoinGameState] = useRecoilState(joinGameState)
  const [, setGameRoom] = useRecoilState(gameRoomState)
  const getSignedCard = (cardNumbers: CardNumbersType) =>
    getSignedCardFn({
      chainId,
      account,
      bingoVersion,
      setJoinGameState,
      joinGame,
      setGameRoom,
      cardNumbers
    })
  return { getSignedCard }
}
export const useGeSubmitCard = () => {
  const { account, chainId, bingoVersion } = useActiveWeb3ReactForBingo()

  const { waitForTransaction } = usePublicNodeWaitForTransaction(env)
  const { postAccountUpdate } = useAccountInvitation(env)
  const [joinGame] = useRecoilState(joinGameState)
  const [refreshBalance, setRefreshBalanceState] = useRecoilState(refreshBalanceState)
  const submitCardBeta = () =>
    submitCardBetaFn({
      chainId,
      account,
      bingoVersion,
      waitForTransaction,
      postAccountUpdate,
      joinGame,
      setRefreshBalanceState,
      refreshBalance
    })
  return {
    submitCardBeta
  }
}
const getSignedCardFn = async ({
  chainId,
  account,
  bingoVersion,
  setJoinGameState,
  joinGame,
  setGameRoom,
  cardNumbers
}: {
  chainId: ChainId
  account?: Address
  bingoVersion: IBingoVersion
  setJoinGameState: SetterOrUpdater<JoinGameStateType>
  joinGame: JoinGameStateType
  setGameRoom: SetterOrUpdater<GameRoomStateType>
  cardNumbers: CardNumbersType
}) => {
  console.log(1)
  if (!chainId || !account || !GlobalVar.walletClient) {
    return
  }
  console.log(2)
  const cardContract = bingoCard({
    chainId,
    env,
    bingoVersion,
    walletClient: GlobalVar.walletClient
  })
  console.log(3)
  const cardNums = cardNumbers.reduce(
    (prev, curr) => {
      prev[curr.row - 1].push(curr.num)
      return prev
    },
    [[], [], [], [], []] as number[][]
  )
  console.log(4, cardNums)
  const encodedNumbers = await cardContract.read.encodeCardNumbers([cardNums])
  console.log(5, { encodedNumbers, joinGame: joinGame.signedLabel })
  const hashedCardBytes = ethers.utils.hexConcat([
    '0x456e7472797074656420436172643a20', // 'Encrypted Card: '
    joinGame.signedLabel,
    encodedNumbers
  ])
  console.log(5)
  const signedCard = await getWeb3Sign(hashedCardBytes, account, true, GlobalVar.walletClient)
  console.log(6)
  if (typeof signedCard === 'string') {
    setJoinGameState(state => ({
      ...state,
      signedCard: signedCard
    }))
  }
  console.log(5)
  setGameRoom(room => ({
    ...room,
    cardNumbers
  }))
}
const getSignedLabelFn = async ({
  chainId,
  account,
  bingoVersion,
  setJoinGameState
}: {
  chainId: ChainId
  account?: Address
  bingoVersion: IBingoVersion
  setJoinGameState: any
}) => {
  if (!account) {
    return
  }
  const lobbyContract = bingoLobby({ chainId, env, bingoVersion })
  const label = await lobbyContract.read.getNextKeyLabel([account])
  const signedLabel = await getWeb3Sign(label, account, false, GlobalVar.walletClient)
  if (typeof signedLabel === 'string') {
    setJoinGameState((state: JoinGameStateType) => ({
      ...state,
      signedLabel
    }))
  }
}
const submitCardBetaFn = async ({
  chainId,
  account,
  bingoVersion,
  waitForTransaction,
  postAccountUpdate,
  joinGame,
  setRefreshBalanceState,
  refreshBalance
}: {
  chainId: ChainId
  account?: Address
  bingoVersion: IBingoVersion
  waitForTransaction: any
  postAccountUpdate: any
  joinGame: JoinGameStateType
  setRefreshBalanceState: any
  refreshBalance: any
}): Promise<string | undefined> => {
  if (!chainId || !account || !GlobalVar.walletClient) {
    console.log(`submitCardBeta1`, !chainId, !account, !GlobalVar.walletClient)
    throw Object.assign(new Error('Not Ready'))
  }
  console.log(`submitCardBeta2`)
  const lobbyContract = bingoLobby({
    chainId,
    env,
    bingoVersion,
    walletClient: GlobalVar.walletClient
  })
  console.log(`submitCardBeta3`)
  const provider = await getProvider(sample(ChainRpcUrls[chainId]))
  const bingoLobbyContract = await bingoLobbyFromRpc({
    chainId,
    bingoVersion,
    library: provider,
    account
  })
  console.log(`submitCardBeta4`)
  const [lineupUsers] = await bingoLobbyContract.functions.lineupUsers()
  if (lineupUsers && lineupUsers.length && lineupUsers.map((v: string) => v.toLowerCase()).includes(account.toLowerCase())) {
    const txn = await lobbyContract.write.leave({
      account: account,
      maxFeePerGas: gasPrice[chainId],
      maxPriorityFeePerGas: gasPrice[chainId]
    })
    console.log(`submitCardBeta5`)
    const hash = typeof txn === 'string' ? txn : txn.hash
    const leaveTx: TransactionReceipt | undefined = await waitForTransaction({ confirmations: 1, hash })
    if (leaveTx && leaveTx.status === txStatus) {
      postAccountUpdate({ tx: leaveTx })
    } else {
      throw Object.assign(new Error('Leave Transaction Failed'), {
        name: 'Leave'
      })
    }
  }
  const localpath = localPathUrl(chainId)
  let res
  if (
    localpath === ILocalPathUrl.COMBO ||
    localpath === ILocalPathUrl.MANTA ||
    localpath === ILocalPathUrl.MANTLE ||
    localpath === ILocalPathUrl.TaikoHeklaTestnet9 ||
    localpath === ILocalPathUrl.Hypr
  ) {
    const donationFee = await bingoLobbyContract.functions.joinFee()
    res = await lobbyContract.write.join([joinGame.signedCard], {
      value: new BigNumberJs(donationFee).toString(),
      account: account,
      maxFeePerGas: gasPrice[chainId],
      maxPriorityFeePerGas: gasPrice[chainId]
    })
  } else {
    // 0x519ea991d62f74be98529a3c6bf8b021c978b6d97f8a06587290f6042e944adc2378ce88073ff1a9761a7f921d5207da66b61e0194484b43b3f0083f8d3e671c1c
    console.log(`submitCardBeta6`, joinGame.signedCard)
    res = await lobbyContract.write.join([joinGame.signedCard], {
      account: account,
      maxFeePerGas: gasPrice[chainId],
      maxPriorityFeePerGas: gasPrice[chainId]
    })
    console.log(`submitCardBeta7`, res)
  }
  console.log({ res })
  const hash = typeof res === 'string' ? res : res.hash
  const joinTx: TransactionReceipt | undefined = await waitForTransaction({
    confirmations: 1,
    hash
  })
  if (joinTx && joinTx.status === txStatus) {
    postAccountUpdate({ tx: joinTx })
    setRefreshBalanceState(refreshBalance + 1)
    return joinTx.blockHash
  } else {
    throw Object.assign(new Error('Join Transaction Failed'), {
      name: 'Join'
    })
  }
}
