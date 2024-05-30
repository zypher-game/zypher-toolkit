import { IGameList } from '@ui/src'
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
  padding: 12px;
  @media (max-width: 830px) {
    width: 164px;
    height: 190px;
    padding: 8px;
  }
  @media (max-width: 370px) {
    width: 124px;
    height: 148px;
  }
  h6 {
    font-size: 14px;
    line-height: 20px;
    color: #ffd02b;
    margin-bottom: 10px;
    @media (max-width: 830px) {
      font-size: 12px;
      margin-bottom: 5px;
    }
  }
  & > div {
    @media (max-width: 830px) {
      transform-origin: 0% 0%;
      scale: 0.8;
    }
    @media (max-width: 370px) {
      scale: 0.5;
    }
  }
`
const BingoWrapStyled = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  // justify-content: space-between;
  flex-wrap: wrap;
  @media (max-width: 830px) {
    justify-content: space-between;
    gap: 10px;
  }
`
const BingoWrap: FC<IPropsBingoWrap> = memo(({ gameList }: IPropsBingoWrap) => {
  return (
    <BingoWrapStyled>
      {(gameList ?? []).map((v, index) => (
        <BingoItem item={v} key={index} />
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
