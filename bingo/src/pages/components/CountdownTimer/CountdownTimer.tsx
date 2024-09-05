import { AddressZero } from '@ethersproject/constants'
import { Progress } from 'antd'
import React, { useEffect, useState } from 'react'

import useGameTimeout from '@/hooks/useGameTimeout'
import { IRoomInfo } from '@/hooks/useGetGameInfoV1.types'

import css from './countdownTimer.module.stylus'

function CountdownTimer({ roomInfo }: { roomInfo: IRoomInfo }) {
  const [round, setRound] = useState(1)
  const { gameTime } = useGameTimeout()
  const [boostRounds, maxDuration, roundGap, roundTimeout, startTimeout] = gameTime
  const [seconds, setSeconds] = useState(roundTimeout)
  const [totalTime, setTotaltime] = useState(roundTimeout)
  useEffect(() => {
    setSeconds(roomInfo.remain)
    console.log({ remain: roomInfo.remain })
    setTotaltime(roomInfo.remain)
    setRound(roomInfo.round)
  }, [roomInfo.round, roomInfo.player])

  useEffect(() => {
    if (roomInfo.player === AddressZero) {
      setSeconds(100)
      setRound(roomInfo.round)
    }
  }, [roomInfo.player])

  useEffect(() => {
    let intervalId: NodeJS.Timeout
    if (seconds > 0) {
      intervalId = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1)
      }, 1000)
    }

    return () => clearInterval(intervalId)
  }, [round, seconds])
  console.log({ seconds, totalTime })
  return (
    <div className={css.ProgressBorder}>
      <div className={css.ProgressBorderShadow}>
        <Progress
          percent={(seconds / totalTime) * 100}
          showInfo={false}
          strokeWidth={15}
          trailColor={'transparent'}
          strokeColor={'linear-gradient(180deg, #F0FF44 3.33%, #50A821 54.69%, #268D05 70.3%, #329A10 87.41%, #4CCE22 100%)'}
        />
      </div>
    </div>
  )
}

export default CountdownTimer
