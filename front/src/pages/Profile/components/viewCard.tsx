import { PixelBorderCardButton, useCustomTranslation } from '@ui/src'
import { LngNs } from '@ui/src'
import { Button } from 'antd'
import React, { FC, memo, useState } from 'react'
import styled from 'styled-components'

import { HistoryViewCard } from '@/components/ViewCard'

const ViewButton = styled(Button)<{ ismobile: string }>`
  color: ${({ ismobile }) => (ismobile === 'true' ? '#1649FF' : '#FFD02B')};
  background-color: transparent;
  &:active {
    color: ${({ ismobile }) => (ismobile === 'true' ? '#1649FF' : '#FFD02B')};
  }
  &:hover {
    color: ${({ ismobile }) => (ismobile === 'true' ? '#1649FF' : '#FFD02B')};
  }
  &:focus {
    color: ${({ ismobile }) => (ismobile === 'true' ? '#1649FF' : '#FFD02B')};
  }
`
const PixelBorderCardButtonStyled = styled(PixelBorderCardButton)`
  padding: 0 10px;
  color: #fff;
  font-size: 12px;
  line-height: 22px;
`
type IViewCardProps = {
  cardNumbers: number[][]
  selectedNumbers: number[]
  isMobile: boolean
}
const ViewCard: FC<IViewCardProps> = ({ cardNumbers, selectedNumbers, isMobile }: IViewCardProps) => {
  const [showDialog, setShowDialog] = useState(false)
  const { t } = useCustomTranslation([LngNs.home])
  return (
    <>
      <IWidget type="link" onClick={() => setShowDialog(true)} isMobile={isMobile}>
        {isMobile ? t('Bingo Card') : t('view')}
      </IWidget>
      <HistoryViewCard onClose={() => setShowDialog(false)} showDialog={showDialog} cardNumbers={cardNumbers} selectedNumbers={selectedNumbers} />
    </>
  )
}
const IWidget = memo(
  (props: {
    type: 'link' | 'text' | 'default' | 'ghost' | 'primary' | 'dashed' | undefined
    onClick: any
    isMobile: boolean
    children: React.ReactNode
  }) => {
    const { type, isMobile, children, onClick } = props
    return isMobile ? (
      <PixelBorderCardButtonStyled pixel_height={2} height="22px" borderColor="#1649FF" backgroundColor="#161E2E" onClick={onClick}>
        {children}
      </PixelBorderCardButtonStyled>
    ) : (
      <ViewButton type={type} onClick={onClick} ismobile={`${isMobile}`}>
        {props.children}
      </ViewButton>
    )
  }
)
export default ViewCard
