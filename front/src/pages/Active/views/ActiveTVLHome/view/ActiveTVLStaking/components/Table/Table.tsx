import { ChainId, LoadingButton, PixelTableBorder, useIsW768, useRecoilValue } from '@ui/src'
import React, { memo, useCallback } from 'react'

import TokenWithChain from '@/pages/Active/components/Token/TokenWithChain/TokenWithChain'
import { useTable } from '@/pages/Active/hooks/useStakeHandle'
import { useTvlStakingDialogState } from '@/pages/Active/hooks/useTvlStakingDialogState'
import { isTvlDataLoadingState, ITVLStakingData } from '@/pages/Active/state/activeState'

import css from './Table.module.styl'
const Table = memo(({ chainIdLocal }: { chainIdLocal: ChainId }) => {
  const isDataLoading = useRecoilValue(isTvlDataLoadingState)
  const { native, erc20 } = useTable()
  return (
    <>
      <h3 className={css.title}>Native Token Stake</h3>
      <TableWrap list={native} type="native" chainId={chainIdLocal} isDataLoading={isDataLoading} />
      <h3 className={css.title}>Restaking Tokens</h3>
      <TableWrap list={erc20} type="erc20" chainId={chainIdLocal} isDataLoading={isDataLoading} />
    </>
  )
})
const TableWrap = memo(
  ({ list, type, chainId, isDataLoading }: { list: ITVLStakingData[]; type: 'native' | 'erc20'; chainId: ChainId; isDataLoading: boolean }) => {
    const isW768 = useIsW768()
    const setTvlStakingDialog = useTvlStakingDialogState()
    const onClick = useCallback(
      (currency: string) => {
        console.log({ currency })
        setTvlStakingDialog(chainId, true, currency)
      },
      [chainId]
    )
    if (isW768) {
      return (
        <div className={css.mTable}>
          {list.map(v => (
            <RowM key={JSON.stringify(v)} onClick={() => onClick(v.symbol)} v={v} type={type} />
          ))}
        </div>
      )
    }
    return (
      <PixelTableBorder
        classNameHeader="tvlPixelTable_header_table"
        pixel_height={7}
        header_children={
          <Row
            className={css.fl_tab_header}
            isHead={true}
            data={['Token', type === 'native' ? 'Staked' : 'Restaked', 'Ratio', 'GP', 'APR', 'TVL']}
            isDataLoading={isDataLoading}
          />
        }
        body_children={
          <>
            {list.map(v => (
              <Row
                key={JSON.stringify(v)}
                isHead={false}
                onClick={() => onClick(v.symbol)}
                className={css.fl_tab_body}
                isDataLoading={isDataLoading}
                data={[
                  <>
                    <div className={css.fl_tab_body_col1}>
                      <TokenWithChain
                        width={32}
                        token={{
                          address: v.address,
                          symbol: v.symbol,
                          logoPath: v.logoPath,
                          index: v.index
                        }}
                        chainId={v.chainId}
                      />
                      <p>{v.symbol}</p>
                    </div>
                  </>,
                  v.userStakedAmountStr,
                  v.ratio + '%',
                  v.earnGPStr,
                  v.apr + '%',
                  v.totalStakedAmountStr
                ]}
              />
            ))}
          </>
        }
      />
    )
  }
)
const Row = memo(
  ({
    className,
    data,
    onClick,
    isDataLoading,
    isHead
  }: {
    className: string
    data: (string | React.ReactNode)[]
    onClick?: any
    isDataLoading: boolean
    isHead: boolean
  }) => {
    return (
      <div className={`${css.row} ${className}`} onClick={onClick}>
        {data
          .filter(v => v)
          .map((v, index) =>
            typeof v === 'string' ? (
              <div className={css.text} key={JSON.stringify(v)}>
                <p>{v}</p>
                {!isHead && (index === 1 || index === 2 || index === 3 || index === 5) ? <LoadingButton isLoading={isDataLoading} /> : null}
              </div>
            ) : (
              v
            )
          )}
      </div>
    )
  }
)

const RowM = memo(({ v, onClick, type }: { v: ITVLStakingData; onClick?: any; type: 'native' | 'erc20' }) => {
  return (
    <PixelTableBorder
      pixel_height={5}
      onClick={onClick}
      header_children={
        <div className={css.row_m_head}>
          <p>Token</p>
          <div className={css.fl_tab_body_col2}>
            <TokenWithChain
              width={32}
              token={{
                address: v.address,
                symbol: v.symbol,
                logoPath: v.logoPath,
                index: v.index
              }}
              chainId={v.chainId}
            />
            <p>{v.symbol}</p>
          </div>
        </div>
      }
      body_children={
        <div className={css.row_m_body}>
          {[
            [type === 'native' ? 'Staked' : 'Restaked', v.userStakedAmountStr],
            ['Ratio', v.ratio + '%'],
            ['GP', v.earnGPStr],
            ['APR', v.apr + '%'],
            ['TVL', v.totalStakedAmountStr]
          ].map(vv => (
            <div className={css.m_col} key={vv[0]}>
              <p className={css.grey}>{vv[0]}</p>
              <p>{vv[1]} </p>
            </div>
          ))}
        </div>
      }
    />
  )
})

export default Table
