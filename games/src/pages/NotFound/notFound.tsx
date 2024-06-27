import * as React from 'react'
import styled from 'styled-components'
const Div404 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  color: #fff;
  height: 100vh;
`
function NotFound(): JSX.Element {
  return <Div404>404</Div404>
}

export default NotFound
