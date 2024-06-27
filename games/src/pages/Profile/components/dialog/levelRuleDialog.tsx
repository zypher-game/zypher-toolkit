import { CloseOutlined } from '@ant-design/icons'
import { DialogContent, DialogOverlay } from '@reach/dialog'
import { useRecoilValue, useSetRecoilState } from '@ui/src'
import { useCustomTranslation } from '@ui/src'
import { LngNs } from '@ui/src'
import { preStaticUrl } from '@ui/src'
import { Button } from 'antd'
import React, { useCallback } from 'react'

import { levelRuleDialogState } from '../../state/profileState'
import css from './levelRuleDialog.module.stylus'
type Props = {
  onClose?: () => void
}
const LevelRuleDialog: React.FC<Props> = () => {
  const { t } = useCustomTranslation([LngNs.profile])
  const isModalOpen = useRecoilValue(levelRuleDialogState)
  const setIsModalOpen = useSetRecoilState(levelRuleDialogState)

  const handleCancel = useCallback(() => {
    setIsModalOpen(false)
  }, [])
  return (
    <>
      <DialogOverlay isOpen={isModalOpen} onDismiss={handleCancel} className={css.zindex}>
        <DialogContent className="dialogContent">
          <div className="dialogHeader">
            <h3>{t('Levels & Rules')}</h3>
            <div className="cursor" onClick={handleCancel}>
              <CloseOutlined />
            </div>
          </div>
          <div className={css.dialogContainer}>
            {[
              {
                img: 'level1.svg',
                title: t('LevelRuleDialogTitle01'),
                content: t('LevelRuleDialogContent01')
              },
              {
                img: 'level2.svg',
                title: t('LevelRuleDialogTitle02'),
                content: t('LevelRuleDialogContent02')
              },
              {
                img: 'level3.svg',
                title: t('LevelRuleDialogTitle03'),
                content: t('LevelRuleDialogContent03')
              }
            ].map(v => (
              <div className={css.level} key={v.img}>
                <img decoding="async" loading="lazy" src={preStaticUrl + `/img/profile/${v.img}`} alt={v.title} />
                <div>
                  <h4>{v.title}</h4>
                  <p>{v.content}</p>
                </div>
              </div>
            ))}
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
export default LevelRuleDialog
