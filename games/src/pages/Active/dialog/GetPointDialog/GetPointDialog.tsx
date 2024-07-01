import { DialogClose, ModalWithMotion, useRecoilValue, useSetRecoilState } from '@ui/src'
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
    <ModalWithMotion isOpen={isModalOpen} onDismiss={handleCancel} contentClassName={css.center}>
      <MoreActiveSuccessCard isModal={true} amount={amount} />
      <DialogClose onClick={handleCancel} />
    </ModalWithMotion>
  )
}, isEqual)

export default GetPointDialog
