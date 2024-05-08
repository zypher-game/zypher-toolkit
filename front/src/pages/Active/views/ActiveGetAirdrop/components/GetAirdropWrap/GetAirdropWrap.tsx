import { Currency, CurrencyLogo, preStaticUrl, useActiveWeb3React, useRecoilValue } from '@ui/src'
import { ActivePixelCard } from '@ui/src'
import React, { memo } from 'react'

import { activeDataState } from '@/pages/Active/state/activeState'
import classnames from '@/utils/classnames'

import css from './GetAirdropWrap.module.styl'
export const GetAirdropCard = memo(({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <ActivePixelCard className={classnames(css.airdrop, className)} backgroundColor="#1D263B" pixel_height={10}>
      {children}
    </ActivePixelCard>
  )
})
const GetAirdropWrap = memo(({ children }: { children: React.ReactNode }) => {
  const { chainId } = useActiveWeb3React()
  const activeData = useRecoilValue(activeDataState)
  const {
    airdropPoints,
    airdropPointsDetail: { gasStr, balanceStr }
  } = activeData
  return (
    <GetAirdropCard>
      <div className={css.inner}>
        <div className={css.fl}>
          <h3>Your Airdrop Data</h3>
          <ul>
            <li>
              <p>Airdrop Points</p>
              <div className={css.li_fr}>
                <p>{airdropPoints}</p>
              </div>
            </li>
            <li>
              <p>Gas consumption</p>
              <div className={css.li_fr}>
                <p>{gasStr}</p>
                <img src={CurrencyLogo[chainId]} title={Currency[chainId]} />
              </div>
            </li>
            <li>
              <p>Wallet Balance</p>
              <div className={css.li_fr}>
                <p>{balanceStr}</p>
                <img src={preStaticUrl + '/img/icon/pixel_eth.svg'} title="ETH" />
                {/* <img src={CurrencyLogo[chainId]} title={Currency[chainId]} /> */}
              </div>
            </li>
          </ul>
        </div>
        <img src={preStaticUrl + '/img/tvl/airdrop_data.png'} className={css.img} />
      </div>
      {children}
    </GetAirdropCard>
  )
})
export default GetAirdropWrap
