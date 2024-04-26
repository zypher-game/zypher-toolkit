import './index.styl'

import { Header, SideBar, siderCollapseState, useIsMd1100, useIsMobile, useRecoilValue } from '@UI/src/'
import { Layout as LayoutAntd } from 'antd'
import classnames from 'classnames'
import { isEqual } from 'lodash'
import React, { memo, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useAppDispatch } from '@/store/hooks'
import { env } from '@/utils/config'
import copy from '@/utils/copy'
import { setErrorToast, setSuccessToast } from '@/utils/Error/setErrorToast'

import CountupNumber from '../CountupNumber/CountupNumber'
import Navigation, { NavKey } from './Navigation'

const { Sider, Content } = LayoutAntd

interface IProps {
  children: React.ReactNode
}
const Layout: React.FC<IProps> = memo((props: IProps) => {
  const location = useLocation()
  const [pathnameArr, setPathname] = useState<string[]>([])
  const collapsed = useRecoilValue(siderCollapseState)
  const isMobile = useIsMd1100()
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
    <LayoutAntd className={classnames('lt-layout', pathnameArr[1] === '' ? NavKey[0][1] : !collapsed ? '' : pathnameArr[1])}>
      <Header
        className="lt-header"
        env={env}
        dispatch={dispatch}
        setSuccessToast={setSuccessToast}
        setErrorToast={setErrorToast}
        copy={copy}
        useNavigate={useNavigate}
        useLocation={useLocation}
        showLang={false}
        CountupNumber={CountupNumber}
        type="pixel"
        pathname={pathnameArr[1]}
        Middle={Navigation}
      />
      <LayoutAntd className="lt-layout-content">
        {NavKey[1].includes(pathnameArr[1]) || (isMobile && !collapsed) ? (
          <Sider
            collapsible
            breakpoint="md"
            trigger={null}
            className={`custom-sider ${collapsed && isMobile ? 'hidden' : ''}`}
            style={{ zIndex: zIndex }}
          >
            <SideBar className="lt-sidebar" isMobile={isMobile} useNavigate={useNavigate} />
          </Sider>
        ) : null}
        <Content className="lt-content">
          <div className="lt-main">{props.children}</div>
        </Content>
      </LayoutAntd>
      {/* {isMobile && !collapsed && <div className="lt-sidebar-layer" onClick={() => setSiderCollapse(true)} />} */}
      {/* <div id="snow" /> */}
    </LayoutAntd>
  )
}, isEqual)
export default Layout
