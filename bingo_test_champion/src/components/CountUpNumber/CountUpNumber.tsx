import { DivWrap } from '@ui/src'
import { isEqual } from 'lodash'
import React, { FC, memo, useMemo } from 'react'
import CountUp from 'react-countup'

interface IBalanceProps {
  value: number
  decimals?: number
  prefix?: string
  unit?: string
  onClick?: (event: React.MouseEvent<HTMLElement>) => void
  strikeThrough?: boolean
  startFromValue?: boolean
  WrapElement?: any
  className?: string
  showDiv: boolean
  duration?: number
}
const CountUpNumber: FC<IBalanceProps> = memo(
  ({ value, decimals = 3, unit, prefix, duration, startFromValue = false, showDiv, className }: IBalanceProps) => {
    const prefixProp = useMemo(() => (prefix ? { prefix } : {}), [prefix])
    const suffixProp = useMemo(() => (unit ? { suffix: unit } : {}), [unit])
    return (
      <CountUp
        start={startFromValue ? value : 0}
        preserveValue
        delay={0}
        end={value}
        decimals={decimals}
        duration={duration ?? 1}
        separator=","
        {...prefixProp}
        {...suffixProp}
      >
        {({ countUpRef }) => (
          <DivWrap showDiv={showDiv} className={className}>
            <span ref={countUpRef} />
          </DivWrap>
        )}
      </CountUp>
    )
  },
  isEqual
)
export default CountUpNumber
