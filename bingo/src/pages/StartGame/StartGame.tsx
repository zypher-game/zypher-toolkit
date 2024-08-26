import '../index.stylus'

import { LngNs, preStaticUrl, useCurrentLanguage, useCustomTranslation, useIsTelegram, useIsW768, useRecoilState } from '@ui/src'
import React, { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { useActiveWeb3ReactForBingo } from '@/hooks/useActiveWeb3ReactForBingo'
import { useBingoVersion } from '@/hooks/useBingoVersion'
import { useChainIdParams } from '@/hooks/useChainIdParams'
import { toBingoHref } from '@/utils/toBingoHref'

import EncryptCard from '../components/EncryptCard'
import GenerateKey from '../components/GenerateKey'
import Matchmarking from '../components/Matchmarking'
import StartGameDialog from '../components/StartGameDialog/StartGameDialog'
import Steps from '../components/Steps'
import SubmitCardBeta from '../components/SubmitCard/SubmitCardBeta'
import SubmitCardV1 from '../components/SubmitCard/SubmitCardV1'
import { IBingoVersion, showCloseModalState, startGameStep } from '../state/state'
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
  const IS_TELEGRAM = useIsTelegram()
  const [, setShowCloseModal] = useRecoilState(showCloseModalState)
  useBingoVersion()
  const isMobile = useIsW768()
  const navigate = useNavigate()
  const { t } = useCustomTranslation([LngNs.zBingo])
  const lang = useCurrentLanguage()
  const location = useLocation()
  const [currentStep, setCurrentStep] = useRecoilState(startGameStep)
  const { account, chainId, bingoVersion } = useActiveWeb3ReactForBingo()
  const cardsRef = useRef(null)
  const lineupUserRef = useRef<NodeJS.Timer>()
  const gameStartRef = useRef<NodeJS.Timer>()
  const chainIdParams = useChainIdParams()

  useEffect(() => {
    localStorage.removeItem('selectedNumbers')
    return () => {
      lineupUserRef.current && clearInterval(lineupUserRef.current)
      gameStartRef.current && clearInterval(gameStartRef.current)
    }
  }, [])
  useEffect(() => {
    if (IS_TELEGRAM) {
      if (currentStep === 0) {
        toBingoHref({ chainIdParams, navigate, pathname: location.pathname })
      }
    } else {
      if (account && chainId) {
        setCurrentStep(0)
      }
    }
  }, [account, chainId])
  return (
    <>
      <div className={`${css.startGame} ${IS_TELEGRAM ? css.startTgGame : ''}`}>
        <div className={css.wrap}>
          <div className={`${css.startGameWrapper} ${IS_TELEGRAM ? css.tg : css[lang]}`}>
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
              {IS_TELEGRAM ? (
                <></>
              ) : (
                <StepsWrapper isMobile={isMobile}>
                  <Steps currentStep={currentStep} bingoVersion={bingoVersion} />
                </StepsWrapper>
              )}
              <CardsWrap ref={cardsRef}>
                {currentStep === 0 && <GenerateKey disabled={currentStep !== 0} />}
                {currentStep === 1 && <EncryptCard disabled={currentStep !== 1} />}
                {currentStep === 2 && bingoVersion === IBingoVersion.v1 && <SubmitCardV1 />}
                {currentStep === 2 && bingoVersion === IBingoVersion.beta && <SubmitCardBeta disabled={currentStep !== 2} />}
                {currentStep === 3 && <Matchmarking disabled={currentStep !== 3} />}
              </CardsWrap>
            </Content>
          </div>
        </div>
      </div>
      <StartGameDialog isFromIndex={false} />
    </>
  )
}

export default StartGame
