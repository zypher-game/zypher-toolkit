import { useIsTelegram } from '@ui/src'
import React, { memo } from 'react'

import SideBarPage, { ISide } from './SideBarPage'
import SideBarTelegram from './SideBarTelegram'
const SideBar = memo((props: ISide) => {
  const IS_TELEGRAM = useIsTelegram()
  if (IS_TELEGRAM) {
    return <SideBarTelegram />
  }
  return <SideBarPage {...props} />
})
export default SideBar
