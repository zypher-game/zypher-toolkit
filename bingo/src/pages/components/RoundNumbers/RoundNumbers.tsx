import { preStaticUrl } from '@ui/src'
import { useIsW768 } from '@ui/src'
import React, { useEffect, useMemo, useState } from 'react'
import { animated, useSpring } from 'react-spring'
import styled, { keyframes } from 'styled-components'

import css from './RoundNumbers.module.stylus'

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`
const LatticeIcon = styled.img`
  animation: ${rotateAnimation} 1s linear infinite;
`

interface IRoundNumbers {
  selectNumber: Map<number, number>
  round: number
}

const RoundNumbers: React.FC<IRoundNumbers> = ({ round, selectNumber }) => {
  const [isMovingRight, setIsMovingRight] = useState(false)
  const [numbers, setNumbers] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8])
  const isMobile = useIsW768()
  const move = useMemo(() => {
    if (isMovingRight) {
      return 'translateX(0px)'
    }
    if (isMobile) {
      return 'translateX(-42px)' // 38px + 6px
    }
    return 'translateX(-93px)' // 80px
  }, [isMobile, isMovingRight])
  // Animation config for moving the box to the right
  const moveRightAnimation = useSpring({
    transform: move,
    config: {
      duration: 500
    }
  })

  // Animation config for moving the box back to the original position
  const moveLeftAnimation = useSpring({
    transform: move,
    config: {
      duration: 0
    }
  })

  useEffect(() => {
    setNumbers(prevBoxes => {
      const lastBox = prevBoxes.pop()
      prevBoxes.unshift(lastBox!)
      return [...prevBoxes]
    })
    setIsMovingRight(prev => {
      return !prev
    })
    setTimeout(() => {
      setIsMovingRight(prev => {
        return !prev
      })
    }, 500)
  }, [round])
  return (
    <div className={css.roundNumbersV2BoxWrap}>
      <div className={css.roundNumbersV2}>
        {numbers.map((num, index) => (
          <animated.div key={`${num}+${index}`} style={isMovingRight ? moveRightAnimation : moveLeftAnimation}>
            <div className={css.roundNumbersV2Box} key={`${num}+${index}`}>
              {index === 0 ? (
                <span className="span_loading">
                  <LatticeIcon src={preStaticUrl + '/img/loading.svg'} />
                </span>
              ) : (
                <>
                  {index === 1 ? (
                    selectNumber.get(round) ? (
                      <span className={css.span_num}>{selectNumber.get(round)}</span>
                    ) : (
                      <span className="span_loading">
                        <LatticeIcon src={preStaticUrl + '/img/loading.svg'} />
                      </span>
                    )
                  ) : (
                    <>
                      {selectNumber.get(round + 1 - index) ? (
                        <span className={css.span_num}>{selectNumber.get(round + 1 - index)}</span>
                      ) : (
                        <span className={css.span_pass}>{round - index >= 0 ? 'pass' : ''}</span>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </animated.div>
        ))}
      </div>
    </div>
  )
}

export default RoundNumbers
