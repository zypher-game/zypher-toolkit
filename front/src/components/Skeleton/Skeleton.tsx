import React from 'react'
import styled, { keyframes } from 'styled-components'

const waves = keyframes`
   from {
        left: -150px;
    }
    to   {
        left: 100%;
    }
`
const Waves = styled.div`
  overflow: hidden;
  transform: translate3d(0, 0, 0);
  background-color: #293457;
  border-radius: 2px;
  &:before {
    content: '';
    position: absolute;
    background-image: linear-gradient(40deg, transparent, rgba(0, 0, 0, 0.1), transparent);
    top: 0;
    left: -150px;
    height: 100%;
    width: 200%;
    animation: ${waves} 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }
`

const Skeleton = ({ className }: any) => {
  return <Waves className={className} />
}
export default Skeleton
