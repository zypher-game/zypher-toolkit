import 'swiper/css'
import './swiper.pagination.styl'

import { LngNs, useCustomTranslation, useIsMd } from '@ui/src'
import { preStaticUrl } from '@ui/src'
import i18n from 'i18next'
import { isEqual } from 'lodash'
import React, { FC, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import ComboBanner from '../comboBannerItem/comboBanner'
import CRBannerItem from '../CRBannerItem/CRBannerItem'
import css from './bannerv4.module.stylus'

const BannerV4Widget: FC = memo(() => {
  const isMobile = true
  const isMd = useIsMd()
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language)
  const { t } = useCustomTranslation([LngNs.common])
  useEffect(() => {
    setCurrentLanguage(i18n.language)
  }, [t('language')])

  const onclikHandle = useCallback((link: string) => {
    window.open(link, '_blank')
  }, [])

  return (
    <div className={css.banner}>
      {isMd ? (
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
        >
          <SwiperSlide>
            <div className={css.headerSwiper}>
              <ComboBanner />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <CRBannerItem />
          </SwiperSlide>
        </Swiper>
      ) : (
        <>
          <div className={css.bannerfl}>
            <ComboBanner />
          </div>
          <div className={css.header}>
            <CRBannerItem />
          </div>
        </>
      )}
    </div>
  )
}, isEqual)
export default BannerV4Widget
