import { DialogClose, ModalWithMotion, useRecoilValue, useSetRecoilState } from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo, useCallback } from 'react'

import Withdraw from '../../components/Withdraw/Withdraw'
import { tvlWithdrawDialogState } from '../../state/activeState'
import css from '../StakingDialog/StakingDialog.module.stylus'
const TVLWithdrawDialog = memo(() => {
  const isModalOpen = useRecoilValue(tvlWithdrawDialogState)
  const setIsModalOpen = useSetRecoilState(tvlWithdrawDialogState)

  const handleCancel = useCallback(() => {
    setIsModalOpen(false)
  }, [])
  return (
    <ModalWithMotion isOpen={isModalOpen} onDismiss={handleCancel} contentClassName={css.stakingDialog}>
      <Withdraw />
      <DialogClose onClick={handleCancel} />
    </ModalWithMotion>
  )
}, isEqual)

export default TVLWithdrawDialog
