import { preStaticUrl } from '@ui/src'
import React, { memo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { tvlPath } from '@/pages/Active/hooks/activeHooks'

import css from './EarthPart.module.styl'
const EarthPart = memo(
  () => {
    const navigate = useNavigate()
    const toLeaderBorder = useCallback(() => {
      navigate(tvlPath[2])
    }, [])
    return (
      <div className={css.earthPart}>
        <img src={preStaticUrl + '/img/tvl/earth/earth.png'} alt="earth" className={css.earth} />
        <img src={preStaticUrl + '/img/tvl/earth/earth_bg01.png'} alt="earth" className={css.earth_bg01} />
        <img src={preStaticUrl + '/img/tvl/earth/earth_bg02.png'} alt="earth" className={css.earth_bg02} />
        <img src={preStaticUrl + '/img/tvl/earth/earth_bg03.png'} alt="earth" className={css.earth_bg03} />
        <img src={preStaticUrl + '/img/tvl/earth/leaderboard.png'} alt="earth" className={css.leaderboard} onClick={toLeaderBorder} />
        <img src={preStaticUrl + '/img/tvl/earth/staking.png'} alt="earth" className={css.restaking} />
        <img src={preStaticUrl + '/img/tvl/earth/team.png'} alt="earth" className={css.team} />
      </div>
    )
  },
  () => {
    return false
  }
)
export default EarthPart
