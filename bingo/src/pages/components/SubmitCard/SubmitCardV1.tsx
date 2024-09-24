import { LoadingOutlined } from '@ant-design/icons'
import {
  aaApproveAndFcErc20,
  BigNumberJs,
  ChainRpcUrls,
  erc20Contract,
  getProvider,
  IContractName,
  LngNs,
  MulticallMessageItem,
  pointsBalanceState,
  pointsDialogState,
  preStaticUrl,
  refreshBalanceState,
  txStatus,
  useAaWallet,
  useAccountInvitation,
  useCustomTranslation,
  useIsTelegram,
  useIsW768,
  usePublicNodeWaitForTransaction,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
  zkBingo
} from '@ui/src'
import { Col, message, Row, Space } from 'antd'
import BigNumber from 'bignumber.js'
import { sample } from 'lodash'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { encodeFunctionData, formatEther, Hash } from 'viem'
import { TransactionReceipt } from 'viem'

import BingoBoardView from '@/components/BingoBoardView'
import { gasPrice } from '@/constants/constants'
import bingoLobby, { bingoLobbyFromRpc, getBingoLobbyAbi } from '@/contract/bingoLobby'
import { useActiveWeb3ReactForBingo } from '@/hooks/useActiveWeb3ReactForBingo'
import { ButtonPrimary } from '@/pages/components/Button'
import { gameRoomState, joinGameState, startGameStep } from '@/pages/state/state'
import { env } from '@/utils/config'
import { setErrorToast, setSuccessToast } from '@/utils/Error/setErrorToast'

import { SetUpSubText } from '../Text'
import { AmountValue, BingoCardView, BoxWrap, CardBack, CheckableTag, FlexCenter, SubmitCardEle, Tip, Title, ViewCard } from './SubmitCard.style'

const SubmitCardV1 = () => {
  const IS_TELEGRAM = useIsTelegram()
  const { t } = useCustomTranslation([LngNs.zBingo])
  const [pending, setPending] = useState(false)
  const isMobile = useIsW768()
  const [joinGame] = useRecoilState(joinGameState)
  const [activeLevels, setActiveLevels] = useState([])
  const [winRate, setWinRate] = useState(0)
  const [level, setLevel] = useState(0)
  const { account, chainId, bingoVersion } = useActiveWeb3ReactForBingo()
  const [gameRoom] = useRecoilState(gameRoomState)
  const [refreshBalance, setRefreshBalanceState] = useRecoilState(refreshBalanceState)
  const setCurrentStep = useSetRecoilState(startGameStep)
  const { postAccountUpdate } = useAccountInvitation(env)
  const [isCard, setIsCard] = useState(false)
  const { wallet, aaWalletClient: walletClient, aa, aa_mm_address } = useAaWallet()

  const { waitForTransaction } = usePublicNodeWaitForTransaction(env)
  const pointsBalance = useRecoilValue(pointsBalanceState)
  const disable = useMemo(() => {
    if (activeLevels[level]) {
      return Number(formatEther((activeLevels[level] as any).betSize)) > pointsBalance
    }
    return false
  }, [pointsBalance, level, activeLevels])
  const setPointsDialogState = useSetRecoilState(pointsDialogState)
  const showPointsModal = useCallback(() => {
    setPointsDialogState(true)
  }, [setPointsDialogState])
  const [isApprove, setIsApprove] = useState(false)
  useEffect(() => {
    if (chainId && account && walletClient && activeLevels.length) {
      getApprove()
    }
  }, [chainId, account, walletClient, activeLevels, level])
  const getApprove = useCallback(async () => {
    if (chainId && aa_mm_address && walletClient && activeLevels) {
      const GPAddress = zkBingo(chainId, IContractName.ZypherGameToken)
      const FeeAddress = zkBingo(chainId, IContractName.Fee)
      const GpContract = erc20Contract(chainId, env, GPAddress, walletClient)
      const allowance = await GpContract.read.allowance([aa_mm_address, FeeAddress])
      const { betSize: tokenAmount } = activeLevels[level] as any
      if (new BigNumber(allowance.toString()).lt(tokenAmount.toString())) {
        setIsApprove(false)
      } else {
        setIsApprove(true)
      }
    }
  }, [chainId, activeLevels, walletClient, level, aa_mm_address])
  const getActiveLevels = useCallback(async () => {
    const provider = await getProvider(sample(ChainRpcUrls[chainId]))
    const bingoLobbyContract = await bingoLobbyFromRpc({
      chainId,
      bingoVersion,
      library: provider,
      account: aa_mm_address
    })
    const { list, wins } = await bingoLobbyContract.functions.activeLevels()
    setActiveLevels(list)
    setWinRate(wins.toNumber())
  }, [chainId, aa_mm_address, walletClient, bingoVersion])
  useEffect(() => {
    getActiveLevels()
  }, [chainId, account, walletClient, bingoVersion])
  // Cannot destructure property 'betSize' of 'activeLevels[level]' as it is undefined.
  const handleSubmitCard = async () => {
    if (!chainId || !aa_mm_address || !walletClient || !activeLevels.length) {
      if (chainId && aa_mm_address && !activeLevels.length) {
        getActiveLevels()
      }
      return
    }
    setPending(true)
    const lobbyContract = bingoLobby({
      chainId,
      env,
      bingoVersion,
      walletClient
    })
    try {
      console.log({ aa_mm_address })
      const GPAddress = zkBingo(chainId, IContractName.ZypherGameToken)
      const ZkBingoFee = zkBingo(chainId, IContractName.Fee)
      // const lineupUsers = await lobbyContract.read.lineupUsers()
      const provider = await getProvider(sample(ChainRpcUrls[chainId]))
      const bingoLobbyContract = await bingoLobbyFromRpc({
        chainId,
        bingoVersion,
        library: provider,
        account: aa_mm_address
      })
      const [lvId, lineupUsers] = await bingoLobbyContract.functions.lineupUsers()
      if (lineupUsers.map((v: string) => v.toLowerCase()).includes(aa_mm_address.toLowerCase())) {
        const txn = await lobbyContract.write.leave({
          account: account,
          maxFeePerGas: gasPrice[chainId],
          maxPriorityFeePerGas: gasPrice[chainId]
        })
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
      const GpContract = erc20Contract(chainId, env, GPAddress, walletClient)
      const { betSize: tokenAmount, level: realLevel } = activeLevels[level] as any
      const donationFee = await bingoLobbyContract.functions.donationFee()
      console.log({ donationFee: new BigNumberJs(donationFee).toString() })
      let hash = '' as Hash
      if (account && aa && wallet) {
        const lobbyAddress = zkBingo(chainId, IContractName.Lobby)
        const joinData = await (async () => {
          const lobbyAbi = getBingoLobbyAbi({ bingoVersion })
          return encodeFunctionData({ abi: lobbyAbi, args: [realLevel, joinGame.signedCard], functionName: 'join' })
        })()
        const donationFeeBig = new BigNumberJs(donationFee)
        const otherFc: MulticallMessageItem[] = []
        if (!donationFeeBig.eq(0)) {
          const transactionResponse = await walletClient.sendTransaction({
            to: aa_mm_address,
            value: donationFeeBig.toString()
          })
        }
        otherFc.push({
          from: aa_mm_address,
          to: lobbyAddress,
          data: joinData,
          value: BigInt(donationFee)
        })
        hash = await aaApproveAndFcErc20({
          erc20Address: GPAddress,
          wallet: wallet,
          tokenAmount,
          permitForAddress: ZkBingoFee,
          otherFc: otherFc
        })
      } else {
        const allowance = await GpContract.read.allowance([aa_mm_address, ZkBingoFee])
        if (new BigNumber(allowance.toString()).lt(tokenAmount.toString())) {
          const approveTxn = await GpContract.write.approve([ZkBingoFee, tokenAmount], {
            account: account,
            maxFeePerGas: gasPrice[chainId],
            maxPriorityFeePerGas: gasPrice[chainId]
          })
          const approveTxnHash = typeof approveTxn === 'string' ? approveTxn : approveTxn.hash
          await waitForTransaction({ confirmations: 2, hash: approveTxnHash })
          setSuccessToast({
            title: '',
            message: t('Approve successful')
          })
          setIsApprove(true)
          setPending(false)
          getApprove()
          return
        }
        const res = await lobbyContract.write.join([realLevel, joinGame.signedCard], {
          value: new BigNumber(donationFee).toString(),
          account: account,
          maxFeePerGas: gasPrice[chainId],
          maxPriorityFeePerGas: gasPrice[chainId]
        })
        hash = typeof res === 'string' ? res : res.hash
      }

      const joinTx: TransactionReceipt | undefined = await waitForTransaction({
        confirmations: 1,
        hash
      })
      if (joinTx && joinTx.status === txStatus) {
        postAccountUpdate({ tx: joinTx })
        setRefreshBalanceState(refreshBalance + 1)
        setCurrentStep(3)
      } else {
        throw Object.assign(new Error('Join Transaction Failed'), {
          name: 'Join'
        })
      }
    } catch (e) {
      console.log('lobbyContract error', e)
      setErrorToast(e, lobbyContract)
    } finally {
      setPending(false)
    }
  }

  useEffect(() => {
    message.success({
      content: t('Encryption successful'),
      className: 'customMessage',
      duration: 1,
      style: {
        marginTop: '50vh'
      }
    })
  }, [t])
  const levelChange = useCallback(
    (idx: number) => {
      if (disable) {
        showPointsModal()
      } else {
        setLevel(idx)
      }
    },
    [disable]
  )
  return (
    <div id="submit-card" style={{ width: '100%' }}>
      {isCard ? (
        <>
          <Row>
            <Col flex={'200px'}>
              <CardBack isMobile={isMobile} onClick={() => setIsCard(false)}>
                {'<'} {t('Back')}
              </CardBack>
            </Col>
            <Col flex={'auto'}>
              <FlexCenter isMobile={isMobile}>
                <BingoCardView isMobile={isMobile}>
                  <BingoBoardView cardNumbers={gameRoom.cardNumbers} onChange={() => {}} />
                </BingoCardView>
              </FlexCenter>
            </Col>
          </Row>
        </>
      ) : (
        <SubmitCardEle>
          <BoxWrap>
            <Space size={isMobile ? 8 : 16} align="center">
              {activeLevels.map((levelInfo: any, idx) => (
                <div key={levelInfo.level}>
                  {winRate >= levelInfo.minWinCounts && (
                    <CheckableTag isMobile={isMobile} checked={level == idx} onClick={() => levelChange(idx)}>
                      <Space size={isMobile ? 2 : 10} align="center">
                        <AmountValue checked={level == idx} isMobile={isMobile}>
                          {new BigNumber(levelInfo.betSize.toString(10)).div(10 ** 18).toFormat(0, 1)}
                        </AmountValue>
                        <img decoding="async" loading="lazy" src={preStaticUrl + `/img/home/data_points.svg`} width={isMobile ? 20 : 32} />
                      </Space>
                    </CheckableTag>
                  )}
                </div>
              ))}
            </Space>
          </BoxWrap>
          {isMobile && (
            <Title>
              {t('EncryptCardText301')}
              <br /> {t('EncryptCardText302')}
            </Title>
          )}
          <SetUpSubText>{t('SubmitCardText1')}</SetUpSubText>
          {disable ? (
            <ViewCard onClick={showPointsModal}>+ {t('Recharge Gold Points')}</ViewCard>
          ) : (
            <ViewCard
              onClick={() => {
                setIsCard(true)
              }}
            >
              {t('View Card')}
            </ViewCard>
          )}
          <ButtonPrimary disabled={pending || disable} width="250px" onClick={handleSubmitCard}>
            <Space>
              <span>{disable ? t('No Gold points') : isApprove ? t('Submit') : t('Approve')}</span>
              {pending && <LoadingOutlined />}
            </Space>
          </ButtonPrimary>
          {IS_TELEGRAM ? <></> : <Tip>{t('SubmitCardText4')}</Tip>}
        </SubmitCardEle>
      )}
    </div>
  )
}

export default SubmitCardV1
