import { useRecoilValue } from '@ui/src'
import { ColumnGroupType, ColumnType } from 'antd/lib/table'
import { isEqual } from 'lodash'
import React, { LegacyRef, memo, useMemo } from 'react'

import { NotDataWithLoading } from '@/components/NoData'

import css from '../invitation.module.stylus'
import { MyTable } from '../invitation.style'
import { AccountInfo, accountListInfoState } from '../state/invitationState'
import RankCol from './RankCol'
type IProps = {
  isMobile: boolean
  hasMore: boolean
  currentPage: number
  sentryRef: LegacyRef<HTMLDivElement> | undefined
  loading: boolean
}
const InvitationTable: React.FC<IProps> = memo(({ isMobile, loading, hasMore, currentPage, sentryRef }: IProps) => {
  const data = useRecoilValue<AccountInfo[]>(accountListInfoState)
  const columns = useMemo(() => {
    return [
      {
        title: 'Rank',
        dataIndex: 'rank',
        key: 'rank',
        render: (rank: string, { user_addr }: AccountInfo) => <RankCol rank={rank} account={user_addr} isMobile={isMobile} />
      },
      {
        title: isMobile ? 'Operation' : 'Operation Points',
        dataIndex: 'user_cnt_points',
        key: 'user_cnt_points',
        render: (user_cnt_points: string) => <p>{user_cnt_points}</p>
      },
      {
        title: isMobile ? 'Invitation' : 'Invitation Points',
        dataIndex: 'share_cnt_points',
        key: 'share_cnt_points',
        render: (share_cnt_points: string) => <p>{share_cnt_points}</p>
      },
      {
        title: isMobile ? 'Total' : 'Total Points',
        dataIndex: 'total',
        key: 'total',
        render: (total: string) => <p>{total}</p>
      }
    ] as (ColumnGroupType<object> | ColumnType<object>)[]
  }, [isMobile])
  return (
    <>
      <div className={css.tableContainer} style={{ position: 'relative' }}>
        <MyTable
          className={css.table}
          dataSource={data}
          rowClassName={(record, index) => (index % 2 === 0 ? 'editable-row even-row' : 'editable-row odd-row')}
          pagination={false}
          columns={columns}
          isMobile={isMobile}
          rowKey={'rank'}
          locale={{
            emptyText: <NotDataWithLoading loading={loading} loadMoreCss={css.loadMore} />
          }}
          // style={{ position: 'sticky', top: 0 }}
          // scroll={{ y: 500, x: true }}
        />
      </div>
      {/* {hasMore && currentPage !== CurrentPage && (
          //  ref={sentryRef}
          <div className={classnames('lt-spin', css.loadMore)}>
            <Spin size="large" tip="Loading..." />
          </div>
        )} */}
    </>
  )
}, isEqual)

export default InvitationTable
