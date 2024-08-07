import { PointsIcon } from '@ui/src'
import { isEqual } from 'lodash'
import React, { FC, memo } from 'react'
import styled from 'styled-components'

import BingoPlayerAvatar from '@/components/BingoPlayerAvatar/BingoPlayerAvatar'

import css from './account.module.stylus'

const StatusP = styled.p<{ isMobile: boolean }>`
  display: flex;
  align-items: center;
  color: #613c17;
  img {
    display: inline-block;
    width: ${({ isMobile }) => (isMobile ? '20px' : '30px')};
    margin-left: ${({ isMobile }) => (isMobile ? '4px' : '10px')};
  }
`
type IProps = {
  label: string
  showPoint: boolean
  isMobile: boolean
}
const RanderNormalText: FC<IProps> = memo(({ label, showPoint, isMobile }: IProps) => {
  return `${label}`.startsWith('0x') ? (
    <BingoPlayerAvatar className={css.account} size={22} account={label} showAccount={true} border={false} />
  ) : (
    <StatusP isMobile={isMobile}>
      {label}
      {showPoint ? <PointsIcon isMobile={isMobile} /> : null}
    </StatusP>
  )
}, isEqual)
export default RanderNormalText
