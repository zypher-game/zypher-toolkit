import { DialogContent, DialogOverlay } from '@reach/dialog'
import { DialogClose, useRecoilValue, useSetRecoilState } from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo, useCallback } from 'react'

import Staking from '../../components/Staking/Staking'
import { tvlStakingDialogState } from '../../state/activeState'
const TVLStakingDialog = memo(() => {
  const isModalOpen = useRecoilValue(tvlStakingDialogState)
  const setIsModalOpen = useSetRecoilState(tvlStakingDialogState)

  const handleCancel = useCallback(() => {
    setIsModalOpen(false)
  }, [])
  return (
    <DialogOverlay isOpen={isModalOpen} onDismiss={handleCancel}>
      <DialogContent>
        <Staking />
        <DialogClose onClick={handleCancel} />
      </DialogContent>
    </DialogOverlay>
  )
}, isEqual)

export default TVLStakingDialog
