import './Tab.styl'

import { PixelTab, useIsW768, useSetRecoilState } from '@ui/src'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { tvlPath, TVLTabList } from '@/pages/Active/hooks/activeHooks'
import { tvlPathState } from '@/pages/Active/state/activeState'

const Tab = memo(() => {
  const location = useLocation()
  const [pathnameArr, setPathname] = useState<string[]>([])
  const isW768 = useIsW768()
  useEffect(() => {
    const arr = location.pathname.split('/')
    setPathname(arr)
  }, [location])
  const setTVLPath = useSetRecoilState(tvlPathState)
  const navigate = useNavigate()
  const toPath = useCallback(
    (index: number) => {
      setTVLPath(index)
      navigate(tvlPath[index])
    },
    [location]
  )
  return (
    <PixelTab
      hidePixel={isW768 ? true : false}
      tabList={TVLTabList.map((v, index) => ({
        ...v,
        logo: isW768 ? v.logo : undefined,
        on: (pathnameArr[2] ?? '').toLowerCase() === v.path.toLowerCase(),
        onClick: () => toPath(index)
      }))}
      height="40px"
      pixel_height={4}
      classNames={isW768 ? 'active_tab_m' : 'pixel_active_tab'}
    />
  )
})
export default Tab
