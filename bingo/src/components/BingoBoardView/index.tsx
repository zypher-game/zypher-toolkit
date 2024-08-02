import { useIsW768 } from '@ui/src'
import { Input } from 'antd'
import cx from 'classnames'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import styled from 'styled-components'

import { CardNumbersType } from '@/utils/generateCardNumbers'

const BingoBoardRoot = styled.div<{ isMobile: boolean }>`
  position: relative;
  /* padding: ${({ isMobile }) => (isMobile ? '10px' : '20px')}; */
  height: 100%;
  width: 100%;
  /* height: ${({ isMobile }) => (isMobile ? '220px' : '374px')}; */

  &::before {
    display: block;
    content: ' ';
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    height: 100%;
    background: #613c17;
    box-shadow: 0px 0px 1px #552b01, inset 0px -1px 1px #392109, inset 0px 1px 2px #a3692f;
    border-radius: ${({ isMobile }) => (isMobile ? '12px' : '30px')};
    transform: rotate(-7.68deg);
  }
`
const BingoBoardBox = styled.div<{ isMobile: boolean }>`
  background: linear-gradient(180deg, #fff5e8 0%, #ffeed7 100%);
  box-shadow: 0px 0px 3px #ba7e40, inset 0px -1px 1px #e9be85, inset 0px 1px 2px #ffffff;
  border-radius: ${({ isMobile }) => (isMobile ? '12px' : '30px')};
  padding: ${({ isMobile }) => (isMobile ? '7px' : '18px')};
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
`
const BingoBoard = styled.div<{ isMobile: boolean }>`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  border-top: 1px solid #804700;
  border-left: 1px solid #804700;
  font-size: ${({ isMobile }) => (isMobile ? '24px' : '28px')};
  color: #804700;
  width: 100%;
  height: 100%;
  border-radius: ${({ isMobile }) => (isMobile ? '12px' : '16px')};
  .active {
    background: #65c60e;
    color: #fff;
  }
  .input {
    width: 80%;
    text-align: center;
    font-size: ${({ isMobile }) => (isMobile ? '12px' : '28px')};
  }
  .space {
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #804700;
    border-right: 1px solid #804700;
    cursor: grab;
    font-style: normal;
    font-weight: 400;
    &:nth-child(1) {
      border-top-left-radius: ${({ isMobile }) => (isMobile ? '12px' : '16px')};
    }

    &:nth-child(5) {
      border-top-right-radius: ${({ isMobile }) => (isMobile ? '12px' : '16px')};
    }

    &:nth-child(21) {
      border-bottom-left-radius: ${({ isMobile }) => (isMobile ? '12px' : '16px')};
    }

    &:nth-child(25) {
      border-bottom-right-radius: ${({ isMobile }) => (isMobile ? '12px' : '16px')};
    }
  }
`

interface IBingoBoardView {
  cardNumbers: CardNumbersType
  onChange: (cardNumbers: CardNumbersType) => void
  editable?: boolean
  selectedNumbers?: number[]
}

interface ICardNumberInput {
  num: number
  onSwitch: (currentNum: number, nextNum: number) => void
  onChange: (num: number) => number
  editable?: boolean
  selectedNumbers?: number[]
}

export const CardNumber: React.FC<ICardNumberInput> = props => {
  const { num, onChange, onSwitch, editable, selectedNumbers = [] } = props

  const ref = useRef()
  const [edit, setEdit] = useState(false)
  const [numVal, setNumVal] = useState(`${num}`)
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'number',
    item: { num },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId()
    })
  }))

  const [_, drop] = useDrop({
    accept: 'number',
    drop: (item: { num: number }) => {
      onSwitch(item.num, num)
    }
  })

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setEdit(false)
    }
  }

  const handleNumberChange = () => {
    const latestNum = onChange(+numVal)
    if (latestNum != +numVal) {
      setNumVal(`${latestNum}`)
    }
  }

  const opacity = isDragging ? 0.4 : 1

  drag(drop(ref))

  useEffect(() => {
    if (!edit) {
      handleNumberChange()
    }
  }, [edit])

  return (
    <div
      ref={ref as any}
      className={cx('space', { ['active']: selectedNumbers.includes(num) })}
      style={{ opacity }}
      onClick={() => setEdit(true)}
      draggable={!edit}
    >
      {edit && editable ? (
        <Input
          autoFocus
          onBlur={() => setEdit(false)}
          className={'input'}
          onKeyDown={handleKeyDown}
          value={numVal}
          onChange={event => setNumVal(event.target.value)}
        />
      ) : (
        num
      )}
    </div>
  )
}

const BingoBoardView: React.FC<IBingoBoardView> = ({ cardNumbers, editable = false, onChange, selectedNumbers }) => {
  const excludeNums = useMemo(() => cardNumbers.map(cardNumber => cardNumber.num), [cardNumbers])
  const isMobile = useIsW768()
  const handleNumberSwitch = (currentNum: number, nextNum: number) => {
    const newCardNumber: CardNumbersType = []
    for (const cardNumber of cardNumbers) {
      if (cardNumber.num === currentNum) {
        newCardNumber.push({ ...cardNumber, num: nextNum })
      } else if (cardNumber.num === nextNum) {
        newCardNumber.push({ ...cardNumber, num: currentNum })
      } else {
        newCardNumber.push({ ...cardNumber })
      }
    }
    onChange(newCardNumber)
  }

  const handleNumberChange = (col: number, row: number) => {
    return (num: number) => {
      if (!Number.isNaN(num) && !excludeNums.includes(num) && num > 0 && num <= 36) {
        onChange(
          cardNumbers.map(cardNumber => {
            if (cardNumber.col === col && cardNumber.row === row) {
              return { ...cardNumber, num }
            }
            return { ...cardNumber }
          })
        )
        return num
      }
      return cardNumbers.find(cardNumber => cardNumber.col === col && cardNumber.row === row)?.num || 0
    }
  }

  return (
    <BingoBoardRoot isMobile={isMobile}>
      <BingoBoardBox isMobile={isMobile}>
        <BingoBoard isMobile={isMobile}>
          <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
            {cardNumbers.map(cardNumber => (
              <CardNumber
                selectedNumbers={selectedNumbers}
                editable={editable}
                key={`col_${cardNumber.col}-row_${cardNumber.row}-num_${cardNumber.num}`}
                num={cardNumber.num}
                onSwitch={handleNumberSwitch}
                onChange={handleNumberChange(cardNumber.col, cardNumber.row)}
              />
            ))}
          </DndProvider>
        </BingoBoard>
      </BingoBoardBox>
    </BingoBoardRoot>
  )
}

export default BingoBoardView
