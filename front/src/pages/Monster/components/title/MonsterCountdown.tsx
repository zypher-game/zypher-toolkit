import { preStaticUrl } from '@ui/src'
import { useRecoilState, useSetRecoilState } from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import { refreshMonsterState } from '../../state/monsterState'

type IMonsterCountdown = {
  endTime: string //"2023-10-15T09:00:00"
  className?: string
}
const MonsterCountdownStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: -10px;
  img {
    width: 32px;
    height: 32px;
    @media (max-width: 768px) {
      width: 20px;
      height: 20px;
    }
  }
  p {
    background: linear-gradient(180deg, #e0f5fe, #a0e3ff);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-align: center;
    font-family: 'Arial Rounded MT Bold';
    font-size: 30px;
    line-height: 50px;
    @media (max-width: 768px) {
      line-height: 23px;
      font-size: 20px;
    }
  }
  &.fightAction {
    gap: 8px;
    margin-top: 16px;
    @media (max-width: 768px) {
      margin-top: 10px;
    }
    img {
      width: 20px;
      height: 20px;
    }
    p {
      font-size: 14px;
      line-height: 22px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
`
const MonsterCountdown: React.FC<IMonsterCountdown> = memo(({ endTime, className }: IMonsterCountdown) => {
  const [countdown, setCountdown] = useState<number>(0)
  const intervalRef = useRef<number | null>(null)
  const setRefreshMonsterState = useSetRecoilState(refreshMonsterState)
  useEffect(() => {
    if (endTime) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      // const targetDate = new Date(endTime).getTime()
      const targetDate = Number(endTime)
      intervalRef.current = window.setInterval(() => {
        const now = new Date().getTime()
        const distance = targetDate - now
        if (distance < 0) {
          setRefreshMonsterState(`${now}`)
        } else {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24))
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
          const seconds = Math.floor((distance % (1000 * 60)) / 1000)
          setCountdown(days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60 + seconds)
          if (distance <= 0 && intervalRef.current) {
            clearInterval(intervalRef.current)
          }
        }
      }, 1000)
    }

    return () => {
      intervalRef.current && clearInterval(intervalRef.current)
    }
  }, [endTime])

  return (
    <MonsterCountdownStyled className={className}>
      <img src={preStaticUrl + `/img/monster/clock.png`} alt="clock" />
      <p>
        {Math.floor(countdown / (24 * 60 * 60))} D : {Math.floor((countdown % (24 * 60 * 60)) / (60 * 60))} h :
        {Math.floor((countdown % (60 * 60)) / 60)} m : {countdown % 60} s
      </p>
    </MonsterCountdownStyled>
  )
}, isEqual)

export default MonsterCountdown
