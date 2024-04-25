import { DialogContent, DialogOverlay } from '@reach/dialog'
import { useRecoilValue, useSetRecoilState } from '@UI/src/'
import { Modal } from 'antd'
import React, { useRef, useState } from 'react'

import { videoDialogState } from '@/pages/Home/state'
import videoUrl from '@/assets/video/game.mp4'

export default function VideoDialog({}) {
  const videoDom: any = useRef(null)
  const isModalOpen = useRecoilValue(videoDialogState)
  const setIsModalOpen = useSetRecoilState(videoDialogState)
  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    videoDom.current.pause()
    setIsModalOpen(false)
  }

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
}
