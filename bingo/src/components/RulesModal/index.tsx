import { DialogContent, DialogOverlay } from '@reach/dialog'
import { LngNs, useCustomTranslation, useIsW768 } from '@ui/src'
import React from 'react'
import styled from 'styled-components'

import { ButtonPrimary } from '@/pages/components/Button'
import InputValue from '@/pages/components/GameRules/inputValue'

const StyledDialogOverlay = styled(DialogOverlay)<{ $scrollOverlay?: boolean }>`
  &[data-reach-dialog-overlay] {
    z-index: 9999;
    background-color: transparent;
    overflow: hidden;
    display: flex;
    align-items: center;

    overflow-y: ${({ $scrollOverlay }) => $scrollOverlay && 'scroll'};
    justify-content: center;

    background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(5px);
  }
`
const StyledDialogContent = styled(DialogContent)<{ isMobile: boolean }>`
  /* overflow-y: auto; */
  &[data-reach-dialog-content] {
    margin: auto;
    background-color: #f8e9c8;
    padding: 24px;
    border-radius: 40px;
    filter: drop-shadow(0px 0px 41px rgba(84, 40, 0, 0.7));
    box-shadow: inset 0px -3.73819px 3.73819px rgba(0, 0, 0, 0.25);
    border: 6px solid #ac6513;
    /* border: */
    box-shadow: 0px -3.7381865978240967px 3.7381865978240967px 0px rgba(0, 0, 0, 0.25) inset;
    width: ${({ isMobile }) => (isMobile ? '90vw' : '50vw')};
    /* overflow-y: auto;
    overflow-x: hidden; */
    position: relative;
    padding-bottom: 40px;
  }
`
const Title = styled.div`
  color: #613c17;
  font-weight: 600;
  font-size: 14px;
`
const Card = styled.div`
  border-radius: 20px;
  background: rgba(255, 153, 0, 0.1);
  margin-top: 10px;
  padding: 15px;
`
const Label = styled.div`
  color: rgba(97, 60, 23, 0.6);

  font-size: 14px;
  padding-bottom: 10px;
`
const Text = styled.div`
  color: #613c17;

  font-size: 14px;
  padding-bottom: 10px;
  font-weight: 600;
`
const ConfirmButton = styled.div`
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
`

const RulesModal = ({ open, onDismiss }: { open: boolean; onDismiss: () => void }) => {
  const isMobile = useIsW768()
  const { t } = useCustomTranslation([LngNs.zBingo])
  return (
    <StyledDialogOverlay isOpen={open} onDismiss={onDismiss}>
      <StyledDialogContent isMobile={isMobile}>
        <Title>{t('Bingo Rules')}</Title>
        <Card>
          <Label>{t('BingoRules0201')}</Label>
          <Text>{t('BingoRules0202')}</Text>
          <Label>{t('BingoRules0301')}</Label>
          <Text>{t('BingoRules0302')}</Text>
        </Card>
        <Card>
          <InputValue />
        </Card>

        <ConfirmButton>
          <ButtonPrimary width={isMobile ? '140px' : '164px'} onClick={onDismiss}>
            {t('Confirm')}
          </ButtonPrimary>
        </ConfirmButton>
      </StyledDialogContent>
    </StyledDialogOverlay>
  )
}

export default RulesModal
