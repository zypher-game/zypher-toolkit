import { CloseOutlined } from '@ant-design/icons'
import { DialogContent, DialogOverlay } from '@reach/dialog'
import { useRecoilValue, useSetRecoilState } from '@ui/src'
import { useCustomTranslation } from '@ui/src'
import { LngNs } from '@ui/src'
import { Button } from 'antd'
import React, { useCallback } from 'react'
import { Trans } from 'react-i18next'

import { invitationRuleDialogState } from '../state/invitationState'
import css from './RuleDialog.module.stylus'
type Props = {
  onClose?: () => void
}
const RuleDialog: React.FC<Props> = () => {
  const { t } = useCustomTranslation([LngNs.invitation])
  const isModalOpen = useRecoilValue(invitationRuleDialogState)
  const setIsModalOpen = useSetRecoilState(invitationRuleDialogState)

  const handleCancel = useCallback(() => {
    setIsModalOpen(false)
  }, [])
  return (
    <>
      <DialogOverlay isOpen={isModalOpen} onDismiss={handleCancel}>
        <DialogContent className="dialogContent">
          <div className="dialogHeader">
            <h3>{t('RuleDialogText01')}</h3>
            <div className="cursor" onClick={handleCancel}>
              <CloseOutlined />
            </div>
          </div>
          <div className={css.dialogContainer}>
            <p>
              <Trans i18nKey="RuleDialogText02" defaults={t('RuleDialogText02')} components={{ bold: <strong /> }} />
              <br />
              <br />
              {t('RuleDialogText03')}
              <a
                href="https://interesting-crop-c73.notion.site/Invitation-Loyalty-Points-Tournament-efceb23e8d804d5cb2998cec8237e772?pvs=4"
                target="_blank"
                rel="noreferrer"
              >
                <strong>{t('Learn more')}</strong>
              </a>
            </p>

            <Button className={css.btn} onClick={handleCancel}>
              {t('Ok')}
            </Button>
          </div>
        </DialogContent>
      </DialogOverlay>
    </>
  )
}
export default RuleDialog
