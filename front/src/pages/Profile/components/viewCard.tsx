import { useCustomTranslation } from '@UI/src/'
import { LngNs } from '@UI/src/'
import { Button } from 'antd'
import React, { FC, useState } from 'react'
import styled from 'styled-components'

import { HistoryViewCard } from '@/components/ViewCard'

const ViewButton = styled(Button)<{ ismobile: string }>`
  color: ${({ ismobile }) => (ismobile === 'true' ? '#6673FF' : '#65edbc')};
  background-color: transparent;
  ${({ ismobile }) =>
    ismobile === 'true' ? 'border-radius: 12px;border: 1px solid #6673FF;font-size: 12px;padding: 0 10px;height: 22px;line-height: 20px;' : null}
  &:active {
    color: ${({ ismobile }) => (ismobile === 'true' ? '#6673FF' : '#65edbc')};
  }
  &:hover {
    color: ${({ ismobile }) => (ismobile === 'true' ? '#6673FF' : '#65edbc')};
  }
  &:focus {
    color: ${({ ismobile }) => (ismobile === 'true' ? '#6673FF' : '#65edbc')};
  }
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
      <ViewButton type="link" onClick={() => setShowDialog(true)} ismobile={`${isMobile}`}>
        {isMobile ? t('Bingo Card') : t('view')}
      </ViewButton>
      <HistoryViewCard onClose={() => setShowDialog(false)} showDialog={showDialog} cardNumbers={cardNumbers} selectedNumbers={selectedNumbers} />
    </>
  )
}
export default ViewCard
