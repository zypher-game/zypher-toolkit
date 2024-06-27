import { preStaticUrl, useIsW768 } from '@ui/src'
import React, { memo } from 'react'

import { ThemeKey } from '../../ZeroGas'
import css from './SBTCard.module.styl'
const SBTCard = memo(({ className, themeKey }: { className: string; themeKey: ThemeKey }) => {
  const isW768 = useIsW768()
  return (
    <div className={className}>
      {isW768 ? (
        <>
          <div className={css.SBTSmallWrap}>
            <img decoding="async" loading="lazy" src={`${preStaticUrl}/img/zeroGas/SBT_m_bg.png`} alt="SBT" className={css.SBTSmallBg} />
            <img decoding="async" loading="lazy" src={`${preStaticUrl}/img/zeroGas/SBT_m.png`} alt="SBT" className={css.SBTSmall} />
          </div>
        </>
      ) : (
        <img decoding="async" loading="lazy" src={`${preStaticUrl}/img/zeroGas/SBT.png`} alt="SBT" className={css.SBT} />
      )}
      <img decoding="async" loading="lazy" src={`${preStaticUrl}/img/zeroGas/${themeKey}_logo_small.png`} alt="SBT" className={css.smallLogo} />
    </div>
  )
})
export default SBTCard
