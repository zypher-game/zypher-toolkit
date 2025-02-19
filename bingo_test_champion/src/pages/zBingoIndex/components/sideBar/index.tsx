import { IBingoVersion, ILocalPathUrl, localPathUrl, useActiveWeb3React, useIsTelegram, useRecoilValue } from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo } from 'react'

import { bingoVersionState } from '@/pages/state/state'

import SideBarPage, { ISide } from './SideBarPage'
import SideBarPageB3 from './SideBarPageB3'
import SideBarTelegram from './SideBarTelegram'
const SideBar = memo((props: ISide) => {
  const IS_TELEGRAM = useIsTelegram()
  const { chainId } = useActiveWeb3React()
  const localpath = localPathUrl(chainId)
  const bingoVersion = useRecoilValue(bingoVersionState)
  if (bingoVersion === IBingoVersion.champion) {
    return null
  }
  if (IS_TELEGRAM) {
    return <SideBarTelegram />
  }
  if (localpath === ILocalPathUrl.B3) {
    return <SideBarPageB3 {...props} />
  }
  return <SideBarPage {...props} />
}, isEqual)
export default SideBar
