import { preStaticUrl } from '@ui/src'
import classnames from 'classnames'
import { isEqual } from 'lodash'
import React, { memo } from 'react'

import css from './ComboBannerBg02.module.stylus'
const ComboBannerBg02 = memo(({ className }: { className: string }) => {
  return (
    <div className={className}>
      <img
        decoding="async"
        loading="lazy"
        src={preStaticUrl + '/img/home/comboBanner-box-bg01.png'}
        className={classnames(css['comboBanner_box_bg01'], 'comboBanner_box_bg01')}
      />
      <img decoding="async" loading="lazy" src={preStaticUrl + '/img/home/comboBanner-box-bg02.png'} className={css['comboBanner_box_bg02']} />
      <img decoding="async" loading="lazy" src={preStaticUrl + '/img/home/comboBanner-box-bg03.png'} className={css['comboBanner_box_bg03']} />
      <img decoding="async" loading="lazy" src={preStaticUrl + '/img/home/comboBanner-box-light.png'} className={css['comboBanner_box_light']} />
      <img decoding="async" loading="lazy" src={preStaticUrl + '/img/home/comboBanner-box.png'} className={css['comboBanner_box']} />
    </div>
  )
}, isEqual)
export default ComboBannerBg02
