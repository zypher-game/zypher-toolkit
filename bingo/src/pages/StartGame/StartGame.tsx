import '../index.stylus'

import {
  ChainRpcUrls,
  GlobalVar,
  LngNs,
  preStaticUrl,
  txStatus,
  useAccountInvitation,
  useCurrentLanguage,
  useCustomTranslation,
  useIsW768,
  usePublicNodeWaitForTransaction,
  useRecoilState,
  useResetRecoilState
} from '@ui/src'
import { getProvider } from '@ui/src'
import { useWalletHandler } from '@ui/src'
import { sample } from 'lodash'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { TransactionReceipt } from 'viem'

import { gasPrice } from '@/constants/constants'
import bingoLobby, { bingoLobbyFromRpc } from '@/contract/bingoLobby'
import { useActiveWeb3ReactForBingo } from '@/hooks/useActiveWeb3ReactForBingo'
import { useBingoVersion } from '@/hooks/useBingoVersion'
import { useChainIdParams } from '@/hooks/useChainIdParams'
import useRestoreGame from '@/hooks/useRestoreGame'
import { useAppDispatch } from '@/store/hooks'
import { env } from '@/utils/config'
import { setErrorToast } from '@/utils/Error/setErrorToast'
import { toBingoHref, toBingoPlayHref } from '@/utils/toBingoHref'

import EncryptCard from '../components/EncryptCard'
import GenerateKey from '../components/GenerateKey'
import Matchmarking from '../components/Matchmarking'
import { ConfirmCloseModal, TipsModal, TipsOkModal } from '../components/Modal'
import Steps from '../components/Steps'
import SubmitCardBeta from '../components/SubmitCard/SubmitCardBeta'
import SubmitCardV1 from '../components/SubmitCard/SubmitCardV1'
import { gameRoomState, IBingoVersion, startGameStep } from '../state/state'
import css from './StartGame.module.stylus'

const StepsWrapper = styled.div<{ isMobile: boolean }>`
  margin-left: ${({ isMobile }) => (isMobile ? '19px' : '79px')};
  margin-right: ${({ isMobile }) => (isMobile ? '19px' : '79px')};
  height: ${({ isMobile }) => (isMobile ? '46px' : '102px')};
`
const Content = styled.div<{ isMobile: boolean }>`
  height: ${({ isMobile }) => (isMobile ? '503px' : '623px')};
  background-repeat: no-repeat;
  background-size: 100% 100%;
`
const CardsWrap = styled.div<{ isMobile?: boolean }>`
  height: ${({ isMobile }) => (isMobile ? '438px' : '423px')};
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: ${({ isMobile }) => (isMobile ? '15px' : '29px')};
  padding-right: ${({ isMobile }) => (isMobile ? '15px' : '29px')};
`

const StartGame: React.FC = () => {
  useBingoVersion()
  const isMobile = useIsW768()
  const navigate = useNavigate()
  const { t } = useCustomTranslation([LngNs.zBingo])
  const lang = useCurrentLanguage()
  const location = useLocation()
  const { loading, gameTime, isPlaying, gameId } = useRestoreGame()
  const { postAccountUpdate } = useAccountInvitation(env)
  const [playingState, setPlayingState] = useState(isPlaying)
  const [gameTimeState, setGameTimeState] = useState(false)
  const [currentStep, setCurrentStep] = useRecoilState(startGameStep)
  const [showCloseModal, setShowCloseModal] = useState(false)
  const [modalLoading, setModalLoading] = useState(false)
  const { account, chainId, bingoVersion } = useActiveWeb3ReactForBingo()
  const [{ cardNumbers }] = useRecoilState(gameRoomState)
  const cardsRef = useRef(null)
  const lineupUserRef = useRef<NodeJS.Timer>()
  const gameStartRef = useRef<NodeJS.Timer>()
  const walletClient = useWalletHandler()
  const { waitForTransaction } = usePublicNodeWaitForTransaction(env)
  const resetGameRoom = useResetRecoilState(gameRoomState)
  const chainIdParams = useChainIdParams()
  useEffect(() => {
    setPlayingState(isPlaying && cardNumbers.length >= 1)
  }, [isPlaying, gameTime, cardNumbers])
  useEffect(() => {
    setGameTimeState(gameTime > 0 && cardNumbers.length < 1)
  }, [cardNumbers, gameTime, bingoVersion])

  const onCloseModal = useCallback(async () => {
    setModalLoading(true)
    if (!chainId || !account || !walletClient) {
      setModalLoading(false)
      return
    }
    const lobbyContract = bingoLobby({
      chainId,
      env,
      bingoVersion,
      walletClient
    })
    try {
      const provider = await getProvider(sample(ChainRpcUrls[chainId]))
      const bingoLobbyContract = await bingoLobbyFromRpc({
        chainId,
        bingoVersion,
        library: provider,
        account
      })
      const rres = await bingoLobbyContract.functions.lineupUsers()
      let lineupUsers: string[] = []
      if (bingoVersion === IBingoVersion.v1) {
        lineupUsers = rres[1] // []
      } else {
        lineupUsers = rres[0]
      }
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
        setModalLoading(false)
        resetGameRoom()
        toBingoPlayHrefHandle()
        return
      }
      if (bingoVersion === IBingoVersion.v1) {
        const txn = await lobbyContract.write.abandon([gameId], {
          account: account,
          maxFeePerGas: gasPrice[chainId],
          maxPriorityFeePerGas: gasPrice[chainId]
        })
        const hash = typeof txn === 'string' ? txn : txn.hash
        const leaveLx: TransactionReceipt | undefined = await waitForTransaction({ confirmations: 1, hash })
        if (leaveLx && leaveLx.status === txStatus) {
          postAccountUpdate({ tx: leaveLx })
        } else {
          throw Object.assign(new Error('Leave  Failed'), { name: 'Leave' })
        }
      }
      setModalLoading(false)
      resetGameRoom()
      toBingoPlayHrefHandle()
    } catch (e: any) {
      setModalLoading(false)
      setErrorToast(e, lobbyContract)
    }
  }, [account, chainId, walletClient, setErrorToast, bingoVersion])
  const onExitQueue = async () => {
    setModalLoading(true)
    if (!chainId || !account || !walletClient) {
      setModalLoading(false)
      return
    }
    const lobbyContract = bingoLobby({
      chainId,
      env,
      bingoVersion,
      walletClient
    })
    try {
      const provider = await getProvider(sample(ChainRpcUrls[chainId]))
      const bingoLobbyContract = await bingoLobbyFromRpc({
        chainId,
        bingoVersion,
        library: provider,
        account
      })
      const rres = await bingoLobbyContract.functions.lineupUsers()
      let lineupUsers: string[] = []
      if (bingoVersion === IBingoVersion.v1) {
        lineupUsers = rres[1]
      } else {
        lineupUsers = rres[0]
      }
      if (lineupUsers.includes(account)) {
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
        setShowCloseModal(false)
        setModalLoading(false)
        toBingoPage()
        return
      } else {
        setShowCloseModal(false)
        setModalLoading(false)
        toBingoPage()
      }
    } catch (e: any) {
      setModalLoading(false)
      setShowCloseModal(false)
      setErrorToast(e, lobbyContract)
    }
  }
  const toBingoPage = useCallback(() => {
    setCurrentStep(0)
    toBingoHref({ chainIdParams, navigate, pathname: location.pathname })
  }, [navigate, location, chainIdParams])
  const toBingoPlayHrefHandle = useCallback(() => {
    setCurrentStep(0)
    toBingoPlayHref({ chainIdParams, navigate, pathname: location.pathname })
  }, [navigate, location, chainIdParams])
  useEffect(() => {
    localStorage.removeItem('selectedNumbers')
    return () => {
      lineupUserRef.current && clearInterval(lineupUserRef.current)
      gameStartRef.current && clearInterval(gameStartRef.current)
    }
  }, [])
  useEffect(() => {
    if (account && chainId) {
      setCurrentStep(0)
    }
  }, [account, chainId])
  return (
    <>
      <div className={`${css.startGame} ${GlobalVar.IS_TELEGRAM ? css.startTgGame : ''}`}>
        <div className={css.wrap}>
          <div className={`${css.startGameWrapper} ${css[lang]}`}>
            <img
              decoding="async"
              loading="lazy"
              className={css.close}
              src={preStaticUrl + `/img/bingo/close.png`}
              alt=""
              onClick={() => setShowCloseModal(true)}
            />
            <div className={css.startGameHead}>
              {!isMobile && (
                <div>
                  <div className={css.title}>{t('Setup')}</div>
                  <div className={css.subtitle}>
                    <img decoding="async" loading="lazy" src={preStaticUrl + `/img/bingo/note.png`} alt="" />
                    {t('setup tip')}
                  </div>
                </div>
              )}
            </div>

            <Content isMobile={isMobile}>
              <StepsWrapper isMobile={isMobile}>
                <Steps currentStep={currentStep} bingoVersion={bingoVersion} />
              </StepsWrapper>
              <CardsWrap ref={cardsRef}>
                {currentStep === 0 && <GenerateKey disabled={currentStep !== 0} />}
                {currentStep === 1 && <EncryptCard disabled={currentStep !== 1} />}
                {currentStep === 2 && bingoVersion === IBingoVersion.v1 && <SubmitCardV1 />}
                {currentStep === 2 && bingoVersion === IBingoVersion.beta && <SubmitCardBeta disabled={currentStep !== 2} />}
                {currentStep === 3 && <Matchmarking disabled={currentStep !== 3} />}
              </CardsWrap>
            </Content>
            <ConfirmCloseModal open={showCloseModal} closeLoading={modalLoading} onClose={onExitQueue} onCancel={() => setShowCloseModal(false)} />
          </div>
        </div>
      </div>
      <TipsModal
        open={playingState && (cardNumbers.length > 1 || bingoVersion === IBingoVersion.beta)}
        closeLoading={modalLoading}
        onClose={onCloseModal}
        onCancel={() =>
          toBingoPlayHref({
            chainIdParams,
            navigate: navigate,
            path: `/${gameId}/gameRoom`
          })
        }
        onBlack={() => toBingoPage()}
      />
      <TipsOkModal
        closeLoading={modalLoading}
        open={gameTimeState}
        onBlack={() => toBingoPage()}
        onClose={() => toBingoPlayHrefHandle()}
        onCancel={onCloseModal}
      />
    </>
  )
}

export default StartGame
