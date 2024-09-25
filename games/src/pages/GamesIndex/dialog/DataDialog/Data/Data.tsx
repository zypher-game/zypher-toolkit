import { ActivePixelCard, PixelBorderCard, useCustomTranslation } from '@ui/src'
import { LngNs } from '@ui/src'
import { ChainId, ChainImage, Currency, preStaticUrl, supportedChainIds } from '@ui/src'
import { Space, Tooltip } from 'antd'
import { isEqual } from 'lodash'
import React, { memo, useMemo } from 'react'
import styled from 'styled-components'

import CountUpNumber from '@/components/CountUpNumber/CountUpNumber'
import Skeleton from '@/components/Skeleton/Skeleton'
import { IData, IDataKey, IDataTotal } from '@/pages/GamesIndex/state/dataState'
import { env } from '@/utils/config'

import css from './Data.module.stylus'

const Divider = styled.div`
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 3px 0;
`
interface IProps {
  data: IData | any
}
const TooltipNode = memo(
  ({
    total,
    className,
    dataKey,
    children,
    showTooltip = true
  }: {
    total: IDataTotal
    className?: string
    dataKey: IDataKey
    children: React.ReactNode
    showTooltip?: boolean
  }) => {
    if (!showTooltip) {
      return <>{children}</>
    }
    try {
      return (
        <Tooltip
          showArrow={false}
          // open={true}
          overlayClassName={'datatooltip'}
          title={
            <ActivePixelCard pixel_height={4} backgroundColor="#404C61">
              <Space className={className} direction="vertical" split={<Divider />}>
                {supportedChainIds(env).map(chainId => {
                  if (total[dataKey][chainId]) {
                    return <TooltipItem key={chainId} chainId={chainId} dataKey={dataKey} total={total} />
                  } else {
                    return null
                  }
                })}
              </Space>
              <ActivePixelCard pixel_height={4} backgroundColor="#404C61" width="16px" height="16px" className="pixel_tooltip_arrow" />
            </ActivePixelCard>
          }
        >
          {children}
        </Tooltip>
      )
    } catch (error) {
      return <>{children}</>
    }
  },
  isEqual
)
const TooltipItem = memo(({ chainId, total, dataKey }: { chainId: ChainId; dataKey: IDataKey; total: IDataTotal }) => {
  const curreny = useMemo((): string => {
    if (dataKey === IDataKey.totalVault) {
      return ' ' + Currency[chainId]
    } else if (dataKey === IDataKey.totalGame) {
    } else if (dataKey === IDataKey.totalPlayers) {
      return ''
    } else if (
      dataKey === IDataKey.totalPlatformRevenue ||
      dataKey === IDataKey.totalPoint ||
      dataKey === IDataKey.totalDebtObligation ||
      dataKey === IDataKey.totalGpBurned
    ) {
      return ' $GP'
    }
    return ''
  }, [])
  return (
    <div className={css.tooltipItem}>
      <img decoding="async" loading="lazy" src={ChainImage[chainId]} alt="" width={20} />
      {total[dataKey][chainId]?.total ?? ''}
      {curreny}
    </div>
  )
}, isEqual)
const Data = memo(({ data }: IProps) => {
  const { t } = useCustomTranslation([LngNs.home])
  const isLoading = useMemo(() => {
    if (data.totalVault || data.totalPoint) {
      return false
    }
    return true
  }, [data.totalVault, data.totalPoint])
  return (
    <div className={css.dataMainWrap}>
      <div className={css.dataMain}>
        {[
          { title: t('Value'), img: 'data_value.svg', value: 'totalVault', dataKey: IDataKey.totalVault },
          { title: t('Gold Points'), img: 'data_points.svg', value: 'totalPoint', dataKey: IDataKey.totalPoint },
          { title: t('Games'), img: 'data_games.svg', value: 'totalGame', dataKey: IDataKey.totalGame },
          { title: t('Players'), img: 'data_players.svg', value: 'totalPlayers', dataKey: IDataKey.totalPlayers },
          { title: t('Platform Revenue'), img: 'data_platformRevenue.svg', value: 'totalPlatformRevenue', dataKey: IDataKey.totalPlatformRevenue },
          { title: t('Debt Obligation'), img: 'data_debt obligation.svg', value: 'totalDebtObligation', dataKey: IDataKey.totalDebtObligation },
          { title: t('$GP Burned'), img: 'data_$gp burned.svg', value: 'totalGpBurned', dataKey: IDataKey.totalGpBurned },
          { title: t('Transaction Vol.'), img: 'data_transaction.svg', value: 'totalTransactionVol', dataKey: IDataKey.totalTransactionVol }
        ].map(v => (
          <PixelBorderCard className={css.item} pixel_height={4} key={v.title} backgroundColor="#343C4F" borderColor="#484F60">
            <TooltipNode
              dataKey={v.dataKey}
              total={data.total}
              className={css.tooltip}
              showTooltip={v.value !== 'totalTransactionVol' && v.value !== 'totalPlayers'}
            >
              <img decoding="async" loading="lazy" src={preStaticUrl + `/img/games/data/${v.img}`} alt={v.title} className={css.dataImg} />
              <div className={css.itemDetail}>
                <div className={css.tit}>{v.title}</div>
                {/* <div className={css.mun}>
                  {v.dataKey === IDataKey.totalVault ? '$' : ''}
                  {data[v.value]}
                  {v.dataKey === IDataKey.totalPlatformRevenue ? ' $GP' : ''}
                </div> */}
                {isLoading ? (
                  <Skeleton className={css.munSke} />
                ) : (
                  <CountUpNumber
                    value={data[v.value]}
                    decimals={data[`${v.value}Decimal`]}
                    prefix={v.dataKey === IDataKey.totalVault ? '$' : ''}
                    unit={v.dataKey === IDataKey.totalPlatformRevenue ? ' $GP' : ''}
                    showDiv={true}
                    className={css.mun}
                    duration={1.5}
                  />
                )}
              </div>
            </TooltipNode>
          </PixelBorderCard>
        ))}
      </div>
    </div>
  )
}, isEqual)

export default Data
