import { CloseOutlined } from '@ant-design/icons'
import { DialogContent, DialogOverlay } from '@reach/dialog'
import { LngNs, useCustomTranslation, useRecoilValue, useSetRecoilState } from '@ui/src'
import { Button } from 'antd'
import React, { useCallback } from 'react'
import { Trans } from 'react-i18next'

import { Rule1DialogState } from '../../state/monsterState'
import css from './Rule1Dialog.module.stylus'
type Props = {
  onClose?: () => void
}
const Rule1Dialog: React.FC<Props> = () => {
  const { t } = useCustomTranslation([LngNs.defense])
  const isModalOpen = useRecoilValue(Rule1DialogState)
  const setIsModalOpen = useSetRecoilState(Rule1DialogState)

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
            <p className={css.title}>{t('rule1text01')}</p>
            <div className={css.text}>
              <p>{t('rule1text02')}</p>
            </div>
            <div className={css.text}>
              <i />
              <p>{t('rule1text03')}</p>
            </div>
            <div className={css.text}>
              <i />
              <p>{t('rule1text04')}</p>
            </div>
            <div className={css.text}>
              <i />
              <p>{t('rule1text05')}</p>
            </div>
            <br />
            <p className={css.title}>{t('rule1text06')}</p>
            <div className={css.text}>
              <i />
              <p>{t('rule1text07')}</p>
            </div>
            <div className={css.text}>
              <i />
              <p>{t('rule1text08')}</p>
            </div>
            <div className={css.textinner}>
              <div className={css.text}>
                <em />
                <p>
                  <Trans i18nKey="rule1text09">
                    First <strong>400</strong> games: Deduct 1 stamina point per game
                  </Trans>
                </p>
                {/*
                <p>
                <Trans i18nKey="rule1text09">
                  Number of players: <span>2-5</span>
                </Trans>
                </p> */}
              </div>
              <div className={css.text}>
                <em />
                <p>
                  <Trans i18nKey="rule1text10">
                    <strong>401-600</strong> games: Deduct 2 stamina points per game
                  </Trans>
                </p>
              </div>
              <div className={css.text}>
                <em />
                <p>
                  <Trans i18nKey="rule1text11" defaults={t('rule1text11')} components={{ bold: <strong /> }} />
                </p>
              </div>
            </div>

            <div className={css.text}>
              <i />
              <p>{t('rule1text12')}</p>
            </div>
            <div className={css.text}>
              <i />
              <p>{t('rule1text13')}</p>
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
export default Rule1Dialog
