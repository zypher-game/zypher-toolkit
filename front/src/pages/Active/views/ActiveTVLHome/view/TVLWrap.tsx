import React, { memo } from 'react'

import ChangeNameDialog from '@/pages/Active/dialog/ChangeNameDialog/ChangeNameDialog'
import TVLStakingDialog from '@/pages/Active/dialog/StakingDialog/StakingDialog'
import TVLPointDialog from '@/pages/Active/dialog/TVLPointDialog/TVLPointDialog'

import ActiveComp from '../../../components/ActiveComp/ActiveComp'
import { useStake } from '../../../hooks/activeHooks'
import Tab from '../components/Tab/Tab'
import css from './TVLWrap.module.styl'
const TVLWrap = memo(({ fl_children, fr_children }: { fl_children: React.ReactNode; fr_children: React.ReactNode }) => {
  useStake()
  return (
    <ActiveComp>
      <div className={css.inner}>
        <Tab />
        <div className={css.inner_inner}>
          <div className={css.fl}>{fl_children}</div>
          <div className={css.fr}>{fr_children}</div>
        </div>
      </div>
      <TVLStakingDialog />
      <ChangeNameDialog />
      <TVLPointDialog />
    </ActiveComp>
  )
})
export default TVLWrap
