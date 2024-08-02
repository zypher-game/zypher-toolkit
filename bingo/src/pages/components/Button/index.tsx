import { preStaticUrl } from '@ui/src'
import { ButtonProps } from 'antd'
import { Howl } from 'howler'
import React from 'react'
import styled, { css } from 'styled-components'

type BaseButtonProps = {
  padding?: string
  width?: string
  $borderRadius?: string
  altDisabledStyle?: boolean
} & ButtonProps

export const BaseButton = styled.button<BaseButtonProps>`
  padding: ${({ padding }) => padding ?? '16px'};
  width: ${({ width }) => width ?? '100%'};
  font-weight: 400;
  height: auto;
  font-size: ${({ size }) => size ?? '22px'};

  text-align: center;
  border-radius: ${({ $borderRadius }) => $borderRadius ?? '47px'};
  outline: none;
  border: 0px solid transparent;
  color: ${({ color }) => color ?? '#fff5e1'};
  text-decoration: none;
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  align-items: center;
  cursor: pointer;
  position: relative;
  z-index: 1;
  filter: drop-shadow(0px 4px 7px #fcd7a6);
  &::before {
    content: ' ';
    display: block;
    background: url(${preStaticUrl + '/img/bingo/ellipse-big.svg'}) no-repeat;
    width: 16px;
    height: 13px;
    position: absolute;
    top: 3px;
    left: 18px;
    opacity: 1;
  }
  &::after {
    content: ' ';
    background: url(${preStaticUrl + '/img/bingo/ellipse-small.svg'}) no-repeat;
    width: 16px;
    height: 13px;
    position: absolute;
    top: 13px;
    left: 10px;
  }
  &:disabled {
    opacity: 50%;
    cursor: auto;
    pointer-events: none;
  }
  div {
  }

  will-change: transform;
  transition: transform 450ms ease;
  transform: perspective(1px) translateZ(0);

  > * {
    user-select: none;
  }

  > a {
    text-decoration: none;
  }
`
// export const ButtonPrimary = styled(BaseButton)`
//   border: 0px;
//   background: linear-gradient(180deg, #daff71 0%, #88e413 3%, #2a9507 80%, #1b7b00 100%);
//   &:focus {
//     color: #fff5e1;
//     background: linear-gradient(180deg, #ffc978 0%, #ff7e3c 45.83%, #c53213 100%);
//   }
//   &:hover {
//     color: #fff5e1;
//     background: linear-gradient(180deg, #ffc978 0%, #ff7e3c 45.83%, #c53213 100%);
//   }
//   &:active {
//     color: #fff5e1;
//     background: linear-gradient(180deg, #ffc978 0%, #ff7e3c 45.83%, #c53213 100%);
//   }
//   &:disabled {
//     background: linear-gradient(180deg, #ffffff 0%, #a0a5a5 39.58%, #696969 100%);
//     color: #e2e2e2;
//     cursor: auto;
//     box-shadow: none;
//     outline: none;
//   }
// `

const disabledStyle = css`
  background: linear-gradient(180deg, #e2e2e2 0%, #828282 100%);
  cursor: auto;
  pointer-events: none;
`

export const ButtonWrap = styled.button<{
  $borderRadius?: string
  height?: string
  width?: string
  disabled?: boolean | undefined
  $borderWidth?: string
  $borderColor?: string
}>`
  padding: 5px;
  position: relative;
  border: ${({ $borderWidth }) => $borderWidth ?? '0px'} solid ${({ $borderColor }) => $borderColor ?? '#FFD58F'};
  height: ${({ height }) => height ?? '58px'};
  border-radius: ${({ $borderRadius }) => $borderRadius ?? '47px'};
  width: ${({ width }) => width ?? '100%'};
  cursor: pointer;
  &::before {
    content: ' ';
    background: url(${preStaticUrl + '/img/bingo/ellipse-big.svg'}) no-repeat;
    width: 16px;
    height: 13px;
    position: absolute;
    top: 3px;
    left: 18px;
    z-index: 1;
  }
  &::after {
    content: ' ';
    background: url(${preStaticUrl + '/img/bingo/ellipse-small.svg'}) no-repeat;
    width: 16px;
    height: 13px;
    position: absolute;
    top: 15px;
    left: 12px;
    opacity: 1;
  }
`
export const ButtonContent = styled.div<{
  $borderRadius?: string
  width?: string
  disabled?: boolean | undefined
}>`
  border-radius: ${({ $borderRadius }) => $borderRadius ?? '47px'};
  filter: blur(1px);
  border: 0px;
  width: 100%;
  pointer-events: none;
  height: 100%;
`
const ButtonWrapPrimary = styled(ButtonWrap)`
  background: linear-gradient(180deg, #daff71 0%, #66c80f 36.98%, #1b7b00 100%);
  &:hover {
    background: linear-gradient(180deg, #ffc978 0%, #ff7e3c 45.83%, #c53213 100%);
    .btn-content {
      background: linear-gradient(180deg, #fdaf53 0%, #dc4f26 100%);
    }
    .btn-text {
      text-shadow: -1px -1.5px 0px #892702;
    }
  }
  ${({ disabled }) =>
    disabled &&
    css`
      background: linear-gradient(180deg, #ffffff 0%, #a0a5a5 39.58%, #696969 100%);
      cursor: auto;
      pointer-events: none;
    `};
`

const ButtonContentPrimary = styled(ButtonContent)`
  background: linear-gradient(180deg, #88e413 0%, #2a9507 100%);
  ${({ disabled }) => disabled && disabledStyle};

  &:hover {
    background: linear-gradient(180deg, #fdaf53 0%, #dc4f26 100%);
  }
`

const disabledTextStyle = css`
  color: #e2e2e2;
  text-shadow: -1px -1.5px 0px #3f3f3f;
`

const ButtonTextPrimary = styled.div<{
  size?: string
  disabled?: boolean | undefined
}>`
  font-style: normal;
  pointer-events: none;
  border: 0px;
  font-weight: 400;
  font-size: ${({ size }) => size ?? '22px'};
  text-align: center;
  color: #fff5e1;
  position: absolute;
  text-shadow: -1px -1.5px 0px #208001;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  ${props => props.disabled && disabledTextStyle};
  &:hover {
    text-shadow: -1px -1.5px 0px #892702;
  }
  &.btn-text {
    font-weight: 600;
  }
`

export const ButtonWrapHover = styled(ButtonWrap)`
  background: linear-gradient(180deg, #ffc978 0%, #ff7e3c 45.83%, #c53213 100%);
  &:hover {
    background: linear-gradient(180deg, #ffc978 0%, #ff7e3c 45.83%, #c53213 100%);
    .btn-content {
      background: linear-gradient(180deg, #fdaf53 0%, #dc4f26 100%);
    }
  }
  .btn-text {
    text-shadow: -1px -1.5px 0px #892702;
  }
  ${({ disabled }) =>
    disabled &&
    css`
      background: linear-gradient(180deg, #ffffff 0%, #a0a5a5 39.58%, #696969 100%);
      cursor: auto;
      pointer-events: none;
    `};
`

export const ButtonContentHover = styled(ButtonContent)`
  background: linear-gradient(180deg, #fdaf53 0%, #dc4f26 100%);
  &:focus {
    background: linear-gradient(180deg, #fdaf53 0%, #dc4f26 100%);
  }
  &:hover {
    color: #fff5e1;
    background: linear-gradient(180deg, #fdaf53 0%, #dc4f26 100%);
  }
  &:active {
    color: #fff5e1;
    background: linear-gradient(180deg, #fdaf53 0%, #dc4f26 100%);
  }
  &:disabled {
    background: linear-gradient(180deg, #ffffff 0%, #a0a5a5 39.58%, #696969 100%);
    color: #e2e2e2;
    cursor: auto;
    box-shadow: none;
    outline: none;
  }
`
export const ButtonPrimary = (props: any) => {
  const { children, size, width, height, disabled, borderWidth, borderColor, onClick, style, className } = props

  const playButtonSound = () => {
    onClick()
  }
  return (
    <ButtonWrapPrimary
      className={className}
      style={style}
      width={width}
      height={height}
      disabled={disabled}
      $borderWidth={borderWidth}
      $borderColor={borderColor}
      onClick={playButtonSound}
    >
      <ButtonContentPrimary disabled={disabled} className="btn-content" />
      <ButtonTextPrimary size={size} disabled={disabled} className="btn-text">
        {children}
      </ButtonTextPrimary>
    </ButtonWrapPrimary>
  )
}

export const ButtonHover = (props: any) => {
  const { children, size, height, width, disabled, borderWidth, borderColor, onClick } = props
  const playButtonSound = () => {
    onClick()
  }
  return (
    <ButtonWrapHover
      width={width}
      height={height}
      disabled={disabled}
      $borderWidth={borderWidth}
      $borderColor={borderColor}
      onClick={playButtonSound}
    >
      <ButtonContentHover disabled={disabled} className="btn-content" />
      <ButtonTextPrimary size={size} disabled={disabled} className="btn-text">
        {children}
      </ButtonTextPrimary>
    </ButtonWrapHover>
  )
}
