import { CloseOutlined } from '@ant-design/icons'
import { DialogContent, DialogOverlay } from '@reach/dialog'
import { useRecoilValue, useSetRecoilState } from '@UI/src/'
import { useCustomTranslation } from '@UI/src/'
import { LngNs } from '@UI/src/'
import { Button } from 'antd'
import React, { useCallback } from 'react'
import { Trans } from 'react-i18next'

import { dailyRewardsRuleDialogState } from '../../state/homeState'
import css from './DailyRewardsRuleDialog.module.stylus'
type Props = {
  onClose?: () => void
}
const DailyRewardsRuleDialog: React.FC<Props> = () => {
  const { t } = useCustomTranslation([LngNs.points])
  const isModalOpen = useRecoilValue(dailyRewardsRuleDialogState)
  const setIsModalOpen = useSetRecoilState(dailyRewardsRuleDialogState)

  const handleCancel = useCallback(() => {
    setIsModalOpen(false)
  }, [])
  return (
    <>
      <DialogOverlay isOpen={isModalOpen} onDismiss={handleCancel}>
        <DialogContent className="dialogContent">
          <div className="dialogHeader">
            <h3>{t('Rules')}</h3>
            <div className="cursor" onClick={handleCancel}>
              <CloseOutlined />
            </div>
          </div>
          <div className={css.dialogContainer}>
            <h4>{t('DailyRewardsRuleDialogText01')}</h4>
            <p>
              <Trans i18nKey="DailyRewardsRuleDialogText02" defaults={t('DailyRewardsRuleDialogText02')}>
                <a href="https://medium.com/@ZypherGames/upcoming-announcement-44e69204adb1" target="_blank" rel="noreferrer">
                  {{ MoreDetails: t('More Details') }}
                </a>
              </Trans>
            </p>
            <h4>
              {t('DailyRewardsRuleDialogText03')}
              <p>9/26 2AM UTC - 10/10 2AM UTC</p>
            </h4>
            <h4>{t('DailyRewardsRuleDialogText04')}</h4>
            <p>
              <em />
              <i>{t('DailyRewardsRuleDialogText05')}</i>
              <br />
              <em />
              <i>{t('DailyRewardsRuleDialogText06')}</i>
              <br />
              <em />
              <i>{t('DailyRewardsRuleDialogText07')}</i>
            </p>
            <h4>Interpretation & Guidelines: </h4>
            <p>
              <Trans i18nKey="DailyRewardsRuleDialogText09" defaults={t('DailyRewardsRuleDialogText09')}>
                <a href="https://discord.com/invite/MKJZhS4p2T" target="_blank" className={css.fontWhite} rel="noreferrer">
                  Discord
                </a>
              </Trans>
            </p>
          </div>
          <div className={css.btnWrap}>
            <Button className={css.btn} onClick={handleCancel}>
              {t('Ok')}
            </Button>
          </div>
        </DialogContent>
      </DialogOverlay>
    </>
  )
}
export default DailyRewardsRuleDialog
