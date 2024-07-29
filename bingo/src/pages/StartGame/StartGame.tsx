import '../index.stylus'

import {
  ChainRpcUrls,
  LngNs,
  preStaticUrl,
  txStatus,
  useAccountInvitation,
  useCurrentLanguage,
  useCustomTranslation,
  useIsMobile,
  usePublicNodeWaitForTransaction,
  useRecoilState,
  useResetRecoilState
} from '@zypher-game/toolkit/ui'
import { getProvider } from '@zypher-game/toolkit/ui'
import { useWalletClient } from '@zypher-game/toolkit/ui'
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

const StartGameWrapper = styled.div<{ isMobile: boolean; lang: string }>`
  border-radius: ${({ isMobile }) => (isMobile ? '12px' : '32px')};
  /* background: linear-gradient(180deg, #bd7614 0%, #e39325 0.01%, #bc6d00 100%); */
  background: url(${({ isMobile, lang }) => preStaticUrl + `/img/bingo/${isMobile ? `pannel_m_${lang}` : 'pannel'}.png`}) no-repeat;
  width: ${({ isMobile }) => (isMobile ? '355px' : '1165px')};
  background-size: 100% 100%;
  box-shadow: 0px -2px 2px 0px rgba(0, 0, 0, 0.25) inset, 0px 2px 1px 0px rgba(255, 255, 255, 0.3) inset,
    0px 0px 4px 2px rgba(255, 255, 255, 0.2) inset;
  /* max-width: 1165px; */
  height: ${({ isMobile }) => (isMobile ? '621px' : '717px')};
  margin: 0px auto;
  position: relative;
  padding-bottom: 10px;
`
const Wrapper = styled.div`
  padding: 10px;
`

const Close = styled.img<{ isMobile: boolean }>`
  position: absolute;
  top: ${({ isMobile }) => (isMobile ? '15px' : '25px')};
  right: ${({ isMobile }) => (isMobile ? '15px' : '25px')};
  width: ${({ isMobile }) => (isMobile ? '24px' : '')};
`
const StartGameHead = styled.div<{ isMobile: boolean }>`
  color: #62380c;
  padding-left: 40px;
  padding-right: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: ${({ isMobile }) => (isMobile ? '116px' : '141px')};
  /* padding-bottom: 30px; */

  font-size: ${({ isMobile }) => (isMobile ? '12px' : '25px')};
  .title {
    font-family: Lemon;
    padding-bottom: 10px;
    font-size: ${({ isMobile }) => (isMobile ? '18px' : '25px')};
  }
  .subtitle {
    font-family: Lemon;
    font-size: 12px;
    img {
      padding-right: 8px;
    }
  }
`
const StepsWrapper = styled.div<{ isMobile: boolean }>`
  margin-left: ${({ isMobile }) => (isMobile ? '19px' : '79px')};
  margin-right: ${({ isMobile }) => (isMobile ? '19px' : '79px')};
  height: ${({ isMobile }) => (isMobile ? '46px' : '102px')};
`
const Content = styled.div<{ isMobile: boolean }>`
  /* padding: 30px 43px 45px; */
  /* padding-top: ${({ isMobile }) => (isMobile ? '116px' : '141px')}; */
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
  /* background: radial-gradient(135.43% 117.95% at 48.97% 16.4%, #fff8ec 0%, #fff5e3 0.01%, #ffedd4 67.24%, #ffdcb1 100%); */
  /* box-shadow: 0px 2px 1px 0px rgba(255, 255, 255, 0.3) inset, 0px 0px 34px 0px #ffdfb8 inset; */
`

const StartGame: React.FC = () => {
  useBingoVersion()
  const isMobile = useIsMobile()
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
  const dispatch = useAppDispatch()
  const { data: walletClient } = useWalletClient()
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
    const lobbyContract = bingoLobby({ chainId, env, bingoVersion, walletClient })
    try {
      const provider = await getProvider(sample(ChainRpcUrls[chainId]))
      const bingoLobbyContract = await bingoLobbyFromRpc({ chainId, bingoVersion, library: provider, account })
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
          throw Object.assign(new Error('Leave Transaction Failed'), { name: 'Leave' })
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
      setErrorToast(dispatch, e, lobbyContract)
    }
  }, [account, chainId, walletClient, setErrorToast, bingoVersion])
  const onExitQueue = async () => {
    setModalLoading(true)
    if (!chainId || !account || !walletClient) {
      setModalLoading(false)
      return
    }
    const lobbyContract = bingoLobby({ chainId, env, bingoVersion, walletClient })
    try {
      const provider = await getProvider(sample(ChainRpcUrls[chainId]))
      const bingoLobbyContract = await bingoLobbyFromRpc({ chainId, bingoVersion, library: provider, account })
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
          throw Object.assign(new Error('Leave Transaction Failed'), { name: 'Leave' })
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
      setErrorToast(dispatch, e, lobbyContract)
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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', paddingBottom: '70px' }}>
        {/* <CountDown mss={5} open={showCountDown} /> */}
        <Wrapper>
          <StartGameWrapper isMobile={isMobile} lang={lang}>
            <Close isMobile={isMobile} src={preStaticUrl + `/img/bingo/close.png`} alt="" onClick={() => setShowCloseModal(true)} />
            <StartGameHead isMobile={isMobile}>
              {!isMobile && (
                <div>
                  <div className="title">{t('Setup')}</div>
                  <div className="subtitle">
                    <img src={preStaticUrl + `/img/bingo/note.png`} alt="" />
                    {t('setup tip')}
                  </div>
                </div>
              )}
            </StartGameHead>

            <Content isMobile={isMobile}>
              <StepsWrapper isMobile={isMobile}>
                <Steps currentStep={currentStep} bingoVersion={bingoVersion} />
              </StepsWrapper>
              <CardsWrap ref={cardsRef}>
                {currentStep === 0 && <GenerateKey disabled={currentStep !== 0} />}
                {currentStep === 1 && <EncryptCard disabled={currentStep !== 1} />}
                {currentStep === 2 && bingoVersion === IBingoVersion.v1 && <SubmitCardV1 disabled={currentStep !== 2} />}
                {currentStep === 2 && bingoVersion === IBingoVersion.beta && <SubmitCardBeta disabled={currentStep !== 2} />}
                {currentStep === 3 && <Matchmarking disabled={currentStep !== 3} />}
              </CardsWrap>
            </Content>
            <ConfirmCloseModal open={showCloseModal} closeLoading={modalLoading} onClose={onExitQueue} onCancel={() => setShowCloseModal(false)} />
          </StartGameWrapper>
        </Wrapper>
      </div>
      <TipsModal
        open={playingState && (cardNumbers.length > 1 || bingoVersion === IBingoVersion.beta)}
        closeLoading={modalLoading}
        onClose={onCloseModal}
        onCancel={() => toBingoPlayHref({ chainIdParams, navigate: navigate, path: `/${gameId}/gameRoom` })}
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
