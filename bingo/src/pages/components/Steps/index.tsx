import { LngNs, useCustomTranslation, useIsMobile } from '@zypher-game/toolkit/ui'
import React, { ReactElement, useMemo } from 'react'
import { TFunction } from 'react-i18next'
import styled from 'styled-components'

import { IBingoVersion } from '@/pages/state/state'

const StepsRoot = styled.div<{ isMobile: boolean }>`
  padding: ${({ isMobile }) => (isMobile ? '15px' : '20px 160px 20px 40px')};
  box-sizing: border-box;
`
const StepsWrap = styled.div`
  display: flex;
`
const Step = styled.div<{ isMobile: boolean; stePactive: boolean }>`
  display: flex;
  align-items: center;
  flex-direction: row;
  position: relative;
  font-family: 'Lemon';
  font-weight: 400;
  flex: 1;
  &:last-child {
    flex: none;
  }
  &:not(:last-child)::after {
    content: '';
    position: absolute;
    height: 1px;
    border-top: 1px solid ${({ stePactive }) => (stePactive ? '#59b407' : '#b46f26')};
    width: calc(100% - ${({ isMobile }) => (isMobile ? '40px' : '64px')});
    left: ${({ isMobile }) => (isMobile ? '30px' : '54px')};
  }
`
const StepItems = styled.div`
  display: inline-flex;
`
const StepNum = styled.div<{ stePactive: boolean; isMobile: boolean }>`
  display: flex;
  font-size: ${({ isMobile }) => (isMobile ? '12px' : '16px')};
  width: ${({ isMobile }) => (isMobile ? '20px' : '30px')};
  height: ${({ isMobile }) => (isMobile ? '20px' : '30px')};
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-family: 'Lemon';
  color: ${({ stePactive }) => (stePactive ? '#fff' : '#b46f26')};
  background: ${({ stePactive }) => (stePactive ? '#59b407' : 'transparent')};
  border: 1px solid ${({ stePactive }) => (stePactive ? '#59b407' : '#b46f26')};
`

const Label = styled.div<{ stePactive: boolean }>`
  font-family: Lemon;
  font-size: 14px;
  position: absolute;
  left: 0;
  top: 38px;
  color: ${({ stePactive }) => (stePactive ? '#59b407' : '#b46f26')};
  max-width: 218px;
`

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
  const isMobile = useIsMobile()
  return (
    <StepsRoot isMobile={isMobile}>
      <StepsWrap>
        {setupSteps.map(step => (
          <Step key={step.stepIdx} isMobile={isMobile} stePactive={step.stepIdx <= currentStep}>
            <StepItems>
              <StepNum stePactive={step.stepIdx <= currentStep} isMobile={isMobile}>
                {step.stepNum}
                {/* {step.stepIdx < currentStep ? <CheckCircleFilled /> : <div>{step.stepNum}</div>} */}
              </StepNum>
              {!isMobile && <Label stePactive={step.stepIdx <= currentStep}>{step.label}</Label>}
            </StepItems>
          </Step>
        ))}
      </StepsWrap>
    </StepsRoot>
  )
}

export default Steps
