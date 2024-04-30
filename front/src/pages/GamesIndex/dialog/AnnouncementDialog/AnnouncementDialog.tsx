import { DialogContent, DialogOverlay } from '@reach/dialog'
import { preStaticUrl, SvgComponent, timestampToDateStr, useRecoilValue, useSetRecoilState } from '@UI/src/'
import { isEqual } from 'lodash'
import React, { memo, useCallback } from 'react'

import { PixelTable } from '@/components/PixelTable/PixelTable'

import { useAnnouncement } from '../../hook/useAnnouncement'
import { announcementDialogState } from '../../state/GamesState'
import css from './AnnouncementDialog.module.styl'
const AnnouncementDialog = memo(() => {
  const { announcement } = useAnnouncement()
  const isModalOpen = useRecoilValue(announcementDialogState)
  const setIsModalOpen = useSetRecoilState(announcementDialogState)

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
          body_children={
            <div className={css.content}>
              {announcement.map(v => (
                <div className={css.item} key={v.time}>
                  <h4>{v.title}</h4>
                  <p className={css.grey}>{timestampToDateStr(v.time, '/')}</p>
                  <p className={css.text}>{v.content}</p>
                </div>
              ))}
              <div className="pixelTableInnerBottom dialogAnnouncementDialog" />
            </div>
          }
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
