import { Button } from 'antd'
import React, { ReactNode, useState } from 'react'
import styled from 'styled-components'

import { HistoryViewCard } from '@/components/ViewCard'

const ViewButton = styled(Button)`
  color: #65edbc;
  &:active {
    color: #65edbc;
  }
  &:hover {
    color: #65edbc;
  }
  &:focus {
    color: #65edbc;
  }
`

export default function ViewCard({ cardNumbers, selectedNumbers }: { cardNumbers: [number[]]; selectedNumbers: number[] }) {
  const [showDialog, setShowDialog] = useState(false)
  return (
    <>
      <ViewButton type="link" onClick={() => setShowDialog(true)}>
        view
      </ViewButton>
      <HistoryViewCard onClose={() => setShowDialog(false)} showDialog={showDialog} cardNumbers={cardNumbers} selectedNumbers={selectedNumbers} />
    </>
  )
}
