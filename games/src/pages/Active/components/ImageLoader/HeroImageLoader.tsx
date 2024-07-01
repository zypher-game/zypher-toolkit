import { ITvlHero, preStaticUrl, SvgComponent } from '@ui/src'
import React, { memo, useState } from 'react'

import css from './HeroImageLoader.module.styl'
import ImageLoader from './ImageLoader'
interface IHeroImageLoader {
  heroKey: ITvlHero
  level: '1' | '2' | '3'
  className?: string
}
const HeroImageLoader: React.FC<IHeroImageLoader> = memo(({ heroKey, level, className }: IHeroImageLoader) => {
  const [showBg, setShowBg] = useState(false)
  return (
    <div className={`${css.hero} ${className ?? ''}`}>
      <ImageLoader
        className={css.hero_big}
        src={preStaticUrl + '/img/tvl/hero/' + heroKey + '_v' + level + '.png'}
        alt={heroKey}
        showMotion={true}
        cb={() => {
          if (!showBg) {
            setShowBg(true)
          }
        }}
      />
      <SvgComponent className={css.hero_big_bg} src={preStaticUrl + '/img/tvl/hero/' + heroKey + '_v' + level + '_bg.svg'} alt={heroKey} />
    </div>
  )
})
export default HeroImageLoader
