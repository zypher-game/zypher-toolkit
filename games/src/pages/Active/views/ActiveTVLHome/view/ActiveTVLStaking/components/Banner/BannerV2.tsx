import { preStaticUrl, SvgComponent } from '@ui/src'
import React, { memo } from 'react'

import Tab from '../../../../components/Tab/Tab'
import css from './BannerV2.module.styl'

const BannerV2 = memo(() => {
  return (
    <>
      <div className={css.banner}>
        <div className={css.fl}>
          <h3 className={css.fl_title}>Get Linea XP + SBT + $GP Rewards + Reward Points + CR Hero Mystery Boxes!</h3>
          <p className={css.fl_grey}>Improve your character profile by increasing your stake amount! Show your glory!</p>
          <div className={css.fl_text}>
            <h3>New Cycle: Feb 6, 2025 - Token Emission</h3>
          </div>
          <div className={css.label}>
            <SvgComponent src={preStaticUrl + '/img/icon/pixel_warn.svg'} className={css.tooltip_pixel_warn} />
            <p>The first phase staking assets can be withdrawn, and the second phase re-staking opens on February 6th.</p>
          </div>
          <p className={css.fl_grey}>The reward points will continue to grow based on the amount and duration of your staked assets!</p>
        </div>
        <Tab />
      </div>
    </>
  )
})
export default BannerV2
