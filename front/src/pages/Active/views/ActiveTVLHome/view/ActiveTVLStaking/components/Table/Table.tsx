import { ChainId, Currency, PixelTableBorder, TVLChainId, useIsW768, useRecoilValue, useSetRecoilState } from '@ui/src'
import React, { memo, useCallback, useMemo } from 'react'

import TokenWithChain from '@/pages/Active/components/Token/TokenWithChain/TokenWithChain'
import { useTvlStakingDialogState } from '@/pages/Active/hooks/useTvlStakingDialogState'
import { ITVLStakingData, tvlStakingDataState, tvlStakingDialogState } from '@/pages/Active/state/activeState'

import css from './Table.module.styl'
const Table = memo(({ chainIdLocal }: { chainIdLocal: ChainId }) => {
  const tvlStakingData = useRecoilValue<Record<TVLChainId | ChainId, Record<string, ITVLStakingData>>>(tvlStakingDataState)
  const { native, erc20 } = useMemo(() => {
    const obj: Record<string, ITVLStakingData[]> = {
      native: [],
      erc20: []
    }
    const o = tvlStakingData[chainIdLocal]
    if (o) {
      const all = Object.keys(o)
      const w_native = 'W' + Currency[chainIdLocal]
      const WETHIndex = all.indexOf(w_native)
      let ETHIndex = all.indexOf(Currency[chainIdLocal])
      if (WETHIndex !== -1 && ETHIndex !== -1) {
        all.splice(WETHIndex, 1)
        if (ETHIndex > WETHIndex) {
          ETHIndex--
        }
        all.splice(ETHIndex, 1)
      }
      obj.native = [o[w_native]]
      obj.erc20 = all.map(v => o[v])
    }
    return obj
  }, [chainIdLocal, JSON.stringify(tvlStakingData)])
  return (
    <>
      <h3 className={css.title}>Native Token Stake</h3>
      <TableWrap list={native} type="native" chainId={chainIdLocal} />
      <h3 className={css.title}>Restaking Tokens</h3>
      <TableWrap list={erc20} type="erc20" chainId={chainIdLocal} />
    </>
  )
})
const TableWrap = memo(({ list, type, chainId }: { list: ITVLStakingData[]; type: 'native' | 'erc20'; chainId: ChainId }) => {
  const isW768 = useIsW768()
  const setTvlStakingDialog = useTvlStakingDialogState()
  const onClick = useCallback(() => {
    setTvlStakingDialog(chainId, true)
  }, [chainId])
  if (isW768) {
    return (
      <div className={css.mTable}>
        {list.map(v => (
          <RowM key={v.address} onClick={onClick} v={v} type={type} />
        ))}
      </div>
    )
  }
  return (
    <PixelTableBorder
      classNameHeader="tvlPixelTable_header_table"
      pixel_height={7}
      header_children={<Row className={css.fl_tab_header} data={['Token', type === 'native' ? 'Staked' : 'Restaked', 'Ratio', 'GP', 'APR', 'TVL']} />}
      body_children={
        <>
          {list.map(v => (
            <Row
              key={v.address}
              onClick={onClick}
              className={css.fl_tab_body}
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
})
const Row = memo(({ className, data, onClick }: { className: string; data: (string | React.ReactNode)[]; onClick?: any }) => {
  return (
    <div className={`${css.row} ${className}`} onClick={onClick}>
      {data.filter(v => v).map(v => (typeof v === 'string' ? <p key={v}>{v} </p> : v))}
    </div>
  )
})

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
