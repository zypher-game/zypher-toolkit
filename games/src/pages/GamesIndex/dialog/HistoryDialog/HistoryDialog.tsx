import { ActivePixelCard, DialogClose, ModalWithMotion, useIsW768, useRecoilValue, useSetRecoilState } from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo, useCallback } from 'react'

import Profile from '@/pages/Profile/profile'

import { historyDialogState } from '../../state/GamesState'
import css from './HistoryDialog.module.styl'
const HistoryDialog = memo(() => {
  const isM = useIsW768()
  const isModalOpen = useRecoilValue(historyDialogState)
  const setIsModalOpen = useSetRecoilState(historyDialogState)

  const handleCancel = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  return (
    <ModalWithMotion
      overlayClassName={css.bottom}
      isOpen={isModalOpen}
      onDismiss={handleCancel}
      contentClassName={`pixel_DialogContent ${css.dataDialog}`}
    >
      <ActivePixelCard hidePixel={isM ? true : false} className={css.content} pixel_height={10} backgroundColor="#1D263B" borderColor="#1D263B">
        <Profile />
      </ActivePixelCard>
      <DialogClose onClick={handleCancel} />
    </ModalWithMotion>
  )
}, isEqual)

export default HistoryDialog
