import { preStaticUrl } from '@UI/src/'
import React, { memo } from 'react'

import classnames from '@/utils/classnames'

import ActiveComp from '../../components/ActiveComp/ActiveComp'
import Staking from '../../components/Staking/Staking'
import css from './ActiveStaking.module.styl'

const ActiveStaking = memo(() => {
  return (
    <ActiveComp>
      <div className={css.inner}>
        <div className={css.fl}>
          <p className={css.text}>Congratulations on completing your registration!</p>
          <p className={css.text}>
            Please pledge <strong>at least 0.01 ETH</strong> to activate your account.
          </p>
          <p className={classnames(css.text, css.mt)}>The earlier and the greater the amount of pledge, the more airdrop points!</p>
          <p className={css.greyText}>
            Notice: Please complete account activation as soon as possible to ensure that your invitation code is not registered by others.
          </p>
          <img src={preStaticUrl + '/img/tvl/stake_card.png'} alt="stake" className={css.img} />
        </div>
        <div className={css.fr}>
          <Staking />
        </div>
      </div>
    </ActiveComp>
  )
})
export default ActiveStaking
