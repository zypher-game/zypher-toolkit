import { useActiveWeb3React, useIsTelegram } from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo } from 'react'

import { ILocalPathUrl, localPathUrl } from '@/utils/localPathUrl'

import SideBarPage, { ISide } from './SideBarPage'
import SideBarPageB3 from './SideBarPageB3'
import SideBarTelegram from './SideBarTelegram'
const SideBar = memo((props: ISide) => {
  const IS_TELEGRAM = useIsTelegram()
  const { chainId } = useActiveWeb3React()
  const localpath = localPathUrl(chainId)

  if (IS_TELEGRAM) {
    return <SideBarTelegram />
  }
  if (localpath === ILocalPathUrl.B3) {
    return <SideBarPageB3 {...props} />
  }
  return <SideBarPage {...props} />
}, isEqual)
export default SideBar
