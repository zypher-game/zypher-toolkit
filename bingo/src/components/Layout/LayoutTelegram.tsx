import { pathnameState, useRecoilState } from '@ui/src'
import { Layout as LayoutAntd } from 'antd'
import React, { memo, ReactNode, useEffect } from 'react'

const { Content } = LayoutAntd

const LayoutTelegram = memo(({ children }: { children: ReactNode }) => {
  const [, setPathname] = useRecoilState<string[]>(pathnameState)
  useEffect(() => {
    const arr = location.pathname.split('/')
    setPathname(arr)
  }, [location])
  return (
    <LayoutAntd className="lt-layout bingo beta tg">
      <Content className="lt-content">{children}</Content>
    </LayoutAntd>
  )
})
export default LayoutTelegram
