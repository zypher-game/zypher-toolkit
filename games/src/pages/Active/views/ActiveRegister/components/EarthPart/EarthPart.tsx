import { motion, preStaticUrl } from '@ui/src'
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
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className={css.earthPart}>
        <img fetchPriority="high" decoding="async" loading="lazy" src={preStaticUrl + '/img/tvl/earth/earth.png'} alt="earth" className={css.earth} />
        <img decoding="async" loading="lazy" src={preStaticUrl + '/img/tvl/earth/earth_bg01.png'} alt="earth" className={css.earth_bg01} />
        <img decoding="async" loading="lazy" src={preStaticUrl + '/img/tvl/earth/earth_bg02.png'} alt="earth" className={css.earth_bg02} />
        <img decoding="async" loading="lazy" src={preStaticUrl + '/img/tvl/earth/earth_bg03.png'} alt="earth" className={css.earth_bg03} />
        <img
          decoding="async"
          loading="lazy"
          src={preStaticUrl + '/img/tvl/earth/leaderboard.png'}
          alt="earth"
          onClick={toLeaderBorder}
          className={css.leaderboard}
        />
        <img decoding="async" loading="lazy" src={preStaticUrl + '/img/tvl/earth/staking.png'} alt="earth" className={css.restaking} />
        <img decoding="async" loading="lazy" src={preStaticUrl + '/img/tvl/earth/team.png'} alt="earth" className={css.team} />
      </motion.div>
    )
  },
  () => {
    return false
  }
)
export default EarthPart
