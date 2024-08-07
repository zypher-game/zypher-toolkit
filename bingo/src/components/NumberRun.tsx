import React, { HTMLProps, memo, useContext, useEffect, useState } from 'react'
import * as shifty from 'shifty'

const lastShifty: Record<string, any> = {}
const lastShiftyFrom: Record<string, any> = {}
let sfIndex = 0

interface CptTypes {
  from: number
  to: number
  duration: number
  fixed?: number
  firstInitFrom?: boolean
}

export const NumberRun = memo((props: CptTypes) => {
  const [value, setValue] = useState(props.from)
  const [index] = useState(sfIndex++)
  useEffect(() => {
    lastShiftyFrom[index] = props.from
    return () => {
      if (!lastShifty[index]) {
        return
      }
      lastShifty[index].stop()
      delete lastShifty[index]
    }
  }, [])

  useEffect(() => {
    UpdateNum(props.to)
  }, [props.to])

  function UpdateNum(to: number) {
    if (lastShiftyFrom[index] === 0 && props.firstInitFrom) {
      lastShiftyFrom[index] = to
    } // 首次
    if (lastShifty[index]) {
      lastShifty[index].stop()
    }
    lastShifty[index] = shifty.tween({
      from: { x: lastShiftyFrom[index] },
      to: { x: to },
      duration: props.duration,
      easing: 'linear',
      render: updateNumber
    })
  }
  function updateNumber(state: any) {
    lastShiftyFrom[index] = state.x
    setValue(state.x)
  }
  // const show = formatNumber(value.toFixed(props.fixed ?? 2));
  return <>{value.toFixed(props.fixed ?? 2)}</>
})
