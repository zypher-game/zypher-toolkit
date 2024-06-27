import React, { memo, useState } from 'react'
import styled from 'styled-components'

import ImageLoader from '@/pages/Active/components/ImageLoader/ImageLoader'
export const getAvatar = (avatar: string, refreshAvatar: string) => {
  if (avatar.indexOf('tvl-avatar.s3') > -1) {
    return avatar + '?' + refreshAvatar
  } else {
    return avatar
  }
}
const AvatarStyled = styled.div<{ width: string; borderRadius?: string }>`
  width: ${({ width }) => width};
  height: ${({ width }) => width};
  min-width: ${({ width }) => width};
  min-height: ${({ width }) => width};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${({ borderRadius }) => borderRadius ?? '50%'};
  overflow: hidden;
  background-color: #c8d4ff;
  position: relative;
  div:nth-child(2) {
    display: none;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`
const AvatarDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    font-size: 28px;
    font-weight: 600;
    text-shadow: -2px -2px #1649ff, -2px 2px 0 #1649ff, 2px 2px 0 #1649ff, 0 2px 0 #1649ff, 2px -2px 0 #1649ff;
    text-transform: uppercase;
  }
`
const Avatar = memo(
  ({
    src,
    nickname,
    width,
    borderRadius,
    children,
    className
  }: {
    src: string
    nickname: string
    width: string
    borderRadius?: string
    children?: React.ReactNode
    className?: string
  }) => {
    const [showError, setShowError] = useState(false)
    return (
      <AvatarStyled className={className} width={width} borderRadius={borderRadius}>
        <ImageLoader
          src={src}
          alt={nickname}
          errCb={() => {
            if (!showError) {
              setShowError(true)
            }
          }}
        />
        {showError ? (
          src.startsWith('data:image/png;base64') ? (
            <img decoding="async" loading="lazy" src={src} alt={nickname} />
          ) : (
            <AvatarDiv>
              <p>{(nickname === '' ? '??' : nickname)[1]}</p>
            </AvatarDiv>
          )
        ) : null}
        {children}
      </AvatarStyled>
    )
  }
)
export default Avatar
