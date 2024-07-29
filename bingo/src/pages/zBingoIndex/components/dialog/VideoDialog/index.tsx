import { DialogContent, DialogOverlay } from '@reach/dialog'
import { useRecoilValue, useSetRecoilState } from '@zypher-game/toolkit/ui'
import { isEqual } from 'lodash'
import React, { memo, useRef } from 'react'

import videoUrl from '@/assets/video/game.mp4'
import { videoDialogState } from '@/pages/state/state'

const VideoDialog = memo(() => {
  const videoDom: any = useRef(null)
  const isModalOpen = useRecoilValue(videoDialogState)
  const setIsModalOpen = useSetRecoilState(videoDialogState)
  const handleCancel = () => {
    videoDom.current.pause()
    setIsModalOpen(false)
  }

  return (
    <>
      <DialogOverlay isOpen={isModalOpen} onDismiss={handleCancel}>
        <DialogContent style={{ background: '#000', padding: '0', width: '1200px' }}>
          <video controls width="100%" ref={videoDom}>
            <source src={videoUrl} type="video/mp4" />
          </video>
        </DialogContent>
      </DialogOverlay>
    </>
  )
}, isEqual)
export default VideoDialog
