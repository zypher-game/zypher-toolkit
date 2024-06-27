import { DialogContent, DialogOverlay } from '@reach/dialog'
import { DialogClose, useRecoilValue, useSetRecoilState } from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo, useCallback } from 'react'

import { getPointAmount, pointSuccessDialogState } from '../../state/activeState'
import { MoreActiveSuccessCard } from '../../views/ActiveGetAirdrop/MoreActiveSuccess/MoreActiveSuccess'
import css from './GetPointDialog.module.styl'
const GetPointDialog = memo(() => {
  const isModalOpen = useRecoilValue(pointSuccessDialogState)
  const setIsModalOpen = useSetRecoilState(pointSuccessDialogState)
  const amount = useRecoilValue(getPointAmount)

  const handleCancel = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  return (
    <DialogOverlay isOpen={isModalOpen} onDismiss={handleCancel}>
      <DialogContent className={css.center}>
        <MoreActiveSuccessCard isModal={true} amount={amount} />
        <DialogClose onClick={handleCancel} />
      </DialogContent>
    </DialogOverlay>
  )
}, isEqual)

export default GetPointDialog
