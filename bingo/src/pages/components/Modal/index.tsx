import './index.css'

import { LoadingOutlined } from '@ant-design/icons'
import { Dialog, DialogContent, DialogOverlay } from '@reach/dialog'
import { preStaticUrl, useRecoilValue } from '@ui/src'
import { useCustomTranslation } from '@ui/src'
import { useIsW768 } from '@ui/src'
import { LngNs } from '@ui/src'
import { Space } from 'antd'
import React, { ReactNode } from 'react'
import { Any } from 'react-spring'
import styled from 'styled-components'

import { ButtonHover, ButtonPrimary } from '@/pages/components/Button'
import { bingoVersionState, IBingoVersion } from '@/pages/state/state'

import LoadingSpinner from '../LoadingSpinner'

const CloseBtn = styled.img`
  position: absolute;
  top: -10px;
  right: -16px;
  cursor: pointer;
`

const ModalH = styled.div`
  position: absolute;
  top: -90px;
  z-index: 9;
  display: flex;
  left: 0;
  width: 100%;
  justify-content: center;
  align-items: center;
`

const Footer = styled.div`
  position: absolute;
  bottom: -27px;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const LoseModal = styled(DialogContent)`
  position: relative;
  background: transparent;
  padding: 0;
  margin-top: 20vh;
`

const GradeBorder = styled.div`
  max-width: 472px;
  .grade-img {
    padding-top: 62px;
    padding-bottom: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url(${preStaticUrl + '/img/bingo/grade-logo.svg'}) center no-repeat;
    @media screen and (max-width: 830px) {
      width: 130px;
      margin: 0 auto;
      padding-top: 0;
      padding-bottom: 20px;
      img {
        width: 100%;
      }
    }
  }
`

interface CustomDialogProps {
  isOpen?: boolean
  open?: boolean
  onSubmit?: any
  onCancel?: any
  close?: any
  title?: any
  players?: any
  children?: ReactNode
  confirm?: any
  onBlack?: any
  onClose?: any
  closeLoading?: any
  content?: any
  garde?: any
}

function Modal(props: CustomDialogProps) {
  const { t } = useCustomTranslation([LngNs.zBingo])
  const { open, close, title, players, onCancel, onSubmit, children } = props
  return (
    <>
      <DialogOverlay isOpen={open} onDismiss={close} style={{ background: 'rgba(0, 0, 0, 0.7)' }}>
        <LoseModal>
          <ModalH>{title}</ModalH>
          {children}
          <Footer>
            <Space size={30}>
              <ButtonHover width={'186px'} onClick={onCancel}>
                {t('Back')}
              </ButtonHover>
              <ButtonPrimary width={'186px'} onClick={onSubmit}>
                {t('Play again')}
              </ButtonPrimary>
            </Space>
          </Footer>
        </LoseModal>
      </DialogOverlay>
    </>
  )
}

const ConfirmConfirmDialog = styled(Dialog)<{ isMobile?: boolean }>`
  &[data-reach-dialog-content] {
    background: #f8e9c8;
    border-radius: 60px;
    box-shadow: inset 0px -3.73819px 3.73819px rgba(0, 0, 0, 0.25);
    border: 6px solid #ac6513;
    max-width: 460px;
    min-height: 260px;
    text-align: center;
    position: relative;
    padding: ${({ isMobile }) => (isMobile ? '50px 20px 30px' : '54px 30px')};
    margin: 0 15px;
  }
  &[data-reach-dialog-content] {
    width: ${({ isMobile }) => (isMobile ? '80vw' : '50vw')};
    font-family: 'Lemon';
  }
  &::before {
    content: '';
    position: absolute;
    top: 17px;
    right: 17px;
    width: 68px;
    height: 53px;
    background: url(${preStaticUrl + '/img/bingo/confirm-right.svg'}) no-repeat;
  }
  &::after {
    content: '';
    position: absolute;
    bottom: 20px;
    left: 17px;
    width: 68px;
    height: 53px;
    background: url(${preStaticUrl + '/img/bingo/confirm-left.svg'}) no-repeat;
  }
`
const ConfirmButton = styled.div`
  left: 0;
  right: 0;
  position: absolute;
  margin: 0 auto;
  z-index: 1;
  bottom: -29px;
`

const ConfirmTip = styled.div`
  color: #864802;
  font-size: 16px;
  padding-bottom: 16px;
  text-align: center;
  @media screen and (max-width: 830px) {
    padding-bottom: 14px;
  }
`
const Logo = styled.div<{ isMobile: boolean }>`
  position: absolute;
  top: ${({ isMobile }) => (isMobile ? '-61px' : '-103px')};
  left: 0;
  right: 0;
`

const ConfirmIcon = styled.img``

export function ConfirmModal(props: CustomDialogProps) {
  const { t } = useCustomTranslation([LngNs.zBingo])
  const { open, confirm } = props
  const isMobile = useIsW768()
  return (
    <>
      <ConfirmConfirmDialog isMobile={isMobile} isOpen={open} style={{ zIndex: 9 }}>
        <ConfirmIcon src={preStaticUrl + '/img/bingo/confirm-icon.svg'} />
        <ConfirmTip>
          {t('Timed out!')}
          <br /> {t('Please wait for the next round.')}
        </ConfirmTip>
        <ConfirmButton>
          <ButtonPrimary width={isMobile ? '140px' : '164px'} onClick={confirm}>
            {t('Confirm')}
          </ButtonPrimary>
        </ConfirmButton>
      </ConfirmConfirmDialog>
    </>
  )
}
const ConfirmTitile = styled.div`
  font-size: 24px;
  color: #864802;
  font-weight: 600;
  padding-bottom: 24px;
  text-align: center;
  @media screen and (max-width: 830px) {
    font-size: 18px;
  }
`
export function ConfirmCloseModal(props: CustomDialogProps) {
  const { t } = useCustomTranslation([LngNs.zBingo])
  const { open, onCancel, onClose, closeLoading } = props
  const isMobile = useIsW768()
  const bingoVersion = useRecoilValue(bingoVersionState)
  return (
    <>
      <ConfirmConfirmDialog isMobile={isMobile} isOpen={open}>
        <ConfirmTitile>{t('ConfirmCloseModalText1')}</ConfirmTitile>
        <ConfirmTip>{bingoVersion === IBingoVersion.beta ? 'After exiting, the game card will be reset!' : t('ConfirmCloseModalText2')}</ConfirmTip>
        {/* <PsText>ps：The Points you submitted will be returned to your wallet address.</PsText> */}
        <ConfirmButton>
          <Space>
            <ButtonHover width={isMobile ? '140px' : '164px'} onClick={onClose}>
              <div>
                {t('Leave')} {closeLoading && <LoadingOutlined style={{ paddingLeft: '5px' }} />}
              </div>
            </ButtonHover>
            <ButtonPrimary width={isMobile ? '140px' : '164px'} onClick={onCancel}>
              {t('Cancel')}
            </ButtonPrimary>
          </Space>
        </ConfirmButton>
      </ConfirmConfirmDialog>
    </>
  )
}
export function TipsModal(props: CustomDialogProps) {
  const { open, onCancel, onClose, closeLoading, onBlack } = props
  const { t } = useCustomTranslation([LngNs.zBingo])
  const isMobile = useIsW768()
  const bingoVersion = useRecoilValue(bingoVersionState)
  return (
    <>
      <ConfirmConfirmDialog isMobile={isMobile} isOpen={open}>
        <CloseBtn src={preStaticUrl + '/img/bingo/close.svg'} alt="close" onClick={onBlack} />
        <ConfirmTitile>{t('TIPS')}</ConfirmTitile>
        <ConfirmTip>{t('TipsModalText1')}</ConfirmTip>
        <ConfirmButton>
          <Space>
            {bingoVersion === IBingoVersion.v1 ? (
              <ButtonHover width={isMobile ? '140px' : '164px'} onClick={onClose}>
                {t('Restart')} {closeLoading && <LoadingOutlined style={{ paddingLeft: '5px' }} />}
              </ButtonHover>
            ) : null}
            <ButtonPrimary width={isMobile ? '140px' : '164px'} onClick={onCancel}>
              {bingoVersion === IBingoVersion.beta ? 'Continue' : t('Return')}
            </ButtonPrimary>
          </Space>
        </ConfirmButton>
      </ConfirmConfirmDialog>
    </>
  )
}
export function TipsOkModal(props: CustomDialogProps) {
  const { open, onCancel, onClose, closeLoading, onBlack } = props
  const { t } = useCustomTranslation([LngNs.zBingo])
  const bingoVersion = useRecoilValue(bingoVersionState)
  const isMobile = useIsW768()
  return (
    <>
      <ConfirmConfirmDialog isMobile={isMobile} isOpen={open}>
        <CloseBtn src={preStaticUrl + '/img/bingo/close.svg'} alt="close" onClick={onBlack} />
        <ConfirmTitile>{t('TIPS')}</ConfirmTitile>
        <ConfirmTip>
          {bingoVersion === IBingoVersion.beta
            ? 'Your game card has been lost and the previous game is still in progress. Please wait for the game to end (expected a few minutes) before starting a new game.'
            : t('TipsOkModalText1')}
        </ConfirmTip>
        {bingoVersion === IBingoVersion.v1 ? (
          <ConfirmButton>
            <Space>
              {/* <ButtonHover width={isMobile?"140px":"164px"} onClick={onClose}>
              Close
            </ButtonHover> */}
              <ButtonPrimary width={isMobile ? '140px' : '164px'} onClick={onCancel}>
                {t('Restart')} {closeLoading && <LoadingOutlined style={{ paddingLeft: '5px' }} />}
              </ButtonPrimary>
            </Space>
          </ConfirmButton>
        ) : null}
      </ConfirmConfirmDialog>
    </>
  )
}

export function OvertimeModal(props: CustomDialogProps) {
  const { open, onCancel, onClose } = props
  const { t } = useCustomTranslation([LngNs.zBingo])
  const isMobile = useIsW768()
  return (
    <>
      <ConfirmConfirmDialog isMobile={isMobile} isOpen={open}>
        <ConfirmTitile>{t('Timed out!')}</ConfirmTitile>
        <ConfirmTip>{t('OvertimeModalText1')}</ConfirmTip>
        <ConfirmButton>
          <Space>
            <ButtonHover width={isMobile ? '140px' : '164px'} onClick={onClose}>
              {t('Back')}
            </ButtonHover>
            <ButtonPrimary width={isMobile ? '140px' : '164px'} onClick={onCancel}>
              {t('Play again')}
            </ButtonPrimary>
          </Space>
        </ConfirmButton>
      </ConfirmConfirmDialog>
    </>
  )
}
export function GradeModal(props: CustomDialogProps) {
  const { open, onCancel, title, content, garde } = props
  const { t } = useCustomTranslation([LngNs.common])
  const isMobile = useIsW768()
  return (
    <>
      <ConfirmConfirmDialog isMobile={isMobile} isOpen={open} style={{ paddingLeft: '35px', paddingRight: '35px', maxWidth: '546px' }}>
        <ConfirmTitile>{title}</ConfirmTitile>
        <GradeBorder>
          <ConfirmTip style={{ fontSize: '14px' }}>{content}</ConfirmTip>
          <div className="grade-img">
            <img decoding="async" loading="lazy" src={preStaticUrl + '/img/bingo/' + `${garde === 2 ? 'boss.png' : 'baron.png'}`} alt="" />
          </div>
        </GradeBorder>
        <ConfirmButton>
          <Space>
            {/* <ButtonHover width={isMobile?"140px":"164px"} onClick={onClose}>
          Close
        </ButtonHover> */}
            <ButtonPrimary width={isMobile ? '140px' : '164px'} onClick={onCancel}>
              {t('Confirm')}
            </ButtonPrimary>
          </Space>
        </ConfirmButton>
      </ConfirmConfirmDialog>
    </>
  )
}

type IGameModalProps = {
  open: boolean
  children?: React.ReactNode
  onCancel: () => void
  title?: React.ReactNode
  footer?: React.ReactNode
  loading?: boolean
}

export const GameModal = ({ open, children, onCancel, title, footer, loading }: IGameModalProps) => {
  const isMobile = useIsW768()
  return (
    <ConfirmConfirmDialog isMobile={isMobile} isOpen={open}>
      <ConfirmTitile>{loading ? <LoadingSpinner /> : title}</ConfirmTitile>
      <ConfirmTip>{children}</ConfirmTip>
      {footer && <ConfirmButton>{footer}</ConfirmButton>}
    </ConfirmConfirmDialog>
  )
}

const ConfirmConfirm = styled.div<{ isMobile?: boolean }>`
  background: #f8e9c8;
  border-radius: ${({ isMobile }) => (isMobile ? '40px' : '76px')};
  box-shadow: inset 0px -3.73819px 3.73819px rgba(0, 0, 0, 0.25);
  border: 6px solid #ac6513;
  width: 710px;
  height: ${({ isMobile }) => (isMobile ? '272px' : '350px')};
  min-height: 260px;
  text-align: center;
  position: relative;
  margin: 0 15px;
  &::before {
    content: '';
    position: absolute;
    top: 17px;
    right: 17px;
    width: 68px;
    height: 53px;
    background: url(${preStaticUrl + '/img/bingo/confirm-right.svg'}) no-repeat;
  }
  &::after {
    content: '';
    position: absolute;
    bottom: 20px;
    left: 17px;
    width: 68px;
    height: 53px;
    background: url(${preStaticUrl + '/img/bingo/confirm-left.svg'}) no-repeat;
  }
`

type ICountdownProps = {
  children: Any
}

export const CountdownModal: React.FC<ICountdownProps> = ({ children }) => {
  const isMobile = useIsW768()
  return (
    <ConfirmConfirm isMobile={isMobile}>
      <Logo isMobile={isMobile}>
        <img decoding="async" loading="lazy" src={preStaticUrl + '/img/bingo/countdown-logo.png'} alt="" width={isMobile ? '217px' : '373px'} />
      </Logo>
      <ConfirmTip>{children}</ConfirmTip>
    </ConfirmConfirm>
  )
}

export default Modal
