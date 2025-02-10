import { pathnameState, useIsTelegram, useIsW768, useRecoilState } from '@ui/src'
import { Layout as LayoutAntd } from 'antd'
import { isEqual } from 'lodash'
import React, { memo, ReactNode, useEffect, useMemo } from 'react'
import styled from 'styled-components'

import ControllerMenu from '@/pages/GameRoom/components/ControllerMenu'

import Butterfly from '../Butterfly/Butterfly'

const { Content } = LayoutAntd

const ControllerWrapper = styled.div<{ isMobile: boolean; IS_TELEGRAM: boolean }>`
  position: ${({ isMobile }) => (isMobile ? 'absolute' : ' fixed')};
  top: ${({ isMobile, IS_TELEGRAM }) => (IS_TELEGRAM ? '0px' : isMobile ? '51px' : ' 0')};
  left: ${({ isMobile }) => (isMobile ? '0px' : ' 40px')};
  z-index: 99;
  width: ${({ isMobile }) => (isMobile ? '100%' : ' 500px')};
`
const LayoutTelegram = memo(({ children }: { children: ReactNode }) => {
  const [pathnameArr, setPathname] = useRecoilState<string[]>(pathnameState)
  const isW768 = useIsW768()
  const IS_TELEGRAM = useIsTelegram()
  useEffect(() => {
    const arr = location.pathname.split('/')
    setPathname(arr)
  }, [location])
  const isPlay = useMemo(() => {
    return (pathnameArr ?? []).join().includes('gameRoom')
  }, [JSON.stringify(pathnameArr)])
  return (
    <LayoutAntd className="lt-layout bingo beta tg">
      {isPlay ? (
        <ControllerWrapper isMobile={isW768} IS_TELEGRAM={IS_TELEGRAM}>
          <ControllerMenu />
        </ControllerWrapper>
      ) : null}
      <Content className="lt-content">{children}</Content>
      <Butterfly />
    </LayoutAntd>
  )
}, isEqual)
export default LayoutTelegram
