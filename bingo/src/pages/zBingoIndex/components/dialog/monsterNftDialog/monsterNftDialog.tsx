import { CloseOutlined } from '@ant-design/icons'
import { DialogContent, DialogOverlay } from '@reach/dialog'
import { useRecoilValue, useSetRecoilState } from '@zypher-game/toolkit/ui'
import { preStaticUrl } from '@zypher-game/toolkit/ui'
import { useCustomTranslation } from '@zypher-game/toolkit/ui'
import { LngNs } from '@zypher-game/toolkit/ui'
import { Button } from 'antd'
import React, { useCallback } from 'react'
import { Trans } from 'react-i18next'

import { monsterNftRuleDialogState } from '@/pages/state/state'

import css from './monsterNftDialog.module.stylus'
type Props = {
  onClose?: () => void
}
const MonsterNftDialog: React.FC<Props> = () => {
  const { t } = useCustomTranslation([LngNs.defense])
  const isModalOpen = useRecoilValue(monsterNftRuleDialogState)
  const setIsModalOpen = useSetRecoilState(monsterNftRuleDialogState)
  const handleCancel = useCallback(() => {
    setIsModalOpen(false)
  }, [])
  return (
    <>
      <DialogOverlay isOpen={isModalOpen} onDismiss={handleCancel} className={css.zindex}>
        <DialogContent className={'dialogContent'}>
          <div className={'dialogHeader'}>
            <h3>Zypher Guardian Emblem</h3>
            <div className="cursor" onClick={handleCancel}>
              <CloseOutlined />
            </div>
          </div>
          <div className={css.dialogContainer}>
            <img src={preStaticUrl + `/img/monster/passCard.png`} alt="level" className={css.levelImg} />
            <div className={css.text}>
              <p>
                <Trans i18nKey="MonsterNftDialogText2" defaults={t('MonsterNftDialogText2')} components={{ bold: <strong /> }} />
              </p>
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
export default MonsterNftDialog
