import { ChainId, Currency, PixelTableBorder, useActiveWeb3React, useRecoilValue } from '@ui/src'
import React, { memo, useMemo } from 'react'

import TokenWithChain from '@/pages/Active/components/Token/TokenWithChain/TokenWithChain'
import { TVLChainId } from '@/pages/Active/constants/activeConstants'
import { ITVLStakingData, tvlStakingDataState } from '@/pages/Active/state/activeState'

import css from './Table.module.styl'
const Table = memo(({ chainIdLocal }: { chainIdLocal: ChainId }) => {
  const tvlStakingData = useRecoilValue<Record<TVLChainId | ChainId, Record<string, ITVLStakingData>>>(tvlStakingDataState)
  console.log({ tvlStakingData })
  const { native, erc20 } = useMemo(() => {
    const obj: Record<string, ITVLStakingData[]> = {
      native: [],
      erc20: []
    }
    const o = tvlStakingData[chainIdLocal]
    console.log(111, { o, tvlStakingData, currency: Currency[chainIdLocal] })
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
        console.log({ all })
        all.splice(ETHIndex, 1)
        console.log({ all })
      }
      obj.native = [o[w_native]]
      console.log({ all })
      obj.erc20 = all.map(v => o[v])
    }
    return obj
  }, [chainIdLocal, JSON.stringify(tvlStakingData)])
  console.log({ native, erc20 })
  return (
    <>
      <h3 className={css.title}>Native Token Stake</h3>
      <TableWrap list={native} type="native" />
      <h3 className={css.title}>Restaking Tokens</h3>
      <TableWrap list={erc20} type="erc20" />
    </>
  )
})
const TableWrap = memo(({ list, type }: { list: ITVLStakingData[]; type: 'native' | 'erc20' }) => {
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
const Row = memo(({ className, data }: { className: string; data: (string | React.ReactNode)[] }) => {
  return <div className={`${css.row} ${className}`}>{data.map(v => (typeof v === 'string' ? <p key={v}>{v} </p> : v))}</div>
})
export default Table
