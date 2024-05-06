import { IGameStatus, LngNs, useCustomTranslation } from '@ui/src'
import { isEqual } from 'lodash'
import React, { FC, memo } from 'react'
import styled from 'styled-components'

export const StatusI = styled.i<{ isMobile: boolean }>`
  box-sizing: content-box;
  display: inline-block;
  width: ${({ isMobile }) => (isMobile ? '5px' : '6px')};
  height: ${({ isMobile }) => (isMobile ? '5px' : '6px')};
  background-color: #65edbc;
  margin-left: ${({ isMobile }) => (isMobile ? '4px' : '10px')};
  border-radius: 50%;
  position: relative;
  &:before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: ${({ isMobile }) => (isMobile ? '-2px' : '-3px')};
    left: ${({ isMobile }) => (isMobile ? '-2px' : '-3px')};
    border: ${({ isMobile }) => (isMobile ? '2px' : '3px')} solid rgba(101, 237, 188, 0.19);
    box-sizing: content-box;
    border-radius: 50%;
  }
`
const Upper = styled.em`
  text-transform: capitalize;
  font-family: PixeloidSans;
  font-weight: 600;
`
type IProps = {
  status: IGameStatus
  isMobile: boolean
}
const RenderStatus: FC<IProps> = memo(({ status, isMobile }: IProps) => {
  const { t } = useCustomTranslation([LngNs.home])
  return (
    <p>
      <Upper>{t(status)} </Upper>
      {status === IGameStatus.Live ? <StatusI isMobile={isMobile} /> : null}
    </p>
  )
}, isEqual)

export default RenderStatus
