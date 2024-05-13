import React, { memo } from 'react'

import Tab from '../../../../components/Tab/Tab'
import css from './Banner.module.styl'

const Banner = memo(() => {
  return (
    <div className={css.banner}>
      <div className={css.fl}>
        <h3 className={css.fl_title}>Get $GP Rewards + Airdrop Points + CR Hero Mystery Boxes!</h3>
        <p className={css.fl_grey}>Improve your character profile by increasing your stake amount! Show your glory!</p>
        <h3 className={css.fl_title}>This round of competition time: April 20, 2024 ~ July 20, 2024</h3>
        <p className={css.fl_grey}>The airdrop points will continue to grow based on the amount and duration of your pledged assets!</p>
      </div>
      <Tab />
    </div>
  )
})
export default Banner
