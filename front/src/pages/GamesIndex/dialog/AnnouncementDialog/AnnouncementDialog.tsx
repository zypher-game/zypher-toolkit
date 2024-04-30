import { DialogContent, DialogOverlay } from '@reach/dialog'
import { preStaticUrl, SvgComponent, useRecoilValue, useSetRecoilState } from '@UI/src/'
import { isEqual } from 'lodash'
import React, { memo, useCallback } from 'react'

import { PixelTable } from '@/components/PixelTable/PixelTable'

import { dataDialogState } from '../../state/GamesState'
import css from './AnnouncementDialog.module.styl'
const AnnouncementDialog = memo(() => {
  const isModalOpen = useRecoilValue(dataDialogState)
  const setIsModalOpen = useSetRecoilState(dataDialogState)

  const handleCancel = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  return (
    <DialogOverlay isOpen={isModalOpen} onDismiss={handleCancel}>
      <DialogContent className={`pixel_DialogContent ${css.dataDialog}`}>
        <PixelTable
          width="100%"
          height="100%"
          className={css.table_body}
          backgroundColor="#1D263B"
          header_children={<p className={css.title}>Announcement</p>}
          body_children={<p>ddd</p>}
          pixel_height={10}
        />
        <div className="select_cursor" onClick={handleCancel}>
          <SvgComponent src={preStaticUrl + '/img/icon/pixel_close.svg'} />
        </div>
      </DialogContent>
    </DialogOverlay>
  )
}, isEqual)

export default AnnouncementDialog
