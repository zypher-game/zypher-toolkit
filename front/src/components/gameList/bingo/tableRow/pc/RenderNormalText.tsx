import { PlayerAvatar, PointsIcon } from '@UI/src/'
import { isEqual } from 'lodash'
import React, { FC, memo } from 'react'
import styled from 'styled-components'

import css from '../../gameListTable.module.stylus'

const StatusP = styled.p<{ isMobile: boolean }>`
  display: flex;
  align-items: center;
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
const RenderNormalText: FC<IProps> = memo(({ label, showPoint, isMobile }: IProps) => {
  return `${label}`.startsWith('0x') ? (
    <PlayerAvatar className={css.account} size={22} account={label} showAccount={true} border={false} />
  ) : (
    <StatusP isMobile={isMobile}>
      {label}
      {showPoint ? <PointsIcon isMobile={isMobile} /> : null}
    </StatusP>
  )
}, isEqual)
export default RenderNormalText
