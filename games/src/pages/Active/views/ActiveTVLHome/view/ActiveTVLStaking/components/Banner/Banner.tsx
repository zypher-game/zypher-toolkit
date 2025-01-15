import React, { memo } from 'react'

import Tab from '../../../../components/Tab/Tab'
import css from './Banner.module.styl'

const Banner = memo(() => {
  return (
    <>
      <div className={css.banner}>
        <div className={css.fl}>
          <h3 className={css.fl_title}>Get Linea XP + SBT + $GP Rewards + Reward Points + CR Hero Mystery Boxes!</h3>
          <p className={css.fl_grey}>Improve your character profile by increasing your stake amount! Show your glory!</p>
          <h3 className={css.fl_text}>First Phase Competition Schedule: Oct. 17, 2024 ~ Jan. 16, 2025</h3>
          <p className={css.fl_grey}>
            The first phase staking assets can be withdrawn, and the second phase staking opens at a later date to be determined.
          </p>
        </div>
        <Tab />
      </div>
    </>
  )
})
export default Banner
