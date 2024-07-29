import './index.css'

import { DialogContent, DialogOverlay } from '@reach/dialog'
import { useCustomTranslation } from '@zypher-game/toolkit/ui'
import { LngNs } from '@zypher-game/toolkit/ui'
import { motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'

interface IProps {
  hour?: string
  minute?: string
  second?: string
  mss: number
  open: boolean
}

type Fnc = () => void
const noop = () => {}
const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: any) => {
    const delay = 0
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          delay,
          type: 'spring',
          duration: 1,
          bounce: 0,
          repeat: Infinity
        },
        opacity: { delay, duration: 0.01 }
      }
    }
  }
}

export default function CountDown(props: IProps) {
  const { t } = useCustomTranslation([LngNs.zBingo])
  const { mss, open } = props
  const [time, setTime] = useState(mss)
  const tickRef = useRef<Fnc>(noop)

  const tick = () => {
    if (time > 0) {
      setTime(time - 1)
    }
  }

  useEffect(() => {
    tickRef.current = tick
  })

  useEffect(() => {
    const timer = setInterval(() => tickRef.current(), 1000)
    return () => clearInterval(timer)
  }, [])
  return (
    <DialogOverlay isOpen={open}>
      <DialogContent style={{ background: 'transparent' }}>
        <div className="notion-wrap">
          <div className="count-down-time">{time}</div>
          <div className="notion-svg">
            <motion.svg width="128" height="128" initial="hidden" animate="visible">
              <motion.circle cx="64" cy="64" r="60" stroke="#FFF" />
              <motion.circle cx="64" cy="64" r="60" stroke="#59B407" variants={draw} custom={1} />
            </motion.svg>
          </div>
          <div className="content">{t('CountDownText1')}</div>
        </div>
      </DialogContent>
    </DialogOverlay>
  )
}
