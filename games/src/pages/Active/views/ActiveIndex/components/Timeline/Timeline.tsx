import { isEqual } from 'lodash'
import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { timelinePath } from '../../config/config'
import Bg from '../comp/Bg'
import Title from '../comp/Title'
import css from './Timeline.module.styl'
interface IItem {
  process: string
  title: string
  details: string
  time: string
  value: number
}
const list: IItem[] = [
  {
    process: 'Season 01',
    title: 'Staking on Linea',
    details: 'After the event starts on October 17, 2024, you can receive Reward points rewards by staking ETH, wstETH, ezETH, and STONE',
    time: 'Oct.17 2024 > Jan.16 2025',
    value: 1
  },
  {
    process: 'Event-1',
    title: 'Earn GP and 0 Gas SBT',
    details:
      'You can earn $GP rewards, game rewards, and reward points every week by staking in Season 1! Simultaneously obtain SBT and play games with 0 gas on Zytron Linea Layer 3!',
    time: 'Oct.17 2024 > Jan.16 2025',
    value: 2
  },
  {
    process: 'Event-2',
    title: 'Bet to earn reward in zAce',
    details:
      'the more bets you place in zAce, the more TVL reward points you will receive. You can receive dual rewards of TVL and ACE at the same time',
    time: 'Oct.29 2024 > Nov.11 2024',
    value: 3
  },
  {
    process: 'Event-3',
    title: 'Challenge z2048 to earn reward',
    details:
      'Completing 512, 1024, and 2048 can each earn once reward points. Tickets will also enter the prize pool and be distributed at the end of the event.',
    time: 'Nov.12 2024 > Nov.25 2024',
    value: 4
  },
  {
    process: 'Event-4',
    title: 'zBingo Festival',
    details:
      'During the event, players who complete 5 and 15 bingos will each receive an reward points. Players who complete one bingo will also receive a Zbox.',
    time: 'Nov.26 2024 > Dec.9 2024',
    value: 5
  },
  {
    process: 'Event-5',
    title: 'Crypto Rumble Heroic Epic',
    details: 'Obtain a blind box through the TVL event and mint a hero. Enter the Crypto Rumble game and defeat a BOSS to earn an reward point.',
    time: 'Dec.10 2024 > Dec.23 2024',
    value: 6
  },

  // {
  //   process: 'Event-6',
  //   title: 'Elite Team Selection Competition',
  //   details: 'Teams with the highest staking amounts in the top 100 will receive additional reward points.',
  //   time: 'Dec.10 2024 > Dec.23 2024',
  //   value: 6
  // },

  {
    process: 'Event-6',
    title: 'Christmas and New Year Reward',
    details: 'During Christmas and New Year, we will directly reward points to users who participate in staking.',
    time: 'Dec.24 2024 To Jan.6 2025',
    value: 7
  },
  {
    process: 'End of Season 01',
    title: 'Settlement and Redemption.',
    details:
      'You can confirm your reward points at the end of Season 1. Redeem your assets or continue staking them to receive GP rewards and gas-free gaming privileges with SBT',
    time: 'Feb.18 2025',
    value: 8
  }
]
type Swiper = /*unresolved*/ any
const Timeline = memo(() => {
  const [currentIndex, setCurrentIndex] = useState(3)
  const swiperRef = useRef<Swiper | null>(null)

  const handleSlideChange = useCallback((swiper: any) => {
    setCurrentIndex(swiper.realIndex)
  }, [])

  const handleSlideClick = useCallback(
    (event: any, index: number) => {
      event.stopPropagation()
      setCurrentIndex(index - 2)
      if (swiperRef.current) {
        const loopedIndex = index - 2 + swiperRef.current.loopedSlides
        swiperRef.current.slideTo(loopedIndex)
      }
    },
    [currentIndex]
  )
  return (
    <div className={css.timeline}>
      <Title label="Timeline" />
      <div className={css.bg}>
        <Bg src={timelinePath + '/bg.jpg'} />
      </div>
      {/* <img src={timelinePath + '/fl.png'} className={css.p_fl} />
      <img src={timelinePath + '/fr.png'} className={css.p_fr} /> */}
      <div className={css.list_wrap}>
        <Swiper
          onSwiper={swiper => (swiperRef.current = swiper)}
          loop={true}
          slidesPerView={5}
          spaceBetween={80}
          centeredSlides={true}
          navigation={true}
          initialSlide={currentIndex}
          onSlideChange={handleSlideChange}
          className={css.swiper}
          modules={[Autoplay, Pagination]}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
        >
          {list.map((item, index) => (
            <SwiperSlide key={item.time} className={`${css.swiper_slide} ${currentIndex === index ? css.on : ''}`}>
              <Item on={currentIndex === index} item={item} onClick={handleSlideClick} />
            </SwiperSlide>
          ))}
        </Swiper>
        {/* </div> */}
      </div>
    </div>
  )
}, isEqual)

const Item = memo(({ item, on, onClick }: { item: IItem; on: boolean; onClick: any }) => {
  return (
    <div className={`${css.item} ${on ? css.on : ''}`} onClick={e => onClick(e, item.value)}>
      <img src={timelinePath + '/item_bg.png'} className={css.item_bg} />
      <div className={css.item_inner}>
        <div className={css.top}>
          <div className={css.fl}>
            <img src={timelinePath + '/horn.png'} className={css.icon} />
          </div>
          <div className={css.fr}>
            <h3>{item.process}</h3>
            <h2>{item.title}</h2>
            <img src={timelinePath + '/line.png'} />
            <p>{item.details}</p>
            <img src={timelinePath + '/line.png'} className={css.lineBottom} />
          </div>
        </div>
        <div className={`${css.top} ${css.bottom}`}>
          <div className={css.fl}>
            <img src={timelinePath + '/horn.png'} className={css.icon} />
          </div>
          <div className={css.fr}>
            <h4>{item.time}</h4>
          </div>
        </div>
      </div>
    </div>
  )
  // horn.png
  // item_bg.png
  // line.png
  // notice.png
}, isEqual)
export default Timeline
