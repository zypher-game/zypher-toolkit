import { useCustomTranslation } from '@UI/src/'
import { useIsMobile } from '@UI/src/'
import { LngNs } from '@UI/src/'
import React, { memo } from 'react'
import Marquee from 'react-fast-marquee'
import styled from 'styled-components'

import Icon from '@/assets/iconsLocal'

const Scroll = styled.div<{ gap?: number }>`
  text-align: center;
  white-space: nowrap;
  overflow-x: scroll;
  overflow-y: hidden;
  display: flex;
`

const ScrollItem = styled.div<{ isMobile: boolean; color?: string; gap?: number }>`
  padding: ${({ isMobile }) => (isMobile ? '4px 16px' : '10px 32px')};
  white-space: nowrap;
  font-size: 14px;
  display: flex;
  background-color: ${({ color }) => `rgba(${color}, 0.1)`};
  border-radius: 25px;
  margin-right: ${({ gap }) => gap + 'px' ?? '10px'};
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    color: ${({ color }) => `rgba(${color},1)`};
    font-size: ${({ isMobile }) => (isMobile ? '14px' : '20px')};
  }
`
const MIcon = styled(Icon)<{ isMobile: boolean; color: string }>`
  fill: ${({ color }) => color ?? 'none'};
  width: ${({ isMobile }) => (isMobile ? '20px' : '30px')};
  height: ${({ isMobile }) => (isMobile ? '20px' : '30px')};
  display: block;
  margin-right: ${({ isMobile }) => (isMobile ? '4px' : '10px')};
`

const MarqueeWidget = memo(() => {
  const isMobile = useIsMobile()
  const { t } = useCustomTranslation([LngNs.home])
  return (
    <Marquee gradient={false} pauseOnHover play={true}>
      <Scroll>
        <ScrollItem color="81, 156, 255" gap={32} isMobile={isMobile}>
          <MIcon name="twitter" color="#519CFF" isMobile={isMobile} />
          <a href="https://twitter.com/Zypher_Games" target="_blank" rel="noreferrer">
            {t('marquee_twitter')}
          </a>
        </ScrollItem>
        {/* <ScrollItem color="126, 232, 126" gap={32} isMobile={isMobile}>
          <MIcon name="parachute" color="#7EE87E" isMobile={isMobile} />
          <a href="https://medium.com/@ZypherGames/upcoming-announcement-44e69204adb1" target="_blank" rel="noreferrer">
            {t('marquee_medium')}
          </a>
        </ScrollItem> */}
        <ScrollItem color="111, 229, 255" gap={32} isMobile={isMobile}>
          <MIcon name="discord" color="#6FE5FF" isMobile={isMobile} />
          <a href="https://discord.com/invite/MKJZhS4p2T" target="_blank" rel="noreferrer">
            {t('marquee_discord')}
          </a>
        </ScrollItem>
      </Scroll>
    </Marquee>
  )
})
export default MarqueeWidget
