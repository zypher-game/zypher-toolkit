import { IBingoInfo, IGameStatus, useCustomTranslation } from '@UI/src/'
import { LngNs } from '@UI/src/'
import { isEqual } from 'lodash'
import React, { FC, memo } from 'react'
import styled from 'styled-components'

import ViewCard from '@/pages/Profile/components/viewCard'

const MyDiv = styled.div`
  button {
    margin: 0;
    padding: 0;
  }
  .grey {
    opacity: 0.7;
  }
`
type IProps = {
  status: IGameStatus
  bingoInfo: IBingoInfo
  isMobile: boolean
}
const RanderBingoCard: FC<IProps> = memo(({ status, bingoInfo, isMobile }: IProps) => {
  const { t } = useCustomTranslation([LngNs.home])
  const { cardNumbers, selectedNumbers } = bingoInfo
  return (
    <MyDiv>
      {status === IGameStatus.End ? (
        <ViewCard cardNumbers={cardNumbers} selectedNumbers={selectedNumbers} isMobile={isMobile} />
      ) : (
        <p className="grey">{t('none')}</p>
      )}
    </MyDiv>
  )
}, isEqual)

export default RanderBingoCard
