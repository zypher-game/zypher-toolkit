import React from 'react'

import { useCountDown } from '@/hooks/useCountDown'

interface ICountDown {
  time: number
  isInterval?: boolean
}

const CountDown = (prop: ICountDown): React.ReactElement => {
  const { time, isInterval } = prop
  const { days, hours, minutes, seconds } = useCountDown(time)
  return (
    <>
      {time ? (
        <>
          {days > 0 ? <span>{days}d</span> : null}
          {days > 0 && isInterval ? <em>:</em> : null}
          <span>{hours}h</span>
          {isInterval ? <em>:</em> : null}
          <span>{minutes}m</span>
          {isInterval ? <em>:</em> : null}
          <span>{seconds}s</span>
        </>
      ) : (
        `0h 0m 0s`
      )}
    </>
  )
}

export default CountDown
