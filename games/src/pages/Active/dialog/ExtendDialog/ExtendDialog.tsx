import { DialogClose, ModalWithMotion, useRecoilValue, useSetRecoilState } from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo, useCallback } from 'react'

import Extend from '../../components/Extend/Extend'
import { tvlExtendDialogState } from '../../state/activeState'
import css from '../StakingDialog/StakingDialog.module.stylus'
const TVLExtendDialog = memo(() => {
  const isModalOpen = useRecoilValue(tvlExtendDialogState)
  const setIsModalOpen = useSetRecoilState(tvlExtendDialogState)

  const handleCancel = useCallback(() => {
    setIsModalOpen(false)
  }, [])
  return (
    <ModalWithMotion isOpen={isModalOpen} onDismiss={handleCancel} contentClassName={css.stakingDialog}>
      <Extend />
      <DialogClose onClick={handleCancel} />
    </ModalWithMotion>
  )
}, isEqual)

export default TVLExtendDialog
