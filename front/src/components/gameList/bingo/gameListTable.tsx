import { useCustomTranslation } from '@UI/src/'
import { useIsMobile } from '@UI/src/'
import { LngNs } from '@UI/src/'
import { IBingoInfo, ChainId, IGameList, IGameStatus } from '@UI/src/'
import { List } from 'antd'
import { ColumnGroupType, ColumnType } from 'antd/lib/table'
import classnames from 'classnames'
import { isEqual } from 'lodash'
import React, { memo, useMemo } from 'react'

import { NotDataWithLoading } from '@/components/NoData'

import css from './gameListTable.module.stylus'
import { MyTable } from './gameListTable.style'
import MobileRow from './tableRow/m/MobileRow'
import RanderBingoCard from './tableRow/pc/RanderBingoCard'
import RanderNormalText from './tableRow/pc/RanderNormalText'
import RanderStatus from './tableRow/pc/RanderStatus'
type IProps = {
  dataSource: IGameList[]
  loading?: boolean
  hasError?: boolean
  className?: string
  loadMorecss?: boolean
  selectValue?: ChainId | 'All'
}
const GameListTableWidget: React.FC<IProps> = memo(({ loading, className, dataSource, selectValue, hasError, loadMorecss }: IProps) => {
  const { t } = useCustomTranslation([LngNs.home])
  const showData = useMemo(() => {
    if (dataSource.length && selectValue && selectValue !== 'All') {
      return dataSource.filter(v => v.chainId === selectValue).slice(0, 20)
    }
    return dataSource.slice(0, 20)
  }, [dataSource.length, selectValue])
  const isMobile = useIsMobile()
  const columns = useMemo(() => {
    return [
      {
        title: t('Status'),
        dataIndex: 'status',
        key: 'status',
        render: (status: IGameStatus) => <RanderStatus status={status} isMobile={isMobile} />
      },
      {
        title: t('Start time'),
        dataIndex: 'startTime',
        key: 'startTime'
      },
      {
        title: t('Winner/Players'),
        dataIndex: 'winnerOrPlayers',
        key: 'winnerOrPlayers',
        render: (winnerOrPlayers: string) => <RanderNormalText label={winnerOrPlayers} showPoint={false} isMobile={isMobile} />
      },
      {
        title: t('Room ID'),
        dataIndex: 'roomIDStr',
        key: 'roomIDStr'
      },
      {
        title: t('Bingo Card'),
        dataIndex: 'bingoInfo',
        key: 'bingoInfo',
        render: (bingoInfo: IBingoInfo, { status }: IGameList) => <RanderBingoCard status={status} bingoInfo={bingoInfo} isMobile={isMobile} />
      },
      {
        title: t('Pledged per player'),
        dataIndex: 'inputPerPlayer',
        key: 'inputPerPlayer',
        render: (inputPerPlayer: string) => <RanderNormalText label={inputPerPlayer} showPoint={true} isMobile={isMobile} />
      },
      {
        title: t('Multiplier'),
        dataIndex: 'multiplier',
        key: 'multiplier'
      },
      {
        title: t('Winnings'),
        dataIndex: 'win',
        key: 'win',
        render: (win: string) => <RanderNormalText label={win} showPoint={true} isMobile={isMobile} />
      }
    ] as (ColumnGroupType<object> | ColumnType<object>)[]
  }, [isMobile, t])

  return (
    <div className={css.gameList}>
      {isMobile ? (
        showData.length === 0 ? (
          <List
            locale={{
              emptyText: (
                <NotDataWithLoading loading={loading} hasError={hasError} errorCss={css.error} loadMoreCss={loadMorecss ? css.loadMore : undefined} />
              )
            }}
          />
        ) : (
          showData.slice(0, 5).map((v: IGameList) => <MobileRow key={v.roomID} item={v} />)
        )
      ) : (
        <MyTable
          className={classnames(css.table, className)}
          dataSource={showData}
          rowClassName={(record, index) => (index % 2 === 0 ? 'editable-row even-row' : 'editable-row odd-row')}
          pagination={false}
          columns={columns}
          isMobile={isMobile ?? false}
          rowKey={'roomIDStr'}
          locale={{
            emptyText: (
              <NotDataWithLoading
                showNoDataListLoading={true}
                loading={loading}
                hasError={hasError}
                errorCss={css.error}
                loadMoreCss={loadMorecss ? css.loadMore : undefined}
              />
            )
          }}
          scroll={{ y: 700, x: 700 }}
        />
      )}
    </div>
  )
}, isEqual)

export default GameListTableWidget
