import { preStaticUrl } from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo, useCallback, useEffect, useRef, useState } from 'react'

import css from './Butterfly.module.styl'

const ButterfliesList = ['butterfly_red.gif', 'butterfly_yellow.gif', 'butterfly_blue.gif']

interface ButterflyProps {
  id: number
  x: number
  y: number
  direction: number
  size: string
  animationDuration: number
  animationDelay: number
}

const Butterflies = memo(() => {
  const [butterflies, setButterflies] = useState<ButterflyProps[]>([])

  const initializeButterflies = useCallback(() => {
    const directions = new Set<number>()
    const initialButterflies = Array.from({ length: 3 }, (_, i) => {
      let direction: number

      // 确保方向唯一
      do {
        direction = Math.floor(Math.random() * 3)
      } while (directions.has(direction))

      directions.add(direction)

      return {
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        direction,
        animationDuration: (Math.random() * 10 + 5) * 2000,
        animationDelay: Math.random() * 5000,
        size: `${Math.random() * 20 + 30}px`
      }
    })
    setButterflies(initialButterflies)
  }, [])

  useEffect(() => {
    initializeButterflies()
  }, [initializeButterflies])

  const isOutOfScreen = useCallback((butterfly: ButterflyProps) => {
    const rect = {
      right: butterfly.x + parseInt(butterfly.size),
      left: butterfly.x,
      bottom: butterfly.y + parseInt(butterfly.size),
      top: butterfly.y
    }
    return rect.right < 0 || rect.left > window.innerWidth || rect.bottom < 0 || rect.top > window.innerHeight
  }, [])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setButterflies(prevButterflies =>
        prevButterflies.map(butterfly => {
          if (isOutOfScreen(butterfly)) {
            return {
              ...butterfly,
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              direction: (Math.random() * 3) | 0, // 随机方向
              animationDelay: Math.random() * 5000
            }
          }
          return butterfly
        })
      )
    }, 5000)

    return () => clearInterval(intervalId)
  }, [isOutOfScreen])

  return (
    <div className={css['butterflies-container']}>
      {butterflies.map((butterfly, index) => (
        <Butterfly key={butterfly.id} {...butterfly} path={`${preStaticUrl}/img/bingo/${ButterfliesList[index % ButterfliesList.length]}`} />
      ))}
    </div>
  )
}, isEqual)

const Butterfly = ({ x, y, path, direction, size, animationDuration, animationDelay }: ButterflyProps & { path: string }) => {
  const butterflyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (butterflyRef.current) {
      butterflyRef.current.style.transform = `translate(${x}px, ${y}px)`
    }
  }, [x, y])

  return (
    <div
      className={`${css.butterfly} ${css[`butterfly-${direction}`]}`}
      style={{
        '--animation-duration': `${animationDuration}ms`,
        '--animation-delay': `${animationDelay}ms`,
        width: size,
        height: size
      }}
      ref={butterflyRef}
    >
      <img src={path} alt="Butterfly" />
    </div>
  )
}

export default Butterflies
