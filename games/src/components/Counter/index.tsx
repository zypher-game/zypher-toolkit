import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import React, { useEffect, useRef, useState } from 'react'

dayjs.extend(duration)

interface ICounter {
  start?: boolean
}

const Counter: React.FC<ICounter> = ({ start = false }) => {
  const [seconds, setSeconds] = useState(0)
  const timerRef = useRef<NodeJS.Timer>()

  const formatSeconds = () => {
    return dayjs
      .duration({
        seconds: seconds % 60,
        minutes: Math.floor(seconds / 60),
        hours: 0,
        days: 0,
        months: 0,
        years: 0
      })
      .format('mm:ss')
  }

  useEffect(() => {
    if (start) {
      timerRef.current = setInterval(() => {
        setSeconds(sec => sec + 1)
      }, 1000)
    } else {
      timerRef.current && clearInterval(timerRef.current)
    }
  }, [start])

  useEffect(() => {
    return () => {
      timerRef.current && clearInterval(timerRef.current)
    }
  }, [])
  return <span>{formatSeconds()}</span>
}

export default Counter
