import { useIsW768 } from '@ui/src'
import { preStaticUrl } from '@ui/src'
import { Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'

import { CardNumbersType } from '@/utils/generateCardNumbers'

interface IBingoCanvas {
  cardNumbers: CardNumbersType
  onClick: (num: number) => Promise<void>
  isMyTurn: boolean
  round: number
  selectedNumbers?: number[]
  matchLines: number[][]
}

const Lattice = styled(Spin)`
  /* color: rgba(128, 71, 0, 0.3); */
  /* opacity: 0.3 !important; */
  background: linear-gradient(180deg, rgba(255, 245, 232, 0.3) 0%, rgba(251, 231, 206, 0.2) 100%);
  box-shadow: 0px 0px 3px 0px #5f3204, 0px 1px 2px 0px #fff inset, 0px -1px 1px 0px #c69452 inset;
`
const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`
const FlexTable = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-gap: 5px;
`
const SpaceActive = css`
  color: #ffc183;
  pointer-events: none;
  background: #613c17;
  box-shadow: 0px -1px 0px 0px #bf905b inset, 0px 1px 0px 0px #3c2d1a inset;
`
const SpaceDisabled = css`
  color: #6d6d6d;
  pointer-events: none;
  background: linear-gradient(180deg, #f6f7f7 0%, #c2c2c2 100%);
  box-shadow: 0px 0px 3px 0px #5f3204, 0px 1px 2px 0px #fff inset, 0px -1px 1px 0px #687777 inset;
`
const SpaceSelect = css`
  background: #65c60e;
  color: #ffffff;
  pointer-events: none;
`

const FlexCall = styled.div<{ active?: boolean; disabled?: boolean; turn?: boolean; isMobile: boolean }>`
  border-radius: ${({ isMobile }) => (isMobile ? '18px' : '24px')};
  background: linear-gradient(180deg, #fff5e8 0%, #fbe7ce 100%);
  box-shadow: 0px 0px 3px 0px #5f3204, 0px 1px 2px 0px #fff inset, 0px -1px 1px 0px #c69452 inset;
  text-align: center;
  cursor: pointer;
  overflow: hidden;
  font-size: ${({ isMobile }) => (isMobile ? '26px' : '40px')};
  color: #804700;
  ${({ disabled }) => disabled && SpaceDisabled};
  ${({ active }) => active && SpaceActive};
  ${({ turn }) => turn && SpaceSelect};

  div {
    font-family: Pacifico;
  }
`
const LatticeIcon = styled.img`
  animation: ${rotateAnimation} 1s linear infinite;
`

function BingoItem({ num, onClick }: { num: number; onClick: () => Promise<void> }) {
  const [loading, setLoading] = useState(false)
  const antIcon = <LatticeIcon src={preStaticUrl + '/img/bingo/loading.svg'} />

  const handleClickSpace = async () => {
    setLoading(true)
    try {
      await onClick()
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  return (
    <Lattice spinning={loading} indicator={antIcon} size="large">
      <div onClick={handleClickSpace} style={{ padding: '10px' }}>
        {num}
      </div>
    </Lattice>
  )
}

const BingoController: React.FC<IBingoCanvas> = ({ cardNumbers, isMyTurn, round, selectedNumbers = [], matchLines, onClick }) => {
  const [selfDisabled, setSelfDisabled] = useState<boolean>(false)
  const [showTimeOutModal, setShowTimeOutModal] = useState(false)
  const isMobile = useIsW768()
  const curNumber = matchLines?.length > 0 ? matchLines?.reduce((prev, cur) => prev.concat(cur)) : []
  const handleClickSpace = async (num: number) => {
    setSelfDisabled(true)
    try {
      await onClick(num)
    } catch (error) {
      setSelfDisabled(false)
    }
  }

  useEffect(() => {
    setSelfDisabled(false)
  }, [isMyTurn, round])

  useEffect(() => {
    if (!isMyTurn) {
      if (!selfDisabled && round !== 1) {
        setShowTimeOutModal(true)
      }
    } else {
      setShowTimeOutModal(false)
    }
  }, [isMyTurn])

  return (
    <>
      <FlexTable>
        {cardNumbers.map(space => (
          <FlexCall
            key={space.num}
            turn={curNumber?.includes(space.num)}
            active={selectedNumbers.includes(space.num)}
            disabled={!isMyTurn}
            isMobile={isMobile}
          >
            <BingoItem onClick={() => handleClickSpace(space.num)} num={space.num} />
          </FlexCall>
        ))}
      </FlexTable>
    </>
  )
}

export default BingoController
