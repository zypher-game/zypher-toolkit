import { useIsTelegram } from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo, ReactNode } from 'react'

import LayoutPage from './LayoutPage'
import LayoutTelegram from './LayoutTelegram'
const Layout = memo((props: { children: ReactNode }) => {
  const IS_TELEGRAM = useIsTelegram()
  if (IS_TELEGRAM) {
    return <LayoutTelegram {...props} />
  }
  return <LayoutPage {...props} />
}, isEqual)
export default Layout
