import { LoadingOutlined } from '@ant-design/icons'
import {
  ChainRpcUrls,
  erc20Contract,
  getProvider,
  GlobalVar,
  IContractName,
  LngNs,
  pointsBalanceState,
  pointsDialogState,
  preStaticUrl,
  refreshBalanceState,
  txStatus,
  useAccountInvitation,
  useCustomTranslation,
  useIsW768,
  usePublicNodeWaitForTransaction,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
  useWalletHandler,
  zkBingo
} from '@ui/src'
import { Col, message, Row, Space } from 'antd'
import BigNumber from 'bignumber.js'
import { sample } from 'lodash'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { formatEther } from 'viem'
import { TransactionReceipt } from 'viem'

import BingoBoardView from '@/components/BingoBoardView'
import { gasPrice } from '@/constants/constants'
import bingoLobby, { bingoLobbyFromRpc } from '@/contract/bingoLobby'
import { useActiveWeb3ReactForBingo } from '@/hooks/useActiveWeb3ReactForBingo'
import { ButtonPrimary } from '@/pages/components/Button'
import { gameRoomState, joinGameState, startGameStep } from '@/pages/state/state'
import { env } from '@/utils/config'
import { setErrorToast, setSuccessToast } from '@/utils/Error/setErrorToast'

import { SetUpSubText } from '../Text'
import { AmountValue, BingoCardView, BoxWrap, CardBack, CheckableTag, FlexCenter, SubmitCardEle, Tip, Title, ViewCard } from './SubmitCard.style'

const SubmitCardV1 = () => {
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
  const walletClient = useWalletHandler()
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
    if (chainId && account && walletClient && activeLevels) {
      const pointsAddress = zkBingo(chainId, IContractName.ZypherGameToken)
      const ZkBingoFee = zkBingo(chainId, IContractName.Fee)
      const pointsContract = erc20Contract(chainId, env, pointsAddress, walletClient)
      const allowance = await pointsContract.read.allowance(['0x11C705BCEBc0a380602A7047B3058a51Ab586689', ZkBingoFee])
      console.log({ allowance })
      const { betSize: tokenAmount } = activeLevels[level] as any
      if (new BigNumber(allowance.toString()).lt(tokenAmount.toString())) {
        setIsApprove(false)
      } else {
        setIsApprove(true)
      }
    }
  }, [chainId, account, activeLevels, walletClient, level])
  const getActiveLevels = useCallback(async () => {
    const provider = await getProvider(sample(ChainRpcUrls[chainId]))
    const bingoLobbyContract = await bingoLobbyFromRpc({
      chainId,
      bingoVersion,
      library: provider,
      account
    })
    const { list, wins } = await bingoLobbyContract.functions.activeLevels()
    setActiveLevels(list)
    setWinRate(wins.toNumber())
  }, [chainId, account, walletClient, bingoVersion])
  useEffect(() => {
    getActiveLevels()
  }, [chainId, account, walletClient, bingoVersion])
  // Cannot destructure property 'betSize' of 'activeLevels[level]' as it is undefined.
  const handleSubmitCard = async () => {
    if (!chainId || !account || !walletClient || !activeLevels.length) {
      if (chainId && account && !activeLevels.length) {
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
      const pointsAddress = zkBingo(chainId, IContractName.ZypherGameToken)
      const ZkBingoFee = zkBingo(chainId, IContractName.Fee)
      // const lineupUsers = await lobbyContract.read.lineupUsers()
      const provider = await getProvider(sample(ChainRpcUrls[chainId]))
      const bingoLobbyContract = await bingoLobbyFromRpc({
        chainId,
        bingoVersion,
        library: provider,
        account
      })
      const [lvId, lineupUsers] = await bingoLobbyContract.functions.lineupUsers()
      if (lineupUsers.map((v: string) => v.toLowerCase()).includes(account.toLowerCase())) {
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
      const pointsContract = erc20Contract(chainId, env, pointsAddress, walletClient)
      const { betSize: tokenAmount, level: realLevel } = activeLevels[level] as any
      const donationFee = await bingoLobbyContract.functions.donationFee()
      const allowance = await pointsContract.read.allowance([account, ZkBingoFee])
      if (new BigNumber(allowance.toString()).lt(tokenAmount.toString())) {
        const approveTxn = await pointsContract.write.approve([ZkBingoFee, tokenAmount], {
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
      const hash = typeof res === 'string' ? res : res.hash
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
          {GlobalVar.IS_TELEGRAM ? <></> : <Tip>{t('SubmitCardText4')}</Tip>}
        </SubmitCardEle>
      )}
    </div>
  )
}

export default SubmitCardV1
