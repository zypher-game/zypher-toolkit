import { DialogContent, DialogOverlay } from '@reach/dialog'
import { preStaticUrl, useRecoilValue, useSetRecoilState } from '@zypher-game/toolkit/ui'
import { useCustomTranslation } from '@zypher-game/toolkit/ui'
import { LngNs } from '@zypher-game/toolkit/ui'
import React, { useCallback } from 'react'

import { ButtonPrimary } from '@/pages/components/Button'
import { bingoRuleDialogState } from '@/pages/state/state'

import css from './bingoRules.module.stylus'
type Props = {
  onClose?: () => void
}
const BingoRulesDialog: React.FC<Props> = () => {
  const { t } = useCustomTranslation([LngNs.zBingo])
  const isModalOpen = useRecoilValue(bingoRuleDialogState)
  const setIsModalOpen = useSetRecoilState(bingoRuleDialogState)

  const handleCancel = useCallback(() => {
    setIsModalOpen(false)
  }, [])
  return (
    <>
      <DialogOverlay isOpen={isModalOpen} onDismiss={handleCancel} className={css.zindex}>
        <DialogContent className={css.levelRule}>
          <img src={preStaticUrl + `/img/bingo/close.svg`} alt="close" className={css.close} onClick={handleCancel} />
          <h3 className={css.title}>{t('Bingo Rules')}</h3>
          <div className={css.rulesheader}>
            <h3 className={css.rulestitle}>
              {t('BingoRules01')}
              <span>2-5</span>
            </h3>
            <h3 className={css.rulestitle}>
              {t('BingoRules0201')}
              <span>{t('BingoRules0202')}</span>
            </h3>
            <h3 className={css.rulestitle}>
              {t('BingoRules0301')} <span>{t('BingoRules0302')}</span>
            </h3>
          </div>
          <div className={css.rulesexample}>
            <h3 className={css.rulestitle}>{t('rulesExampletext1')}</h3>
            <p className={css.rulestext}>{t('rulesExampletext2')}</p>
            <p className={css.rulestext}>{t('rulesExampletext3')}</p>
            <p className={css.rulestext}>{t('rulesExampletext4')}</p>
          </div>
          <div className={css.btn}>
            <ButtonPrimary className={css.btn} onClick={handleCancel}>
              Confirm
            </ButtonPrimary>
          </div>
        </DialogContent>
      </DialogOverlay>
    </>
  )
}
export default BingoRulesDialog
