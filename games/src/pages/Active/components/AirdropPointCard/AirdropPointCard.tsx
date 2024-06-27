import { preStaticUrl } from '@ui/src'
import React, { memo } from 'react'

import css from './AirdropPointCard.module.styl'
const AirdropPointCard = memo(({ amount }: { amount: string }) => {
  return (
    <div className={css.airdropPointCard}>
      <div className={css.title}>
        <p>Airdrop Points</p>
        <img decoding="async" loading="lazy" src={preStaticUrl + '/img/tvl/airdrop_point/card2.png'} alt="card2" className={`${css.card}`} />
      </div>
      <br />
      <div className={css.amount}>
        <p>{amount}</p>
        <img decoding="async" loading="lazy" src={preStaticUrl + '/img/tvl/airdrop_point/card.png'} alt="card" className={`${css.card}`} />
      </div>
      <div className={css.bg}>
        <img decoding="async" loading="lazy" src={preStaticUrl + '/img/tvl/airdrop_point/light.png'} alt="light" className={`${css.light}`} />
        <img decoding="async" loading="lazy" src={preStaticUrl + '/img/tvl/airdrop_point/number_bg.png'} alt="number_bg" className={css.number_bg} />
      </div>
    </div>
  )
})
export default AirdropPointCard
