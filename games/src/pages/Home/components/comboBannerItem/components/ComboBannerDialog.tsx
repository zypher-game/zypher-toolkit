import { CloseOutlined, LoadingOutlined } from '@ant-design/icons'
import { DialogContent, DialogOverlay } from '@reach/dialog'
import { LngNs, preStaticUrl, useCustomTranslation, useRecoilValue, useSetRecoilState } from '@ui/src'
import classnames from 'classnames'
import { isEqual } from 'lodash'
import React, { memo, useCallback, useMemo } from 'react'

import Icon from '@/assets/iconsLocal'

import { comboBannerDialogState } from '../hook/state'
import { useCombo } from '../hook/useCombo'
import ComboBannerBg02 from './ComboBannerBg02/ComboBannerBg02'
import css from './ComboBannerDialog.module.stylus'
import { KanitNormalBorder, KanitNormalText, KanitTitleText } from './KanitText'
const ComboBannerDialog = memo(() => {
  const { t } = useCustomTranslation([LngNs.home])
  const { status, Text, forbidcss, checkInLoading, checkInHandle } = useCombo()
  const isModalOpen = useRecoilValue(comboBannerDialogState)
  const setIsModalOpen = useSetRecoilState(comboBannerDialogState)
  const handleCancel = useCallback(() => {
    setIsModalOpen(false)
  }, [])
  const Question = useMemo(() => {
    return (
      <a
        href="https://medium.com/@ZypherGames/join-the-combo-daily-log-in-event-ce916fb5c450"
        target="_blank"
        rel="noreferrer"
        className={css.question}
      >
        <p>{t('Description')}</p>
        <Icon name="question" />
      </a>
    )
  }, [t])
  return (
    <DialogOverlay isOpen={isModalOpen} onDismiss={handleCancel}>
      <DialogContent className={css.comboBannerDialog}>
        <div onClick={handleCancel} className={css.close}>
          <CloseOutlined />
        </div>
        {!status.isClaimed ? (
          <>
            <div className={css.textWrap}>
              <KanitNormalBorder label={'COMBO'} className={css.tip} />
              <KanitTitleText label={t('Check-in zBox')} className={css.title} />
              <div className={css.lineWrap}>
                <div className={css.line} />
                <p className={css.textNormal}>Jan.22th - Feb.26th</p>
                {/* <p className={css.textNormal}> (EST 24:00)</p> */}
              </div>
              <div className={css.process}>
                <div className={css.processInner}>
                  {[1, 2, 3].map(v => (
                    <>
                      <div key={v} className={css.circle}>
                        <div className={classnames(css.circleInner, status.checked.length >= v ? css.small : '')}>
                          <KanitNormalText label={`${status.checked.length >= v ? '✔️' : v}`} className="" />
                        </div>
                      </div>
                      {v === 3 ? null : <div className={classnames(css[`line${v}`], status.checked.length >= v ? css.grey : '')} />}
                    </>
                  ))}
                </div>
              </div>
              <p className={classnames(css.btn, forbidcss ? css.forbid : '')} onClick={checkInHandle}>
                {Text}
                {checkInLoading ? (
                  <>
                    {' '}
                    <LoadingOutlined />
                  </>
                ) : null}
              </p>
              {Question}
            </div>
            <ComboBannerBg02 className={css.comboBanner_bg02} />
            {/* <img src={preStaticUrl + '/img/home/comboBanner_bg02.png'} className={css.comboBanner_bg02} /> */}
            <img src={preStaticUrl + '/img/home/comboBanner_bg03.jpg'} className={css.comboBanner_bg01} />
          </>
        ) : (
          <>
            <div className={css.claimed}>
              <ComboBannerBg02 className={css.comboBanner_bg02} />
              {/* <img src={preStaticUrl + '/img/home/comboBanner_bg02.png'} className={css.comboBanner_bg02} /> */}
              <div className={css.claimedInner}>
                <KanitTitleText label={t('Congratulations')} className={css.title} />
                <p className={classnames(css.btn, forbidcss ? css.forbid : '')} onClick={checkInHandle}>
                  {Text}
                  {checkInLoading ? (
                    <>
                      {' '}
                      <LoadingOutlined />
                    </>
                  ) : null}
                </p>
                {Question}
              </div>
            </div>
            <img src={preStaticUrl + '/img/home/comboBanner_bg04.jpg'} className={css.comboBanner_bg01} />
          </>
        )}
      </DialogContent>
    </DialogOverlay>
  )
}, isEqual)
export default ComboBannerDialog
