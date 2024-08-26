import { useIsTelegram } from '@ui/src'
import React, { memo, ReactNode } from 'react'

import LayoutPage from './LayoutPage'
import LayoutTelegram from './LayoutTelegram'
const Layout = memo((props: { children: ReactNode }) => {
  const IS_TELEGRAM = useIsTelegram()
  if (IS_TELEGRAM) {
    return <LayoutTelegram {...props} />
  }
  return <LayoutPage {...props} />
})
export default Layout
