import { IBingoInfo, useCustomTranslation } from '@ui/src'
import { LngNs } from '@ui/src'
import { Button } from 'antd'
import React, { useState } from 'react'
import styled from 'styled-components'

import { ViewCard as ComponentsViewCard } from '@/components/ViewCard'

const ViewButton = styled(Button)`
  color: #44af18;
  background: transparent;

  font-size: 16px;
  font-weight: 600;
  &:active {
    color: #44af18;
    background: transparent;
  }
  &:hover {
    color: #44af18;
    background: transparent;
  }
  &:focus {
    color: #44af18;
    background: transparent;
  }
`
const BingoCard = styled.div`
  color: #613c17;
  text-align: right;

  font-size: 12px;
  border-radius: 12px;
  border: 1px solid #613c17;
  padding: 2px 10px;
`

export default function ViewCardPage({ bingoInfo, isMobile }: { bingoInfo: IBingoInfo; isMobile?: boolean }) {
  const [showDialog, setShowDialog] = useState(false)
  const { t } = useCustomTranslation([LngNs.zBingo])
  const { cardNumbers, selectedNumbers } = bingoInfo
  return (
    <>
      {isMobile ? (
        <BingoCard onClick={() => setShowDialog(true)}>{t('Bingo Card')}</BingoCard>
      ) : (
        <ViewButton type="link" onClick={() => setShowDialog(true)}>
          {t('view')}
        </ViewButton>
      )}
      <ComponentsViewCard onClose={() => setShowDialog(false)} showDialog={showDialog} cardNumbers={cardNumbers} selectedNumbers={selectedNumbers} />
    </>
  )
}
