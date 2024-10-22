import { preStaticUrl } from '@ui/src'
import React, { memo } from 'react'

import css from './RewardPointCard.module.styl'
const RewardPointCard = memo(({ amount }: { amount: string }) => {
  return (
    <div className={css.rewardPointCard}>
      <div className={css.title}>
        <p>Reward Points</p>
        <img decoding="async" loading="lazy" src={preStaticUrl + '/img/tvl/reward_point/card2.png'} alt="card2" className={`${css.card}`} />
      </div>
      <br />
      <div className={css.amount}>
        <p>{amount}</p>
        <img decoding="async" loading="lazy" src={preStaticUrl + '/img/tvl/reward_point/card.png'} alt="card" className={`${css.card}`} />
      </div>
      <div className={css.bg}>
        <img decoding="async" loading="lazy" src={preStaticUrl + '/img/tvl/reward_point/light.png'} alt="light" className={`${css.light}`} />
        <img decoding="async" loading="lazy" src={preStaticUrl + '/img/tvl/reward_point/number_bg.png'} alt="number_bg" className={css.number_bg} />
      </div>
    </div>
  )
})
export default RewardPointCard
