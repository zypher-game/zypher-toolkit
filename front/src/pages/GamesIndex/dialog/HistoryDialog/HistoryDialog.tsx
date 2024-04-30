import { DialogContent, DialogOverlay } from '@reach/dialog'
import { ActivePixelCard, preStaticUrl, SvgComponent, useRecoilValue, useSetRecoilState } from '@UI/src/'
import { isEqual } from 'lodash'
import React, { memo, useCallback } from 'react'

import Profile from '@/pages/Profile/profile'

import { historyDialogState } from '../../state/GamesState'
import css from './HistoryDialog.module.styl'
const HistoryDialog = memo(() => {
  const isModalOpen = useRecoilValue(historyDialogState)
  const setIsModalOpen = useSetRecoilState(historyDialogState)

  const handleCancel = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  return (
    <DialogOverlay isOpen={isModalOpen} onDismiss={handleCancel}>
      <DialogContent className={`pixel_DialogContent ${css.dataDialog}`}>
        <ActivePixelCard className={css.content} pixel_height={10} backgroundColor="#1D263B">
          <Profile />
        </ActivePixelCard>
        <div className="select_cursor" onClick={handleCancel}>
          <SvgComponent src={preStaticUrl + '/img/icon/pixel_close.svg'} />
        </div>
      </DialogContent>
    </DialogOverlay>
  )
}, isEqual)

export default HistoryDialog
