import 'swiper/css'
import './swiper.pagination.styl'

import { LngNs, useCustomTranslation, useIsMd } from '@ui/src'
import { preStaticUrl } from '@ui/src'
import i18n from 'i18next'
import { isEqual } from 'lodash'
import React, { FC, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import CRBannerItem from '../CRBannerItem/CRBannerItem'
import css from './bannerv3.module.stylus'

const BannerV3Widget: FC = memo(() => {
  const isMobile = true
  const isMd = useIsMd()
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language)
  const { t } = useCustomTranslation([LngNs.common])
  useEffect(() => {
    setCurrentLanguage(i18n.language)
  }, [t('language')])
  const bannerData = useMemo(() => {
    return [
      {
        link: 'https://app.zypher.game/2048/',
        alt: 'z2048',
        imgPath: preStaticUrl + `/img/home/banner09.jpg`
      }
    ]
  }, [])
  const onclikHandle = useCallback((link: string) => {
    window.open(link, '_blank')
  }, [])

  return (
    <div className={css.banner}>
      {isMd ? null : (
        <div className={css.bannerfl}>
          <CRBannerItem />
        </div>
      )}
      <Swiper
        direction="horizontal"
        loop={true}
        slidesPerView={isMobile ? 1 : 2}
        spaceBetween={30}
        centeredSlides={isMobile ? true : false}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false
        }}
        navigation={isMobile ? false : true}
        pagination={{
          clickable: true
        }}
        modules={[Autoplay, Pagination]}
        className={css.header}
      >
        {(isMd ? [undefined, ...bannerData] : bannerData).map((v, index) => (
          <SwiperSlide key={index}>
            {isMd && index === 0 ? (
              <div className={css.headerSwiper}>
                <CRBannerItem />
              </div>
            ) : v ? (
              <div className={css.headerSwiper} onClick={() => onclikHandle(v.link)}>
                <img decoding="async" loading="lazy" src={v.imgPath} alt={v.imgPath} className={css.bannerImg} />
              </div>
            ) : null}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}, isEqual)
export default BannerV3Widget
