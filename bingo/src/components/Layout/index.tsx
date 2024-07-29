import './index.styl'

import {
  bingoBetaSupportedChainId,
  bingoV1SupportedChainId,
  Header,
  motion,
  NavKey,
  SideBar,
  sideCollapseState,
  useIsW768,
  useRecoilState,
  useRecoilValue
} from '@ui/src'
import { pathnameState } from '@ui/src'
import { Layout as LayoutAntd } from 'antd'
import classnames from 'classnames'
import { isEqual } from 'lodash'
import React, { memo, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { bingoVersionState, IBingoVersion } from '@/pages/state/state'
import { useAppDispatch } from '@/store/hooks'
import { env } from '@/utils/config'
import copy from '@/utils/copy'
import { setErrorToast, setSuccessToast } from '@/utils/Error/setErrorToast'

import CountUpNumber from '../CountUpNumber/CountUpNumber'

const { Sider, Content } = LayoutAntd

interface IProps {
  children: React.ReactNode
}
const Layout = memo((props: IProps) => {
  const bingoVersion = useRecoilValue(bingoVersionState)
  const location = useLocation()
  const [pathnameArr, setPathname] = useRecoilState<string[]>(pathnameState)
  const [sideCollapse, setSideCollapse] = useRecoilState(sideCollapseState)
  const isW768 = useIsW768()
  const [zIndex, setZIndex] = useState(21)
  const dispatch = useAppDispatch()
  useEffect(() => {
    const arr = location.pathname.split('/')
    setPathname(arr)
  }, [location])
  useEffect(() => {
    if (isW768) {
      if (sideCollapse) {
        setTimeout(() => {
          setZIndex(10)
        }, 600)
      } else {
        setZIndex(21)
      }
    }
  }, [isW768, sideCollapse])
  const supportedChainList = useMemo(() => {
    return bingoVersion === IBingoVersion.beta ? bingoBetaSupportedChainId : bingoV1SupportedChainId
  }, [bingoVersion])
  return (
    <LayoutAntd className={classnames(`lt-layout ${bingoVersion}`, pathnameArr[1] === '' ? 'zBingo' : pathnameArr[1])}>
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
        supportedChainList={supportedChainList}
        Link={Link}
      />
      <Content className="lt-content">
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.98 }}
          transition={{ duration: 0.3 }}
        >
          {/* <div className="lt-main"></div> */}
          {props.children}
        </motion.div>
      </Content>
      {isW768 ? (
        <Sider
          collapsible
          breakpoint="md"
          trigger={null}
          className={`custom-side ${sideCollapse ? 'hidden' : ''}`}
          // className="custom-side"
          style={{ zIndex: zIndex }}
        >
          <SideBar pathname={pathnameArr[1]} className="lt-sidebar" useNavigate={useNavigate} />
        </Sider>
      ) : null}
      {isW768 && !sideCollapse && <div className="lt-sidebar-layer" onClick={() => setSideCollapse(true)} />}
      {/* <div id="snow" /> */}
    </LayoutAntd>
  )
}, isEqual)
export default Layout
