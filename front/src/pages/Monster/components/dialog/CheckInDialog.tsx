import { CloseOutlined } from '@ant-design/icons'
import { DialogContent, DialogOverlay } from '@reach/dialog'
import { PointsIcon, useCustomTranslation, useIsMobile, useRecoilValue, useSetRecoilState } from '@ui/src'
import { LngNs } from '@ui/src'
import { Button } from 'antd'
import React, { useCallback } from 'react'

import { checkInDialogState } from '../../state/monsterState'
import css from './CheckInDialog.module.stylus'
type Props = {
  onClose?: () => void
}
const CheckInDialog: React.FC<Props> = () => {
  const { t } = useCustomTranslation([LngNs.defense])
  const isMobile = useIsMobile()
  const isModalOpen = useRecoilValue(checkInDialogState)
  const setIsModalOpen = useSetRecoilState(checkInDialogState)

  const handleCancel = useCallback(() => {
    setIsModalOpen(false)
  }, [])
  return (
    <>
      <DialogOverlay className="dialogPosition" isOpen={isModalOpen} onDismiss={handleCancel}>
        <DialogContent className="dialogContent">
          <div className="dialogHeader">
            <h3>check in</h3>
            <div className="cursor" onClick={handleCancel}>
              <CloseOutlined />
            </div>
          </div>
          <div className={css.dialogContainer}>
            <p className={css.point}>
              900
              <PointsIcon isMobile={isMobile} />
            </p>
            <p className={css.text}>
              Oops! My continuous sign-in has been interrupted for 3 days, do you need to spend 900 carrots to make up the number of days you have
              signed in?
            </p>
            <div className={css.btn_content}>
              <Button className={css.btnFl} onClick={handleCancel}>
                Check In Again
              </Button>
              <Button className={css.btnFr} onClick={handleCancel}>
                {t('Confirm')}
              </Button>
            </div>
          </div>
        </DialogContent>
      </DialogOverlay>
    </>
  )
}
export default CheckInDialog
