import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const Loader = styled.div`
  border-width: 0.5rem;
  border-style: solid;
  border-color: #864802;
  border-top: 0.5rem solid transparent;
  width: 3.625rem;
  height: 3.625rem;
  border-radius: 50%;
  position: relative;
  -webkit-animation: spin 2s infinite;
  animation: spin 2s infinite;

  /* &:before,
  &:after {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: purple;
    position: absolute;
    left: 0.125rem;
  }

  &:before {
    top: 0.063rem;
  }

  &:after {
    bottom: 0.063rem;
  } */

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`
const LoadingSpinner: React.FC = () => {
  return (
    <Container>
      <Loader />
    </Container>
  )
}

export default LoadingSpinner
