import React, { memo, ReactNode } from 'react'

import LayoutPage from './LayoutPage'
import LayoutTelegram from './LayoutTelegram'
const Layout = memo((props: { children: ReactNode }) => {
  if (window.IS_TELEGRAM) {
    return <LayoutTelegram {...props} />
  }
  return <LayoutPage {...props} />
})
export default Layout
