import { LngNs, preStaticUrl, useCustomTranslation } from '@UI/src/'
import classnames from 'classnames'
import { isEqual } from 'lodash'
import React, { memo, useMemo } from 'react'

import css from './comboBanner.module.stylus'
import ComboBannerBg02 from './components/ComboBannerBg02/ComboBannerBg02'
import ComboBannerDialog from './components/ComboBannerDialog'
import { KanitNormalBorder, KanitNormalText, KanitTitleText } from './components/KanitText'
import { useCombo } from './hook/useCombo'
const ComboBanner = memo(() => {
  const { t } = useCustomTranslation([LngNs.home])
  const { Text, forbidcss, comboBannerClickHandle } = useCombo()

  return (
    <div className={css.comboBanner} onClick={comboBannerClickHandle}>
      <div className={css.textWrap}>
        <KanitNormalBorder label={'COMBO NETWORK'} className={css.tip} />
        <KanitTitleText label={t('Check-in 3 days to mint a zBox')} className={css.title} />
        <KanitNormalText label={'Jan.22nd (EST 00:00) - Feb.26th (EST 24:00)'} className={css.textNormal} />
        <br /> <p className={classnames(css.btn, forbidcss ? css.forbid : '')}>{Text}</p>
      </div>
      <ComboBannerBg02 className={css.comboBanner_bg02} />
      {/* <img src={preStaticUrl + '/img/home/comboBanner_bg02.png'} className={css.comboBanner_bg02} /> */}
      <img src={preStaticUrl + '/img/home/comboBanner_bg.jpg'} className={css.comboBanner_bg01} />
      <img src={preStaticUrl + `/img/home/banner06.jpg`} className={css.bg} />
      <ComboBannerDialog />
    </div>
  )
}, isEqual)
export default ComboBanner
