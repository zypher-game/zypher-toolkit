import { ChainImage, Currency, CurrencyLogo, preStaticUrl, SvgComponent, useActiveWeb3React, useIsW768 } from '@ui/src'
import { ActivePixelCard } from '@ui/src'
import React, { memo } from 'react'

import { useActiveData } from '@/pages/Active/hooks/useActiveData'
import classnames from '@/utils/classnames'

import css from './GetAirdropWrap.module.styl'
export const GetAirdropCard = memo(({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={css.airdropWrap}>
      <ActivePixelCard className={classnames(css.airdrop, className)} backgroundColor="#1D263B" pixel_height={10}>
        {children}
      </ActivePixelCard>
    </div>
  )
})
const GetAirdropWrap = memo(({ children }: { children: React.ReactNode }) => {
  const { chainId } = useActiveWeb3React()
  const isW768 = useIsW768()
  const { activeData } = useActiveData()
  const {
    airdropPoints,
    airdropPointsDetail: { gasStr, balanceStr }
  } = activeData
  return (
    <div className={css.GetAirdropWrap}>
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
                  <img src={CurrencyLogo[chainId]} title={Currency[chainId]} />
                  {/* <SvgComponent src={CurrencyLogo[chainId]} /> */}
                  {/* <img src={preStaticUrl + '/img/icon/pixel_eth.svg'} title="ETH" /> */}
                </div>
              </li>
            </ul>
          </div>
          <img src={preStaticUrl + '/img/tvl/airdrop_data.png'} className={css.img} />
        </div>
        {!isW768 ? children : null}
      </GetAirdropCard>
      {isW768 ? children : null}
    </div>
  )
})
export default GetAirdropWrap
