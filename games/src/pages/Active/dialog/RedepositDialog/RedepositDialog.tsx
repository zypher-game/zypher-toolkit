import { DialogClose, ModalWithMotion, useRecoilValue, useSetRecoilState } from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo, useCallback } from 'react'

import Redeposit from '../../components/Redeposit/Redeposit'
import { tvlRedepositDialogState } from '../../state/activeState'
import css from '../StakingDialog/StakingDialog.module.stylus'
const TVLRedepositDialog = memo(() => {
  const isModalOpen = useRecoilValue(tvlRedepositDialogState)
  const setIsModalOpen = useSetRecoilState(tvlRedepositDialogState)

  const handleCancel = useCallback(() => {
    setIsModalOpen(false)
  }, [])
  return (
    <ModalWithMotion isOpen={isModalOpen} onDismiss={handleCancel} contentClassName={css.stakingDialog}>
      <Redeposit isModal={true} />
      <DialogClose onClick={handleCancel} />
    </ModalWithMotion>
  )
}, isEqual)

export default TVLRedepositDialog
