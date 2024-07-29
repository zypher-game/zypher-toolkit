import './index.styl'

import {
  bingoBetaSupportedChainId,
  bingoV1SupportedChainId,
  Header,
  SideBar,
  siderCollapseState,
  useIsMobile,
  useRecoilValue
} from '@zypher-game/toolkit/ui'
import { Layout as LayoutAntd } from 'antd'
import classnames from 'classnames'
import { isEqual } from 'lodash'
import React, { memo, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { bingoVersionState, IBingoVersion } from '@/pages/state/state'
import { useAppDispatch } from '@/store/hooks'
import { env } from '@/utils/config'
import copy from '@/utils/copy'
import { setErrorToast, setSuccessToast } from '@/utils/Error/setErrorToast'

const { Sider, Content } = LayoutAntd

interface IProps {
  children: React.ReactNode
}
const Layout: React.FC<IProps> = memo((props: IProps) => {
  const bingoVersion = useRecoilValue(bingoVersionState)
  const location = useLocation()
  const [pathnameArr, setPathname] = useState<string[]>([])
  const collapsed = useRecoilValue(siderCollapseState)
  const isMobile = useIsMobile()
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
  const supportedChainList = useMemo(() => {
    return bingoVersion === IBingoVersion.beta ? bingoBetaSupportedChainId : bingoV1SupportedChainId
  }, [bingoVersion])
  return (
    <LayoutAntd className={classnames(`lt-layout ${bingoVersion}`, pathnameArr[1] === '' ? 'zBingo' : pathnameArr[1])}>
      {!isMobile ? (
        <div className="lt-content">
          <div className="lt-main">
            <Header
              className="lt-header"
              hideMenu={true}
              env={env}
              dispatch={dispatch}
              setSuccessToast={setSuccessToast}
              setErrorToast={setErrorToast}
              copy={copy}
              useNavigate={useNavigate}
              useLocation={useLocation}
              showLang={true}
              supportedChainList={supportedChainList}
            />
            {props.children}
          </div>
        </div>
      ) : (
        <>
          <Sider
            collapsible
            breakpoint="md"
            trigger={null}
            className={`custom-sider ${collapsed && isMobile ? 'hidden' : ''}`}
            style={{ zIndex: zIndex }}
          >
            <SideBar className="lt-sidebar" isMobile={isMobile} useNavigate={useNavigate} />
          </Sider>

          <LayoutAntd className="lt-layout-right">
            <Header
              className="lt-header"
              env={env}
              dispatch={dispatch}
              setSuccessToast={setSuccessToast}
              setErrorToast={setErrorToast}
              copy={copy}
              useNavigate={useNavigate}
              useLocation={useLocation}
              showLang={true}
              supportedChainList={supportedChainList}
            />
            <Content className="lt-content">
              {/* <h1
                style={{ color: '#fff' }}
                onClick={() => {
                  try {
                    disconnect()
                    window.location.reload()
                  } catch (e) {}
                }}
              >
                ddddd
              </h1> */}
              <div className="lt-main">{props.children}</div>
            </Content>
          </LayoutAntd>
          {/* {isMobile && !collapsed && <div className="lt-sidebar-layer" onClick={() => setSiderCollapse(true)} />} */}
        </>
      )}
    </LayoutAntd>
  )
}, isEqual)
export default Layout
