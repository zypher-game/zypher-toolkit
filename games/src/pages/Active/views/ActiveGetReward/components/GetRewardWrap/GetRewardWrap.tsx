import { Currency, CurrencyLogo, preStaticUrl, useActiveWeb3React, useIsW768 } from '@ui/src'
import { ActivePixelCard } from '@ui/src'
import React, { memo } from 'react'

import { useActiveData } from '@/pages/Active/hooks/useActiveData'
import classnames from '@/utils/classnames'

import css from './GetRewardWrap.module.styl'
export const GetRewardCard = memo(({ children, className }: { children: React.ReactNode; className?: string }) => {
  const isW768 = useIsW768()
  return (
    <div className={css.rewardWrap}>
      <ActivePixelCard className={classnames(css.reward, className)} backgroundColor="#1D263B" pixel_height={isW768 ? 5 : 10}>
        {children}
      </ActivePixelCard>
    </div>
  )
})
const GetRewardWrap = memo(({ children }: { children: React.ReactNode }) => {
  const { chainId } = useActiveWeb3React()
  const isW768 = useIsW768()
  const { activeData } = useActiveData()
  const {
    rewardPoints,
    rewardPointsDetail: { gasStr, balanceStr }
  } = activeData
  return (
    <div className={css.GetRewardWrap}>
      <GetRewardCard>
        <div className={css.inner}>
          <div className={css.fl}>
            <h3>Your Reward Data</h3>
            <ul>
              <li>
                <p>Reward Points</p>
                <div className={css.li_fr}>
                  <p>{rewardPoints}</p>
                </div>
              </li>
              <li>
                <p>Gas consumption</p>
                <div className={css.li_fr}>
                  <p>{gasStr}</p>
                  <img decoding="async" loading="lazy" src={CurrencyLogo[chainId]} title={Currency[chainId]} />
                </div>
              </li>
              <li>
                <p>Wallet Balance</p>
                <div className={css.li_fr}>
                  <p>{balanceStr}</p>
                  <img decoding="async" loading="lazy" src={CurrencyLogo[chainId]} title={Currency[chainId]} />
                  {/* <SvgComponent src={CurrencyLogo[chainId]} /> */}
                  {/*  <img decoding="async" loading="lazy" src={preStaticUrl + '/img/icon/pixel_eth.svg'} title="ETH" /> */}
                </div>
              </li>
            </ul>
          </div>
          <img decoding="async" loading="lazy" src={preStaticUrl + '/img/tvl/reward_data.png'} className={css.img} />
        </div>
        {!isW768 ? children : null}
      </GetRewardCard>
      {isW768 ? children : null}
    </div>
  )
})
export default GetRewardWrap
