import { motion } from '@ui/src'
import React, { memo } from 'react'

import ChangeNameDialog from '@/pages/Active/dialog/ChangeNameDialog/ChangeNameDialog'
import GetPointDialog from '@/pages/Active/dialog/GetPointDialog/GetPointDialog'
import TVLRedepositDialog from '@/pages/Active/dialog/RedepositDialog/RedepositDialog'
import TVLStakingDialog from '@/pages/Active/dialog/StakingDialog/StakingDialog'
import TVLWithdrawDialog from '@/pages/Active/dialog/WithdrawDialog/WithdrawDialog'
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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className={css.inner}>
          {type === 'inner' ? (
            children
          ) : (
            <div className={css.inner_inner}>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className={css.fl}>
                {fl_children}
              </motion.div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className={css.fr}>
                {fr_children}
              </motion.div>
            </div>
          )}
        </motion.div>
        <TVLStakingDialog />
        <TVLWithdrawDialog />
        <TVLRedepositDialog />
        <ChangeNameDialog />
        <GetPointDialog />
      </ActiveComp>
    )
  }
)
export default TVLWrap
