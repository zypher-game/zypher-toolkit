import { pathnameState, useRecoilState } from '@ui/src'
import { Layout as LayoutAntd } from 'antd'
import classnames from 'classnames'
import React, { memo, ReactNode, useEffect } from 'react'

import { IBingoVersion } from '@/pages/state/state'
const { Content } = LayoutAntd

const LayoutTelegram = memo(({ children }: { children: ReactNode }) => {
  const [pathnameArr, setPathname] = useRecoilState<string[]>(pathnameState)
  useEffect(() => {
    const arr = location.pathname.split('/')
    setPathname(arr)
  }, [location])
  return (
    <LayoutAntd className={classnames(`lt-layout ${IBingoVersion.beta}`, pathnameArr[1] === '' ? 'zBingo' : pathnameArr[1])}>
      <Content className="lt-content">{children}</Content>
    </LayoutAntd>
  )
})
export default LayoutTelegram
