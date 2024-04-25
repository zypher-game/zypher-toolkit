import { LngNs, preStaticUrl, useCustomTranslation, useIsMobile, useSetRecoilState } from '@UI/src/'
import { isEqual } from 'lodash'
import React, { memo, useCallback } from 'react'

import { dpBuyDialogState } from '../hooks/state'
import { IDPData } from '../hooks/useGPAction'
import css from './DPBanner.module.stylus'
const DPBanner = memo(({ preHandleAction, dpData }: { preHandleAction: any; dpData: IDPData }) => {
  const { t } = useCustomTranslation([LngNs.dp])
  const setIsModalOpen = useSetRecoilState(dpBuyDialogState)
  const isMobile = useIsMobile()
  const buyDialogHandle = useCallback(() => {
    const isOk = preHandleAction()
    if (isOk) {
      setIsModalOpen(true)
    }
  }, [preHandleAction])
  return (
    <div className={css.dpBanner}>
      <img src={preStaticUrl + `/img/dp/dp_banner_bg${isMobile ? '_m' : ''}.png`} className={css.bannerBg} />
      <div className={css.dpBannerInner}>
        {isMobile ? (
          <h1>
            {t('mBannerText01')}
            <br />
            {t('mBannerText02')}
          </h1>
        ) : null}
        <img src={preStaticUrl + '/img/dp/dp_banner.png'} className={css.bannerBg01} />
        <div className={css.content}>
          {isMobile ? null : <h1>{t('bannerText')}</h1>}
          <p className={css.grey}>{t('bannerTextSub')}</p>
          <h2>{dpData.totalInvestmentAmountStr} $GP</h2>
          <ul>
            {[
              {
                label: t('Minted'),
                value: dpData.minted,
                valueStr: dpData.mintedStr + ' DPs'
              },
              {},
              {
                label: t('Staked'),
                value: dpData.staked,
                valueStr: dpData.stakedStr + ' DPs'
              },
              {},
              {
                label: t('Locked'),
                value: dpData.locked,
                valueStr: dpData.lockedStr + ' DPs'
              },
              {},
              {
                label: t('APY'),
                value: dpData.maxApy,
                valueStr: dpData.maxApyStr + '%'
              }
            ].map((v, index) => (
              <li key={v.label} className={v?.label ? '' : css.lineOn}>
                {isMobile && index === 3 ? null : v?.valueStr ? (
                  <>
                    <p className={css.grey}>{v.label}</p>
                    <p className={css.title}>{v.valueStr}</p>
                  </>
                ) : (
                  <i className={css.line} />
                )}
              </li>
            ))}
          </ul>
          <button className={css.btn} onClick={buyDialogHandle}>
            {t('BUY')}
          </button>
        </div>
      </div>
    </div>
  )
}, isEqual)
export default DPBanner
