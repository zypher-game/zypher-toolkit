import '../index.stylus'

import { LngNs, preStaticUrl, useCustomTranslation, useIsW768, useRecoilState } from '@ui/src'
import React, { useEffect, useRef } from 'react'

import { useActiveWeb3ReactForBingo } from '@/hooks/useActiveWeb3ReactForBingo'
import { useBingoVersion } from '@/hooks/useBingoVersion'

import EncryptCard from '../components/EncryptCard'
import GenerateKey from '../components/GenerateKey'
import MatchmarkingChampion from '../components/Matchmarking/MatchmarkingChampion'
import { useScale } from '../components/ScaleProvider/ScaleProvider'
import StartGameDialog from '../components/StartGameDialog/StartGameDialog'
import Steps from '../components/Steps'
import SubmitCardChampion from '../components/SubmitCard/SubmitCardChampion'
import css from '../StartGame/StartGame.module.stylus'
import { showCloseModalState, startGameStep } from '../state/state'
import { useLabel } from '../zBingoIndex/components/InnerChampion/hooks/useLabel'

const StartGameChampion: React.FC = () => {
  const [, setShowCloseModal] = useRecoilState(showCloseModalState)
  useBingoVersion()
  const isMobile = useIsW768()
  const { t } = useCustomTranslation([LngNs.zBingo])
  const [currentStep, setCurrentStep] = useRecoilState(startGameStep)
  const { account, chainId, bingoVersion } = useActiveWeb3ReactForBingo()
  const cardsRef = useRef(null)
  const lineupUserRef = useRef<NodeJS.Timer>()
  const gameStartRef = useRef<NodeJS.Timer>()
  const { scale } = useScale()

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
  const { currentRemainTime } = useLabel()
  return (
    <>
      <div
        className={`${css.startGame}`}
        style={{
          scale: isMobile ? '1' : scale.toFixed(2)
        }}
      >
        <div className={css.wrap}>
          <div className={`${css.startGameWrapper}`}>
            <img
              decoding="async"
              loading="lazy"
              className={css.close}
              src={preStaticUrl + `/img/bingo/close.webp`}
              alt=""
              onClick={() => setShowCloseModal(true)}
            />
            <div className={css.startGameHead}>
              {!isMobile && (
                <div>
                  <div className={`${css.title} ${css.titleChampion}`}>
                    Set-up
                    <p className={css.titleSmall}>
                      {currentRemainTime.map((v, index) => (
                        <span key={index}>
                          <span className={`${css.spanTime} ${index + 1 === currentRemainTime.length ? css.spanLast : ''}`}>{v}</span>
                          {index + 1 === currentRemainTime.length ? '' : <span className={css.spanPoint}>:</span>}
                        </span>
                      ))}
                    </p>
                  </div>
                  <div className={css.subtitle}>
                    <img decoding="async" loading="lazy" src={preStaticUrl + `/img/bingo/note.webp`} alt="" />
                    {t('setup tip')}
                  </div>
                </div>
              )}
            </div>

            <div className={css.content}>
              <div className={css.stepsWrapper}>
                <Steps currentStep={currentStep} bingoVersion={bingoVersion} />
              </div>
              <div className={css.cardsWrap} ref={cardsRef}>
                {currentStep === 0 && <GenerateKey disabled={currentStep !== 0} />}
                {currentStep === 1 && <EncryptCard disabled={currentStep !== 1} />}
                {currentStep === 2 && <SubmitCardChampion />}
                {currentStep === 3 && <MatchmarkingChampion />}
              </div>
            </div>
          </div>
        </div>
      </div>
      <StartGameDialog isFromIndex={false} />
    </>
  )
}

export default StartGameChampion
