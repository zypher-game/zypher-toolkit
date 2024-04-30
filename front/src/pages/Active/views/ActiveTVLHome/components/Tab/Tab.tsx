import './Tab.styl'

import { useSetRecoilState } from '@UI/src/'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import PixelTab from '@/components/PixelTab/PixelTab'
import { tvlPath, TVLTabList } from '@/pages/Active/hooks/activeHooks'
import { tvlPathState } from '@/pages/Active/state/activeState'

const Tab = memo(() => {
  const location = useLocation()
  const [pathnameArr, setPathname] = useState<string[]>([])

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
      tabList={TVLTabList.map((v, index) => ({
        ...v,
        on: (pathnameArr[2] ?? '').toLowerCase() === v.path.toLowerCase(),
        onClick: () => toPath(index)
      }))}
      height="40px"
      pixel_height={4}
    />
    // <ul className="active_tvl_tab">
    //   {TVLTabList.map((v, index) => (
    //     <PixelTabLiItem
    //       height="40px"
    //       pixel_height={4}
    //       key={v.path}
    //       on={(pathnameArr[2] ?? '').toLowerCase() === v.path.toLowerCase()}
    //       index={index}
    //       label={v.label}
    //       onClick={() => toPath(index)}
    //     />
    //   ))}
    // </ul>
  )
})
export default Tab
