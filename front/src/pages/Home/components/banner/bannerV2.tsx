import 'swiper/css'
import './swiper.pagination.styl'

import { isPro, LngNs, useCustomTranslation, useIsMd } from '@ui/src'
import { preStaticUrl } from '@ui/src'
import i18n from 'i18next'
import { isEqual } from 'lodash'
import React, { FC, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import css from './bannerv2.module.stylus'
const BannerV2Widget: FC = memo(() => {
  const isMobile = useIsMd()
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language)
  const { t } = useCustomTranslation([LngNs.common])
  useEffect(() => {
    setCurrentLanguage(i18n.language)
  }, [t('language')])
  const bannerData = useMemo(() => {
    return [
      {
        link: 'https://test.zypher.game/CryptoRumble/',
        alt: 'CR',
        imgPath: preStaticUrl + `/img/home/banner10.jpg`
      },
      {
        link: 'https://app.zypher.game/2048/',
        alt: 'z2048',
        imgPath: preStaticUrl + `/img/home/banner09.jpg`
      },
      {
        link: isPro() ? 'https://acequest.io/zAce/' : 'https://testnet.acequest.io/zAce/',
        alt: 'zAce',
        imgPath: preStaticUrl + `/img/home/banner11.jpg`
      },
      {
        link: 'https://app.zypher.game/2048/',
        alt: 'z2048',
        imgPath: preStaticUrl + `/img/home/banner12.jpg`
      }
    ]
  }, [])
  const onclikHandle = useCallback((link: string) => {
    window.open(link, '_blank')
  }, [])

  return (
    <>
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
        {bannerData.map((v, index) => (
          <SwiperSlide key={index}>
            <div className={css.headerSwiper} onClick={() => onclikHandle(v.link)}>
              <img src={v.imgPath} alt={v.imgPath} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}, isEqual)
export default BannerV2Widget
