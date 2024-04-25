import { IGameList } from '@UI/src/'
import { isEqual } from 'lodash'
import React, { FC, memo } from 'react'
import styled from 'styled-components'

import { HistoryCardItem } from '@/components/ViewCard'
type IPropsBingoWrap = {
  gameList: IGameList[] | undefined
}
type IProps = {
  item: IGameList
}
const BingoItemWrap = styled.div`
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.04);
  padding: 19px;
  @media (max-width: 768px) {
    width: 164px;
    height: 190px;
    padding: 8px;
  }
  @media (max-width: 370px) {
    width: 124px;
    height: 148px;
  }
  h6 {
    font-size: 16px;
    font-weight: 300;
    line-height: 20px;
    color: #65edbc;
    margin-bottom: 20px;
    @media (max-width: 768px) {
      font-size: 12px;
      margin-bottom: 5px;
    }
  }
  & > div {
    @media (max-width: 768px) {
      transform-origin: 0% 0%;
      scale: 0.5;
    }
    @media (max-width: 370px) {
      scale: 0.35;
    }
  }
`
const BingoWrapStyled = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  // justify-content: space-between;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    justify-content: space-between;
    gap: 10px;
  }
`
const BingoWrap: FC<IPropsBingoWrap> = memo(({ gameList }: IPropsBingoWrap) => {
  return (
    <BingoWrapStyled>
      {(gameList ?? []).map(v => (
        <BingoItem item={v} key={v.roomIDStr} />
      ))}
    </BingoWrapStyled>
  )
}, isEqual)
const BingoItem: FC<IProps> = memo(({ item }: IProps) => {
  return (
    <BingoItemWrap>
      <h6>{item.roomIDStr}</h6>
      <HistoryCardItem cardNumbers={item.bingoInfo.cardNumbers} selectedNumbers={item.bingoInfo.selectedNumbers} className="profileBingoItem" />
    </BingoItemWrap>
  )
}, isEqual)
export default BingoWrap
