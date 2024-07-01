import { DialogClose, ModalWithMotion, useRecoilValue, useSetRecoilState } from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo, useCallback } from 'react'

import Staking from '../../components/Staking/Staking'
import { tvlStakingDialogState } from '../../state/activeState'
import css from './StakingDialog.module.stylus'
const TVLStakingDialog = memo(() => {
  const isModalOpen = useRecoilValue(tvlStakingDialogState)
  const setIsModalOpen = useSetRecoilState(tvlStakingDialogState)

  const handleCancel = useCallback(() => {
    setIsModalOpen(false)
  }, [])
  return (
    <ModalWithMotion isOpen={isModalOpen} onDismiss={handleCancel} contentClassName={css.stakingDialog}>
      <Staking />
      <DialogClose onClick={handleCancel} />
    </ModalWithMotion>
  )
}, isEqual)

export default TVLStakingDialog
