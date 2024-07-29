import { CaretDownOutlined } from '@ant-design/icons'
import {
  bingoV1SupportedChainId,
  ChainId,
  ChainName,
  getShortenAddress,
  IBingoInfo,
  IGameList,
  IGameStatus,
  LngNs,
  PlayerAvatar,
  preStaticUrl,
  supportedChainIds,
  useCustomTranslation,
  useIsW768
} from '@ui/src'
import { Avatar, Divider, List, Select, Space, Spin, Table } from 'antd'
import { ColumnGroupType, ColumnType } from 'antd/lib/table'
import classnames from 'classnames'
import { isEqual } from 'lodash'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'

import { AvatarGroupList } from '@/pages/components/AvatarGroupList/MAvatarGroup'
import NoDataPage from '@/pages/components/NoData'
import RanderNormalText from '@/pages/components/RanderNormalText'
import ViewCardPage from '@/pages/components/viewCard'
import { env } from '@/utils/config'

import css from './GameList.module.stylus'

const MyTable = styled(Table)`
  .ant-table {
    background: transparent;
  }

  .editable-row {
    td {
      border: 0px;
      &:first-child {
        border-radius: 8px 0 0 8px;
      }
      &:last-child {
        border-radius: 0 8px 8px 0;
      }
    }
    &:hover {
      td {
        background: #ffe5bf !important;
      }
    }
  }
`

const BorderSelect = styled.div<{ isMobile: boolean }>`
  padding: 4px;
  border-radius: 26px;
  background: linear-gradient(180deg, #b36801 0.01%, #d28112 47.92%, #eda139 100%);
  position: absolute;
  top: ${({ isMobile }) => (isMobile ? '90px' : '150px')};
  right: ${({ isMobile }) => (isMobile ? '30px' : '70px')};
  z-index: 1;
  display: flex;
  align-items: center;
`
const MySlelect = styled(Select)<{ isMobile: boolean }>`
  border-radius: 21px;
  background: #8e571e;
  color: #fff0cf !important;
  font-size: 16px;
  font-weight: 600;
  box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.25) inset;
  width: ${({ isMobile }) => (isMobile ? '120px' : '160px')};
  height: 36px;
  display: flex !important;
  align-items: center;

  @media (max-width: 768px) {
    font-size: 12px;
    /* width: 98px; */
    height: 28px;
  }
`
const ListRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 9px;
`
const StateButton = styled.div<{ status: boolean }>`
  color: ${({ status }) => (status ? '#60e300' : '#613C17')};
  font-family: Poppins;
  font-size: 12px;
  padding: 2px 8px;
  display: flex;
  align-items: center;
  gap: 6px;
  border-radius: 12px;
  background: ${({ status }) => (status ? 'rgba(96, 227, 0, 0.16)' : '#FFD698')};
`
const Card = styled.div`
  border-radius: 8px;
  background: #ffd6a2;
  font-family: Poppins;
  margin-bottom: 10px;
  font-size: 12px;
  color: #613c17;
  .card-info {
    border-radius: 8px;
    background: #ffe4bb;
  }
  .card-label {
    opacity: 0.4;
    &:last-child {
      text-align: right;
    }
  }
  .card-value {
    font-size: 14px;
  }
`
const MyList = styled(List)`
  margin-top: 45px !important;
  /* max-height: 50vh; */
  height: 400px;
  overflow-y: scroll;
`
const FlexRight = styled.div`
  display: flex;
  width: 100%;
  justify-content: right;
  align-items: center;
`
type IProps = {
  bingoHasError: boolean
  bingoMapList: Map<ChainId, IGameList[]> | undefined
}
const GameList: React.FC<IProps> = memo(({ bingoMapList, bingoHasError }: IProps) => {
  const isMobile = useIsW768()
  const [selectValue, setSelectValue] = useState<ChainId | 'All'>('All')
  const [bingoDataSource, setBingoDataSource] = useState<IGameList[]>()
  const [bingoDataSourceLoading, setBingoDataSourceLoading] = useState(false)
  const options: { value: ChainId | 'All'; label: string }[] = useMemo(() => {
    const list: { value: ChainId | 'All'; label: string }[] = bingoV1SupportedChainId.map(v => ({
      value: v,
      label: ChainName[v]
    }))
    list.unshift({ value: 'All', label: 'All' })
    return list
  }, [])
  const changeHandle = useCallback(e => {
    setSelectValue(e)
  }, [])
  useEffect(() => {
    if (bingoDataSource && bingoDataSource.length) {
      setBingoDataSourceLoading(false)
    } else {
      setBingoDataSourceLoading(true)
    }
  }, [(bingoDataSource ?? []).length])
  const showData = useMemo(() => {
    if (bingoDataSource && bingoDataSource.length && selectValue && selectValue !== 'All') {
      return bingoDataSource.filter(v => v.chainId === selectValue).slice(0, 20)
    }
    return (bingoDataSource ?? []).slice(0, 20)
  }, [(bingoDataSource ?? []).length, selectValue])

  useEffect(() => {
    if (bingoMapList && bingoMapList.size) {
      let list: IGameList[] = []
      Array.from(bingoMapList.entries()).forEach(([, gameListArr]) => {
        list = list.concat(gameListArr)
      })
      const _data = list.sort((a, b) => Number(b.startTimeNumber) - Number(a.startTimeNumber))
      if (!bingoDataSource || !bingoDataSource.length) {
        setBingoDataSource(_data)
      } else {
        const supported = supportedChainIds(env).filter(v => v !== ChainId.Arbitrum && v !== ChainId.MantaPacificMainnet)
        if (bingoMapList.size === supported.length) {
          if (!isEqual(bingoDataSource, _data)) {
            setBingoDataSource(_data)
          }
        }
      }
    }
  }, [bingoMapList?.size])

  const { t } = useCustomTranslation([LngNs.zBingo])
  const columns = useMemo(() => {
    return [
      // {
      //   title: t('Status'),
      //   dataIndex: 'status',
      //   key: 'status',
      //   render: (status: IGameStatus) => <RanderStatus status={status} isMobile={isMobile} />
      // },
      {
        title: t('Start time'),
        dataIndex: 'startTime',
        key: 'startTime',
        render: (_, { startTime, startTimeMobile }: IGameList) => (isMobile ? startTimeMobile : startTime)
      },
      {
        title: t('Winner/Players'),
        dataIndex: 'winnerOrPlayers',
        key: 'winnerOrPlayers',
        width: 200,
        render: (winnerOrPlayers: string, { status, players }: IGameList) => (
          <div style={{ display: 'flex' }}>
            {status === IGameStatus.End && (
              <Space size={10} align="center">
                <div style={{ height: '32px' }}>
                  <PlayerAvatar account={winnerOrPlayers} size={32} showAccount={false} />
                </div>
                {getShortenAddress(winnerOrPlayers)}
              </Space>
            )}
            {(status === IGameStatus.Live || status === IGameStatus.Overtime) && <Space>{winnerOrPlayers}</Space>}
          </div>
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
        render: (bingoInfo: IBingoInfo, { status }: IGameList) => (
          <div>
            {status === IGameStatus.End ? (
              <ViewCardPage bingoInfo={bingoInfo} />
            ) : (
              <div
                style={{
                  fontFamily: 'Poppins',
                  fontWeight: 600,
                  paddingLeft: '15px'
                }}
              >
                {t('None')}
              </div>
            )}
          </div>
        )
      },
      // {
      //   title: t('Pledged'),
      //   dataIndex: 'inputPerPlayer',
      //   key: 'inputPerPlayer',
      //   render: (inputPerPlayer: string) => <RanderNormalText label={inputPerPlayer} showPoint={true} isMobile={isMobile} />
      // },
      // {
      //   title: t('Multiplier'),
      //   dataIndex: 'multiplier',
      //   key: 'multiplier'
      // },
      {
        title: t('Winnings'),
        dataIndex: 'win',
        key: 'win',
        align: 'right',
        render: (win: string) => (
          <FlexRight>
            <RanderNormalText label={win} showPoint={true} isMobile={isMobile} />
          </FlexRight>
        )
      }
    ] as (ColumnGroupType<object> | ColumnType<object>)[]
  }, [isMobile])
  const renderMobileItem = useCallback(
    (item: IGameList) => {
      if (isMobile) {
        return (
          <Card>
            <div className="card-info">
              {/* <ListRow>
                <Space size={0} split={<Divider type="vertical" />}>
                  {item.roomIDStr} | {item.startTime}
                </Space>
                <StateButton status={item.status === IGameStatus.Live}>
                  {item.status}
                  {item.status === IGameStatus.Live && <Drop />}
                </StateButton>
              </ListRow> */}
              <ListRow>
                <div>
                  <div className="card-label">{t('Winnings')}</div>
                  <div className="card-value">
                    <Space>
                      {item.win}
                      <img src={preStaticUrl + `/img/bingo/radish.svg`} width={20} />
                    </Space>
                  </div>
                </div>
                <div>
                  <div className="card-label">Room ID</div>
                  <div className="card-value">{item.roomIDStr}</div>
                </div>
                <div>
                  <div className="card-label">Start time</div>
                  <div className="card-value">{item.startTime}</div>
                </div>
              </ListRow>
            </div>
            <ListRow>
              {item.status === IGameStatus.End && (
                <>
                  <Space size={10} align="center">
                    <div
                      style={{
                        border: '1px solid #613C17',
                        borderRadius: '50%',
                        display: 'flex'
                      }}
                    >
                      <PlayerAvatar account={item.winnerOrPlayers} size={20} showAccount={false} />
                    </div>
                    {getShortenAddress(item.winnerOrPlayers)}
                  </Space>
                  <ViewCardPage bingoInfo={item.bingoInfo} isMobile={true} />
                </>
              )}
              {item.status === IGameStatus.Live && (
                <>
                  <Avatar.Group>
                    {item.players.map(user => (
                      <AvatarGroupList key={user.user} address={user.user} size={20} />
                    ))}
                  </Avatar.Group>
                  <div style={{ opacity: '0.7' }}>{item.winnerOrPlayers}</div>
                </>
              )}
              {item.status === IGameStatus.Overtime && <Space>{t('None')}</Space>}
            </ListRow>
          </Card>
        )
      }
      return null
    },
    [isMobile]
  )
  const NotData = useMemo(() => {
    if (bingoHasError) {
      return (
        <div className={css.error}>
          <p>Error</p>
        </div>
      )
    }
    if (bingoDataSourceLoading) {
      return (
        <div className={classnames('lt-spin', css.loadMore)}>
          <Spin size="large" tip="Loading..." />
        </div>
      )
    }
    return <NoDataPage />
  }, [bingoHasError, bingoDataSourceLoading])
  const renderMobile = useMemo(() => {
    // if (hasError || dataSourceLoading) {
    //   return NotData
    // }
    return (
      <MyList
        itemLayout="horizontal"
        dataSource={showData}
        loading={bingoDataSourceLoading}
        renderItem={item => renderMobileItem(item as IGameList)}
        locale={{ emptyText: NotData }}
      />
    )
  }, [bingoHasError, bingoDataSourceLoading, showData])
  return (
    <>
      <BorderSelect isMobile={isMobile}>
        <MySlelect
          isMobile={isMobile}
          bordered={false}
          dropdownRender={menu => <div className={'selectDropdownBox'}>{menu}</div>}
          defaultValue="All"
          onChange={changeHandle}
          suffixIcon={<CaretDownOutlined style={{ color: '#52B70C' }} />}
          options={options}
        />
      </BorderSelect>
      {isMobile ? (
        renderMobile
      ) : (
        <div className={css.gameList}>
          <MyTable
            className="customTable"
            columns={columns}
            rowClassName="editable-row"
            bordered={false}
            rowKey={'roomIDStr'}
            dataSource={showData}
            scroll={{ y: 400 }}
            pagination={false}
            locale={{ emptyText: NotData }}
          />
        </div>
      )}
    </>
  )
}, isEqual)

export default GameList
