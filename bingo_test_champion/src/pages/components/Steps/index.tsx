import { LngNs, useCustomTranslation, useIsW768 } from '@ui/src'
import React, { ReactElement, useMemo } from 'react'

import { IBingoVersion } from '@/pages/state/state'

import css from './steps.module.stylus'

const Steps = ({ currentStep, bingoVersion }: { currentStep: number; bingoVersion: IBingoVersion }): ReactElement => {
  const { t } = useCustomTranslation([LngNs.zBingo])
  const setupSteps = useMemo(() => {
    return [
      {
        stepIdx: 0,
        stepNum: '1',
        label: t('Encryption Key Generation')
      },
      {
        stepIdx: 1,
        stepNum: '2',
        label: t('Generate and encrypt grid card')
      },
      {
        stepIdx: 2,
        stepNum: '3',
        label: bingoVersion === IBingoVersion.v1 ? t('Submit gird card and Gold points') : 'Submit grid card'
      },
      {
        stepIdx: 3,
        stepNum: '4',
        label: t('Matchmaking')
      }
    ]
  }, [t, bingoVersion])
  const isMobile = useIsW768()

  return (
    <div className={css.stepsRoot}>
      <div className={css.steps}>
        {setupSteps.map(step => (
          <div className={`${css.step} ${step.stepIdx <= currentStep ? css['stePactive'] : ''}`} key={step.stepIdx}>
            <div className={css.item}>
              <div className={`${css.stepNum} ${step.stepIdx <= currentStep ? css['stepNumStePactive'] : ''}`}>{step.stepNum}</div>
              {!isMobile && <p className={`${css.label} ${step.stepIdx <= currentStep ? css['on'] : ''}`}>{step.label}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Steps
