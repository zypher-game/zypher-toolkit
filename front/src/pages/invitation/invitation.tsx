import useWindowSize from '@UI/src/'
import { Spin } from 'antd'
import React, { useMemo } from 'react'

import NoDataPage from '@/components/NoData'

import InvitationHeader from './components/invitationHeader'
import InvitationTable from './components/invitationTable'
import { CurrentPage } from './config/config'
import { useGetAccountInfo, useGetAccountListInfo } from './hooks/invitationHooks'
import css from './invitation.module.stylus'

export default (): React.ReactElement | null => {
  const { width } = useWindowSize()
  const isMobile = useMemo(() => {
    return width < 768
  }, [width])

  useGetAccountInfo()
  const { sentryRef, rootRef, loading, currentPage, hasMore } = useGetAccountListInfo()

  return (
    <>
      <div className={css.invitation} ref={rootRef}>
        <div className={css.content}>
          <div className={css.main}>
            {/* <Twit ter data=":sadasdfsadf" /> */}
            <InvitationHeader isMobile={isMobile} />
            <div className={css.container}>
              <InvitationTable isMobile={isMobile} hasMore={hasMore} currentPage={currentPage} sentryRef={sentryRef} loading={loading} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
