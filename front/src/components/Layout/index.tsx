import './index.styl'

import { Header, sideCollapseState, useIsW1100, useRecoilValue } from '@ui/src'
import { Layout as LayoutAntd } from 'antd'
import classnames from 'classnames'
import { isEqual } from 'lodash'
import React, { memo, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useAppDispatch } from '@/store/hooks'
import { env } from '@/utils/config'
import copy from '@/utils/copy'
import { setErrorToast, setSuccessToast } from '@/utils/Error/setErrorToast'

import CountUpNumber from '../CountUpNumber/CountUpNumber'
import Navigation, { NavKey } from './Navigation'

const { Content } = LayoutAntd

interface IProps {
  children: React.ReactNode
}
const Layout: React.FC<IProps> = memo((props: IProps) => {
  const location = useLocation()
  const [pathnameArr, setPathname] = useState<string[]>([])
  const collapsed = useRecoilValue(sideCollapseState)
  const isMobile = useIsW1100()
  const [zIndex, setZIndex] = useState(21)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const arr = location.pathname.split('/')
    setPathname(arr)
  }, [location])
  useEffect(() => {
    if (isMobile) {
      if (collapsed) {
        setTimeout(() => {
          setZIndex(10)
        }, 600)
      } else {
        setZIndex(21)
      }
    }
  }, [isMobile, collapsed])
  return (
    <LayoutAntd className={classnames('lt-layout', pathnameArr[1] === '' ? NavKey[0][1] : pathnameArr[1])}>
      <Header
        className="lt-header"
        env={env}
        dispatch={dispatch}
        setSuccessToast={setSuccessToast}
        setErrorToast={setErrorToast}
        copy={copy}
        useNavigate={useNavigate}
        useLocation={useLocation}
        CountUpNumber={CountUpNumber}
        pathname={pathnameArr[1]}
        Middle={Navigation}
      />
      <LayoutAntd className="lt-layout-content">
        {/* {NavKey[1].includes(pathnameArr[1]) || (isMobile && !collapsed) ? (
          <Side
            collapsible
            breakpoint="md"
            trigger={null}
            className={`custom-side ${collapsed && isMobile ? 'hidden' : ''}`}
            style={{ zIndex: zIndex }}
          >
            <SideBar className="lt-sidebar" isMobile={isMobile} useNavigate={useNavigate} />
          </Side>
        ) : null} */}
        <Content className="lt-content">
          <div className="lt-main">{props.children}</div>
        </Content>
      </LayoutAntd>
      {/* {isMobile && !collapsed && <div className="lt-sidebar-layer" onClick={() => setSideCollapse(true)} />} */}
      {/* <div id="snow" /> */}
    </LayoutAntd>
  )
}, isEqual)
export default Layout
