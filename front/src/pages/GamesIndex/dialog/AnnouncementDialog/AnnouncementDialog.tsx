import { DialogContent, DialogOverlay } from '@reach/dialog'
import {
  DialogClose,
  IsTablePixelWidget,
  PixelTable,
  preStaticUrl,
  SvgComponent,
  timestampToDateStr,
  useIsW768,
  useRecoilValue,
  useSetRecoilState
} from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo, useCallback } from 'react'

import { useAnnouncement } from '../../hook/useAnnouncement'
import { announcementDialogState } from '../../state/GamesState'
import css from './AnnouncementDialog.module.styl'
const AnnouncementDialog = memo(() => {
  const isW768 = useIsW768()
  const { announcement } = useAnnouncement()
  const isModalOpen = useRecoilValue(announcementDialogState)
  const setIsModalOpen = useSetRecoilState(announcementDialogState)

  const handleCancel = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  return (
    <DialogOverlay className={css.bottom} isOpen={isModalOpen} onDismiss={handleCancel}>
      <DialogContent className={`pixel_DialogContent ${css.dataDialog}`}>
        <IsTablePixelWidget
          width="100%"
          height="100%"
          className={css.table_body}
          backgroundColor="#1D263B"
          header_children={<p className={`modalTitleInnerTitle ${css.title}`}>Announcement</p>}
          body_children={
            <div className={css.content}>
              {announcement.map(v => (
                <div className={css.item} key={v.time}>
                  <h4>{v.title}</h4>
                  <p className={css.grey}>{timestampToDateStr(v.time, '/')}</p>
                  <p className={css.text}>{v.content}</p>
                  {v.link ? (
                    <a href={v.link} className={css.link} target="_blank" rel="noreferrer">
                      Learn more...
                    </a>
                  ) : null}
                </div>
              ))}
            </div>
          }
          pixel_height={isW768 ? 5 : 10}
        />
        <DialogClose onClick={handleCancel} />
      </DialogContent>
    </DialogOverlay>
  )
}, isEqual)

export default AnnouncementDialog
