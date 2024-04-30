import { useCustomTranslation } from '@UI/src/'
import { useIsMobile } from '@UI/src/'
import { LngNs } from '@UI/src/'
import { ChainId } from '@UI/src/'
import { List } from 'antd'
import { ColumnGroupType, ColumnType } from 'antd/lib/table'
import classnames from 'classnames'
import { isEqual } from 'lodash'
import React, { memo, useMemo } from 'react'

import { NotDataWithLoading } from '@/components/NoData'
import { I2048GameList } from '@/pages/GamesIndex/hook/useRecentZ2048FromContract'

import css from '../bingo/gameListTable.module.stylus'
import { MyTable } from '../bingo/gameListTable.style'
import RenderNormalText from '../bingo/tableRow/pc/RenderNormalText'
import PixelGameListTable from '../components/PixelGameListTable'
import Z2048MobileRow from './tableRow/m/Z2048MobileRow'
import NftTokenIdCol from './tableRow/nftTokenIdCol'
type IProps = {
  dataSource: I2048GameList[]
  loading?: boolean
  hasError?: boolean
  className?: string
  loadMorecss?: boolean
  selectValue?: ChainId | 'All'
  showFilter: boolean
}
const Z2048ListTableWidget: React.FC<IProps> = memo(({ showFilter, loading, className, dataSource, selectValue, hasError, loadMorecss }: IProps) => {
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
        title: t('Start time'),
        dataIndex: 'beginTimeStr',
        key: 'beginTimeStr'
      },
      {
        title: t('Players'),
        dataIndex: 'player',
        key: 'player',
        render: (player: string) => <RenderNormalText label={player} showPoint={false} isMobile={isMobile} />
      },
      {
        title: t('Tiles'),
        dataIndex: 'maxTile',
        key: 'maxTile'
      },
      {
        title: t('2048 NFT'),
        dataIndex: 'tokenIdStr',
        key: 'tokenIdStr',
        render: (tokenIdStr: string, { tokenIdLink, chainId, tokenId }: I2048GameList) => (
          <NftTokenIdCol tokenIdLink={tokenIdLink} chainId={chainId} tokenId={tokenId} showFilter={showFilter} />
        )
      },
      {
        title: t('Winnings'),
        dataIndex: 'reward',
        key: 'reward',
        render: (win: string) => <RenderNormalText label={win} showPoint={true} isMobile={isMobile} />
      }
    ] as (ColumnGroupType<object> | ColumnType<object>)[]
  }, [isMobile, t])

  return (
    <PixelGameListTable className={css.gameList}>
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
          showData.slice(0, 5).map((v: I2048GameList) => <Z2048MobileRow key={v.beginTime} item={v} showFilter={showFilter} />)
        )
      ) : (
        <MyTable
          className={classnames(css.table, className)}
          dataSource={showData}
          rowClassName={(record, index) => (index % 2 === 0 ? 'editable-row even-row' : 'editable-row odd-row')}
          pagination={false}
          columns={columns}
          isMobile={isMobile ?? false}
          rowKey={'tokenIdStr'}
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
    </PixelGameListTable>
  )
}, isEqual)

export default Z2048ListTableWidget
