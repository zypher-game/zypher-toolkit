import { CloseOutlined } from '@ant-design/icons'
import { DialogContent, DialogOverlay } from '@reach/dialog'
import { useRecoilValue, useSetRecoilState } from '@UI/src/'
import { useCustomTranslation } from '@UI/src/'
import { LngNs } from '@UI/src/'
import { Button } from 'antd'
import React, { useCallback } from 'react'

import { Rule2DialogState } from '../../state/monsterState'
import css from './Rule2Dialog.module.stylus'
type Props = {
  onClose?: () => void
}
const Rule2Dialog: React.FC<Props> = () => {
  const { t } = useCustomTranslation([LngNs.defense])
  const isModalOpen = useRecoilValue(Rule2DialogState)
  const setIsModalOpen = useSetRecoilState(Rule2DialogState)

  const handleCancel = useCallback(() => {
    setIsModalOpen(false)
  }, [])
  return (
    <>
      <DialogOverlay isOpen={isModalOpen} onDismiss={handleCancel} className={css.zindex}>
        <DialogContent className="dialogContent">
          <div className="dialogHeader">
            <h3>{t('Rules')}</h3>
            <div className="cursor" onClick={handleCancel}>
              <CloseOutlined />
            </div>
          </div>
          <div className={css.dialogContainer}>
            <div className={css.title}>
              <i />
              <p>{t('rule2title1')}</p>
            </div>
            <div className={css.text}>
              <em />
              <p>{t('rule2Content1')}</p>
            </div>
            <div className={css.title}>
              <i />
              <p>{t('rule2title2')}</p>
            </div>
            <div className={css.text}>
              <em />
              <p>{t('rule2Content2')}</p>
            </div>
            <div className={css.title}>
              <i />
              <p>{t('rule2title3')}</p>
            </div>
            <div className={css.text}>
              <em />
              <p>{t('rule2Content3')}</p>
            </div>

            <div className={css.text}>
              <em />
              <p>{t('rule2Content4')}</p>
            </div>
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
export default Rule2Dialog
