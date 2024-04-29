import 'swiper/css'
import './swiper.pagination.styl'
import './swiper.navigation.styl'

import { ActivePixelCard, PixelCube2, PixelCube5, useIsMd } from '@UI/src/'
import { isEqual } from 'lodash'
import React, { FC, memo, useCallback } from 'react'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { useBanner } from '@/pages/GamesIndex/hook/useBanner'
import { IBanner } from '@/pages/GamesIndex/state/GamesState'

import css from './Banner.module.styl'

const Banner: FC = memo(() => {
  const isMobile = useIsMd()
  const { banner } = useBanner()

  return (
    <>
      <Swiper
        direction="horizontal"
        loop={true}
        slidesPerView={isMobile ? 1 : 2}
        spaceBetween={30}
        centeredSlides={isMobile ? true : false}
        autoplay={{
          delay: 30003000,
          disableOnInteraction: false
        }}
        navigation={isMobile ? false : true}
        pagination={{
          el: '.games_swap',
          clickable: true
        }}
        modules={[Autoplay, Pagination]}
        className={css.header}
      >
        {banner.map((v, index) => (
          <SwiperSlide key={index}>
            <BannerItem v={v}>
              <img src={v.imgPath} alt={v.alt} />
            </BannerItem>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={css.inner}>
        <ActivePixelCard
          className={css.games_swap_wrap}
          width={banner.length * (6 + 2) + 20 + 'px'}
          pixel_height={2}
          backgroundColor="rgba(0, 0,0,0.3)"
          height="16px"
        >
          <div className="games_swap" />
        </ActivePixelCard>
      </div>
    </>
  )
}, isEqual)
const BannerItem = memo(({ children, v }: { v: IBanner; children: React.ReactNode }) => {
  const onClickHandle = useCallback((link: string) => {
    window.open(link, '_blank')
  }, [])

  return (
    <PixelCube5 className={css.headerSwiper} onClick={() => onClickHandle(v.link)} pixel_height={2} backgroundColor="#000000" borderColor="#000000">
      <PixelCube2
        className={css.headerSwiperInner}
        onClick={() => onClickHandle(v.link)}
        pixel_height={4}
        backgroundColor="#15161F"
        borderColor="#fff"
      >
        <div className={css.cube_top_left} />
        <div className={css.cube_top_right} />
        {children}
        <div className={css.cube_bottom_left} />
        <div className={css.cube_bottom_right} />
      </PixelCube2>
    </PixelCube5>
  )
})
export default Banner
