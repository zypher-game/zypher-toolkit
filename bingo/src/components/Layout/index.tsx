import React, { memo, ReactNode } from 'react'

import { useIsTelegram } from '@/store/telegram/hooks'

import LayoutPage from './LayoutPage'
import LayoutTelegram from './LayoutTelegram'
const Layout = memo((props: { children: ReactNode }) => {
  const is = useIsTelegram()
  if (is) {
    return <LayoutTelegram {...props} />
  }
  return <LayoutPage {...props} />
})
export default Layout
