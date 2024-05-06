import { PixelBorderCard } from '@ui/src'
import React, { memo } from 'react'
import styled from 'styled-components'

interface IProps {
  children: React.ReactNode
  bgColor?: string
  className?: string
}
const PixelGameListTableStyle = styled.div<{ bgColor: string }>`
  position: relative;
  .pixelGameListTableFl,
  .pixelGameListTableFr {
    position: absolute;
    top: 0;
    width: 7px;
    height: 14px;
    background-color: ${({ bgColor }) => bgColor};
    z-index: 9;
  }
  .pixelGameListTableFl:before,
  .pixelGameListTableFr:before {
    content: '';
    position: absolute;
    width: 7px;
    height: 6px;
    background-color: ${({ bgColor }) => bgColor};
    top: 0;
  }
  .pixelGameListTableFl {
    left: 0;
    &:before {
      left: 7px;
    }
  }
  .pixelGameListTableFr {
    right: 0;
    &:before {
      right: 7px;
    }
  }
  .pixelGameListTableInner {
    > .pixel_flat_inner {
      max-height: 600px;
      overflow-y: scroll;
      justify-content: flex-start;
      flex-direction: column;
      @media screen and (max-width: 768px) {
        max-height: 230px;
        padding-top: 16px;
        padding-bottom: 16px;
        margin-left: 16px;
        margin-right: 16px;
      }
    }
  }
`
const PixelGameListTable = memo(({ children, className, bgColor }: IProps) => {
  return (
    <PixelGameListTableStyle bgColor={bgColor ?? '#1D263B'}>
      <div className="pixelGameListTableFl" />
      <div className="pixelGameListTableFr" />
      <PixelBorderCard pixel_height={7} className={`${className ?? ''} pixelGameListTableInner`} backgroundColor="#161E2E" borderColor="#3A4254">
        {children}
      </PixelBorderCard>
      <div className="pixelTableInnerBottom" />
    </PixelGameListTableStyle>
  )
})
export default PixelGameListTable
