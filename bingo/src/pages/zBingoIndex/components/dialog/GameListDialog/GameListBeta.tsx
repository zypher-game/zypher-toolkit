import { CaretDownOutlined } from '@ant-design/icons'
import { bingoBetaSupportedChainId, ChainId, ChainName, supportedChainIds, useActiveWeb3React } from '@ui/src'
import { useCustomTranslation } from '@ui/src'
import { useIsW768 } from '@ui/src'
import { getShortenAddress, LngNs } from '@ui/src'
import { PlayerAvatar } from '@ui/src'
import { IBingoInfo, IGameStatus } from '@ui/src'
import { Avatar, List, Select, Space, Spin, Table } from 'antd'
import { ColumnGroupType, ColumnType } from 'antd/lib/table'
import classnames from 'classnames'
import { isEqual } from 'lodash'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'

import { useActiveWeb3ReactForBingo } from '@/hooks/useActiveWeb3ReactForBingo'
import { GetGameListBoxImg } from '@/hooks/useMText'
import { IGameListBeta } from '@/hooks/useRecentGames'
import { AvatarGroupList } from '@/pages/components/AvatarGroupList/MAvatarGroup'
import NoDataPage from '@/pages/components/NoData'
import RanderStatus from '@/pages/components/RanderStatus'
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
const Drop = styled.div`
  border: 3px solid rgba(101, 237, 188, 0.19);
  background: #60e300;
  width: 6px;
  height: 6px;
  border-radius: 50%;
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

type IProps = {
  bingoHasError: boolean
  listBetaMapList: Map<ChainId, IGameListBeta[]> | undefined
}
const GameListBeta: React.FC<IProps> = memo(({ listBetaMapList, bingoHasError }: IProps) => {
  const isMobile = useIsW768()
  const { chainId } = useActiveWeb3ReactForBingo()
  const [selectValue, setSelectValue] = useState<ChainId | 'All'>('All')
  const [bingoDataSource, setBingoDataSource] = useState<IGameListBeta[]>()
  const [bingoDataSourceLoading, setBingoDataSourceLoading] = useState(false)
  useEffect(() => {
    if (chainId) {
      setSelectValue(chainId)
    }
  }, [chainId])
  const options: { value: ChainId | 'All'; label: string }[] = useMemo(() => {
    const list: { value: ChainId | 'All'; label: string }[] = bingoBetaSupportedChainId.map(v => ({
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
    if (listBetaMapList && listBetaMapList.size) {
      let list: IGameListBeta[] = []
      Array.from(listBetaMapList.entries()).forEach(([, gameListArr]) => {
        list = list.concat(gameListArr)
      })
      const _data = list
      if (!bingoDataSource || !bingoDataSource.length) {
        setBingoDataSource(_data)
      } else {
        const supported = supportedChainIds(env).filter(v => v !== ChainId.Arbitrum && v !== ChainId.MantaPacificMainnet)
        if (listBetaMapList.size === supported.length) {
          if (!isEqual(bingoDataSource, _data)) {
            setBingoDataSource(_data)
          }
        }
      }
    }
  }, [listBetaMapList?.size])

  const { t } = useCustomTranslation([LngNs.zBingo])
  const columns = useMemo(() => {
    return [
      {
        title: t('Status'),
        dataIndex: 'status',
        key: 'status',
        render: (status: IGameStatus) => <RanderStatus status={status} isMobile={isMobile} />
      },

      {
        title: t('Winner/Players'),
        dataIndex: 'winnerOrPlayers',
        key: 'winnerOrPlayers',
        width: 200,
        render: (winnerOrPlayers: string, { status, players }: IGameListBeta) => (
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
        render: (bingoInfo: IBingoInfo, { status }: IGameListBeta) => (
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
      {
        title: 'Rewards',
        dataIndex: 'rewards',
        key: 'rewards',
        render: (_, { status }: IGameListBeta) => (
          <div>
            {status === IGameStatus.End ? (
              <Space size={10}>
                <div style={{ width: '32px' }}>
                  <GetGameListBoxImg />
                </div>
                <span style={{ fontSize: '16px' }}>{`x1`}</span>
              </Space>
            ) : (
              '--'
            )}
          </div>
        )
      }
    ] as (ColumnGroupType<object> | ColumnType<object>)[]
  }, [isMobile])
  const renderMobileItem = useCallback(
    (item: IGameListBeta) => {
      if (isMobile) {
        return (
          <Card>
            <div className="card-info">
              <ListRow>
                <div>
                  <div className="card-label">Room ID</div>
                  <div className="card-value">{item.roomIDStr}</div>
                </div>
                <div>
                  <div className="card-label">Status</div>
                  <StateButton status={item.status === IGameStatus.Live}>
                    {item.status}
                    {item.status === IGameStatus.Live && <Drop />}
                  </StateButton>
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
    return (
      <MyList
        itemLayout="horizontal"
        dataSource={showData}
        loading={bingoDataSourceLoading}
        renderItem={item => renderMobileItem(item as IGameListBeta)}
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
          defaultValue={selectValue}
          value={selectValue}
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

export default GameListBeta
