import { CloseOutlined } from '@ant-design/icons'
import { DialogContent, DialogOverlay } from '@reach/dialog'
import { LngNs, preStaticUrl, useCustomTranslation } from '@ui/src'
import { isEqual } from 'lodash'
import React, { FC, memo, useMemo, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import styled from 'styled-components'

import { CardNumbersType } from '@/utils/generateCardNumbers'
import getBingoLines from '@/utils/getBingoLines'

import BingoBoardView from '../BingoBoardView'

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

type Props = {
  showDialog: boolean
  onClose?: () => void
  cardNumbers: number[][]
  selectedNumbers: number[]
}

const CloseBtn = styled.img`
  position: absolute;
  top: -10px;
  right: -16px;
  cursor: pointer;
`
const CustomDialogContent = styled(DialogContent)`
  position: relative;
  border: 6px solid #ac6513;
  background: #f8e9c8;
  width: 450px;
  margin: 0 10px;
  border-radius: 60px;
  filter: drop-shadow(0px 0px 41px rgba(84, 40, 0, 0.7));
  &::before {
    content: '';
    position: absolute;
    top: 19px;
    right: 19px;
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

const BingoBoard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  // padding: 40px 0;
`
const BingoBoardWrapper = styled.div`
  width: 311px;
  height: 361px;
  @media screen and (max-width: 768px) {
    width: 255px;
    height: 295px;
  }
`

export function formatCardNumbers(list: number[][]): CardNumbersType | undefined {
  try {
    const cols = 5
    let currentRow = 1
    let currentCol = 1
    const numberOfSpace = 25
    const cardNumbers: CardNumbersType = []
    for (let idx = 0; idx < numberOfSpace; idx++) {
      const position = list[currentRow - 1][currentCol - 1]
      cardNumbers.push({
        col: currentCol,
        row: currentRow,
        num: position
      })
      currentCol = currentCol === cols ? 1 : currentCol + 1
      currentRow = currentCol === 1 ? currentRow + 1 : currentRow
    }
    return cardNumbers
  } catch (e) {
    console.log('formatCardNumbers err: ', e)
    return undefined
  }
}

export const ViewCard: React.FC<Props> = memo(({ showDialog, onClose, cardNumbers, selectedNumbers }: Props) => {
  // const [cardNumbers, setCardNumbers] = useState(generateCardNumbers({ cols: 5, rows: 5, minNum: 1, maxNum: 35 }))
  const [list, setList] = useState(formatCardNumbers(cardNumbers || []))
  const matchLines = useMemo(() => {
    try {
      if (list) {
        return getBingoLines(selectedNumbers, list)
      }
      return undefined
    } catch (e) {
      return undefined
    }
  }, [selectedNumbers])

  const curNumber = matchLines && matchLines?.length > 0 ? matchLines?.reduce((prev, cur) => prev.concat(cur)) : []
  if (!list) {
    return <></>
  }
  return (
    <StyledDialogOverlay isOpen={showDialog} onDismiss={onClose}>
      <CustomDialogContent>
        <CloseBtn src={preStaticUrl + '/img/bingo/close.svg'} alt="close" onClick={onClose} />
        <BingoBoard>
          <BingoBoardWrapper>
            <BingoBoardView cardNumbers={list} onChange={() => console.error('不能编辑')} editable={false} selectedNumbers={curNumber} />
          </BingoBoardWrapper>
        </BingoBoard>
      </CustomDialogContent>
    </StyledDialogOverlay>
  )
}, isEqual)

const HistoryDialogContent = styled(DialogContent)`
  background: #131313;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding-top: 0px;
  padding-left: 0;
  width: 335px;
  padding-right: 0;
`
const HistoryHeader = styled.div`
  background: rgba(255, 255, 255, 0.04);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px 20px 0px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  color: #ffffff;
`
const HistoryBingoBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 55px);
  grid-template-rows: repeat(5, 65px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 28px;
  color: rgba(255, 255, 255, 0.7);
  border-radius: 16px;
  &.profileBingoItem {
    font-size: 22px;
    border-radius: 0;
    border: none;
    grid-gap: 10px;
    grid-template-columns: repeat(5, 50px);
    grid-template-rows: repeat(5, 50px);
  }
  .space {
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    border-right: 1px solid rgba(255, 255, 255, 0.1);
  }
`

const HistoryCardNumber = styled.div<{
  selected?: boolean
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  cursor: grab;
  font-family: 'Pacifico';
  font-style: normal;
  font-weight: 400;
  font-size: 28px;
  /* border-bottom: ${({ selected }) => (selected ? '1px solid #6673FF' : '1px solid rgba(255, 255, 255, 0.1)')}; */
  /* border-right: ${({ selected }) => (selected ? '1px solid #6673FF' : '1px solid rgba(255, 255, 255, 0.1)')}; */
  color: ${({ selected }) => selected && '#6673ff'};
  background: ${({ selected }) => selected && 'rgba(102, 115, 255, 0.10)'};
  position: relative;

  &.item_profileBingoItem {
    font-size: 22px;
    border-radius: 8px;
    border: 1px solid ${({ selected }) => (selected ? '#6673ff' : '#131313')};
    grid-gap: 4px;
    background: ${({ selected }) => !selected && '#131313'};
    color: ${({ selected }) => (selected ? '#6673ff' : 'rgba(255, 255, 255, 0.30)')};
  }

  &.item_undefined {
    &::after {
      content: '';
      position: absolute;
      border: ${({ selected }) => selected && '1px solid #6673ff'};
      width: ${({ selected }) => selected && '56px'};
      height: ${({ selected }) => selected && '66px'};
      top: -1px;
      left: -1px;
    }
    &:nth-child(1) {
      border-top-left-radius: 16px;
      &::after {
        border-top-left-radius: 16px;
      }
    }

    &:nth-child(5) {
      border-top-right-radius: 16px;
      &::after {
        border-top-right-radius: 16px;
      }
    }

    &:nth-child(21) {
      border-bottom-left-radius: 16px;
      &::after {
        border-bottom-left-radius: 16px;
      }
    }

    &:nth-child(25) {
      border-bottom-right-radius: 16px;
      &::after {
        border-bottom-right-radius: 16px;
      }
    }
  }
`

export const HistoryViewCard: React.FC<Props> = ({ showDialog, onClose, cardNumbers, selectedNumbers }) => {
  const { t } = useCustomTranslation([LngNs.zBingo])
  return (
    <StyledDialogOverlay isOpen={showDialog} onDismiss={onClose}>
      <HistoryDialogContent>
        <HistoryHeader>
          <div>{t('Bingo Card')}</div>
          <div onClick={onClose}>
            <CloseOutlined />
          </div>
        </HistoryHeader>
        <BingoBoard style={{ paddingTop: '30px' }}>
          <HistoryCardItem cardNumbers={cardNumbers} selectedNumbers={selectedNumbers} />
        </BingoBoard>
      </HistoryDialogContent>
    </StyledDialogOverlay>
  )
}
type IHistoryCardItem = {
  className?: string
  cardNumbers: number[][]
  selectedNumbers: number[]
}
export const HistoryCardItem: FC<IHistoryCardItem> = memo(({ cardNumbers, selectedNumbers, className }: IHistoryCardItem) => {
  const list = formatCardNumbers(cardNumbers || [])
  const matchLines = useMemo(() => {
    try {
      if (list) {
        return getBingoLines(selectedNumbers, list)
      }
      return undefined
    } catch (e) {
      return undefined
    }
  }, [selectedNumbers])

  const curNumber = matchLines && matchLines?.length > 0 ? matchLines?.reduce((prev, cur) => prev.concat(cur)) : []

  return (
    <HistoryBingoBoard className={className}>
      <DndProvider backend={HTML5Backend}>
        {(list ?? []).map(cardNumber => (
          <HistoryCardNumber
            className={`item_${className}`}
            selected={curNumber.includes(cardNumber.num)}
            key={`col_${cardNumber.col}-row_${cardNumber.row}-num_${cardNumber.num}`}
          >
            {cardNumber.num}
          </HistoryCardNumber>
        ))}
      </DndProvider>
    </HistoryBingoBoard>
  )
}, isEqual)
