import './Tab.styl'

import { useSetRecoilState } from '@UI/src/'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { ActivePixelButton, ActivePixelButtonColor } from '@UI/src/'
import { tvlPath, TVLTabList } from '@/pages/Active/hooks/activeHooks'
import { tvlPathState } from '@/pages/Active/state/activeState'

const Tab = memo(() => {
  const location = useLocation()
  const [pathnameArr, setPathname] = useState<string[]>([])

  useEffect(() => {
    const arr = location.pathname.split('/')
    setPathname(arr)
  }, [location])
  console.log({ pathnameArr })
  return (
    <ul className="active_tvl_tab">
      {TVLTabList.map((v, index) => (
        <LiItem key={v.path} on={(pathnameArr[2] ?? '').toLowerCase() === v.path.toLowerCase()} index={index} label={v.label} />
      ))}
    </ul>
  )
})
const LiItem = memo(({ on, index, label }: { on: boolean; index: number; label: string }) => {
  const setTVLPath = useSetRecoilState(tvlPathState)
  const navigate = useNavigate()
  const toPtah = useCallback(() => {
    setTVLPath(index)
    navigate(tvlPath[index])
  }, [location])
  if (on) {
    return (
      <li>
        <ActivePixelButtonColor height="40px" pixel_height={4} className="active_tvl_tab_on">
          <p>{label}</p>
        </ActivePixelButtonColor>
      </li>
    )
  }
  return (
    <li>
      <ActivePixelButton height="40px" pixel_height={4} backgroundColor="#1D263B" className="active_tvl_tab" onClick={toPtah}>
        <p>{label}</p>
      </ActivePixelButton>
    </li>
  )
})
export default Tab
