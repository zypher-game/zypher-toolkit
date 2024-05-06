import { isEqual } from 'lodash'
import React, { memo } from 'react'
import styled from 'styled-components'
const H2Text = styled.h2`
  font-family: Kanit;
  color: #fff;
`

const PText = styled.p`
  font-family: Kanit;
  background: linear-gradient(90deg, #c597ff 0.27%, #5fd7ff 99.85%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  display: inline-block;
  font-weight: 400;
`
const PTextBorder = styled.div`
  background: linear-gradient(to right, #9275f9, #62d3ff);
  padding: 1px;
  border-radius: 18px;
  display: inline-block;
  .KanitNormalBorder_inner {
    // background-color: #131313;
    background: linear-gradient(to right, #0c2467, #09132c);
    border-radius: 18px;
  }
`
type IProps = { label: string; className: string }
export const KanitTitleText = memo(({ label, className }: IProps) => {
  return <H2Text className={className}>{label}</H2Text>
}, isEqual)

export const KanitNormalText = memo(({ label, className }: IProps) => {
  return <PText className={className}>{label}</PText>
}, isEqual)

export const KanitNormalBorder = memo(({ label, className }: IProps) => {
  return (
    <PTextBorder className={className}>
      <div className="KanitNormalBorder_inner">
        <PText>{label}</PText>
      </div>
    </PTextBorder>
  )
}, isEqual)
