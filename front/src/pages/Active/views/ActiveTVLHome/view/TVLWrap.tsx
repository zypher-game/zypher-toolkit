import React, { memo } from 'react'

import ChangeNameDialog from '@/pages/Active/dialog/ChangeNameDialog/ChangeNameDialog'
import GetPointCardDialog from '@/pages/Active/dialog/GetPointCardDialog/GetPointCardDialog'
import GetPointDialog from '@/pages/Active/dialog/GetPointDialog/GetPointDialog'
import TVLStakingDialog from '@/pages/Active/dialog/StakingDialog/StakingDialog'
import { useStake } from '@/pages/Active/hooks/useStakeData'

import ActiveComp from '../../../components/ActiveComp/ActiveComp'
import css from './TVLWrap.module.styl'
const TVLWrap = memo(
  ({
    type,
    children,
    fl_children,
    fr_children
  }: {
    type?: 'inner' | 'lr' | undefined
    children?: React.ReactNode
    fl_children?: React.ReactNode
    fr_children?: React.ReactNode
  }) => {
    useStake()
    return (
      <ActiveComp>
        <div className={css.inner}>
          {type === 'inner' ? (
            children
          ) : (
            <div className={css.inner_inner}>
              <div className={css.fl}>{fl_children}</div>
              <div className={css.fr}>{fr_children}</div>
            </div>
          )}
        </div>
        <TVLStakingDialog />
        <ChangeNameDialog />
        <GetPointDialog />
        <GetPointCardDialog />
      </ActiveComp>
    )
  }
)
export default TVLWrap
