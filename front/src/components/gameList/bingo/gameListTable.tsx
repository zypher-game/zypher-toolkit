import { useCustomTranslation } from '@ui/src'
import { useIsW768 } from '@ui/src'
import { LngNs } from '@ui/src'
import { ChainId, IBingoInfo, IGameList, IGameStatus } from '@ui/src'
import { List } from 'antd'
import { ColumnGroupType, ColumnType } from 'antd/lib/table'
import classnames from 'classnames'
import { isEqual } from 'lodash'
import React, { memo, useMemo } from 'react'

import { NotDataWithLoading } from '@/components/NoData'

import PixelGameListTable from '../components/PixelGameListTable'
import css from './gameListTable.module.stylus'
import { MyTable } from './gameListTable.style'
import MobileRow from './tableRow/m/MobileRow'
import RenderBingoCard from './tableRow/pc/RenderBingoCard'
import RenderNormalText from './tableRow/pc/RenderNormalText'
import RenderStatus from './tableRow/pc/RenderStatus'
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
      return dataSource.filter(v => `${v.chainId}` === `${selectValue}`).slice(0, 20)
    }
    return dataSource.slice(0, 20)
  }, [dataSource.length, selectValue])
  const isMobile = useIsW768()
  const columns = useMemo(() => {
    return [
      {
        title: t('Status'),
        dataIndex: 'status',
        key: 'status',
        render: (status: IGameStatus) => <RenderStatus status={status} isMobile={isMobile} />
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
        render: (winnerOrPlayers: string, item: IGameList) => (
          <RenderNormalText label={winnerOrPlayers} showPoint={false} isMobile={isMobile} chainId={item.chainId} />
        )
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
        render: (bingoInfo: IBingoInfo, { status }: IGameList) => <RenderBingoCard status={status} bingoInfo={bingoInfo} isMobile={isMobile} />
      },
      {
        title: t('Pledged per player'),
        dataIndex: 'inputPerPlayer',
        key: 'inputPerPlayer',
        render: (inputPerPlayer: string, item: IGameList) => (
          <RenderNormalText label={inputPerPlayer} showPoint={true} isMobile={isMobile} chainId={item.chainId} />
        )
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
        render: (win: string, item: IGameList) => <RenderNormalText label={win} showPoint={true} isMobile={isMobile} chainId={item.chainId} />
      }
    ] as (ColumnGroupType<object> | ColumnType<object>)[]
  }, [isMobile, t])

  return (
    <IsPixelWidgetTable>
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
          className={classnames(css.table, { noData: showData.length === 0 }, className)}
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
          scroll={{ y: 400, x: 400 }}
        />
      )}
    </IsPixelWidgetTable>
  )
}, isEqual)

export const IsPixelWidgetTable = memo(({ children }: { children: React.ReactNode }) => {
  const isW768 = useIsW768()
  return isW768 ? <div className={css.inner}>{children}</div> : <PixelGameListTable className={css.gameList}>{children}</PixelGameListTable>
})
export default GameListTableWidget
