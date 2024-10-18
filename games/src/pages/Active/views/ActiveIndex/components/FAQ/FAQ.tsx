import { ActivePixelButton, ActivePixelButtonColor, ActivePixelCard, PixelBorderCard } from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo, useCallback, useState } from 'react'

import { faqPath } from '../../config/config'
import Title from '../comp/Title'
import css from './FAQ.module.styl'
interface IItem {
  title: string
  label: string
}
const list: IItem[] = [
  {
    title: 'What is Treasure Ark?',
    label: `<p>Treasure Ark is a fun and rewarding staking and gaming tournament hosted by Zypher Network, available on Linea (re-staking) and Zytron Layer 3 on Linea (games). It features multiple events where participants can team up to stake assets, play games, and earn rewards such as $GP tokens, airdrop points, Soulbound Tokens (SBTs), and NFTs. For more information, please join our <a href='https://t.me/zyphernetwork'>community</a>.</p>`
  },
  {
    title: 'When does Treasure Ark start and end?',
    label: `<p><a href='https://ark.zypher.network/treasureark'>The campaign</a> starts on October 24, 2024, and ends on February 18, 2025. It includes different events spread across multiple dates, each offering unique rewards and challenges.</p>`
  },
  {
    title: 'How can I participate in Treasure Ark?',
    label: `<p>To participate, you can stake eligible assets (e.g., ETH, wstETH, ezETH, STONE) on ark.zypher.network to earn 6x rewards and gas redemption SBT. You can also join various gaming events like zAce, Crypto Rumble, and z2048 for free while earning extra rewards.</p>`
  },
  {
    title: 'What rewards can I earn during the campaign?',
    label: `<p>Participants can earn a variety of rewards, including:
<i><em></em>Base Yield: Fixed 4% yield on staked ETH</i>
<i><em></em>Double Happiness: Linea LRT (LXP) rewards</i>
<i><em></em>Triple Happiness: Additional LXP rewards from Zypher</i>
<i><em></em>Quadra Happiness: Risk-free $GP rewards</i>
<i><em></em>Penta Happiness: Zypher Points for ranking and airdrops</i>
<i><em></em>Hexa Happiness: Extra revenue from issuing games</i>
    </p>`
  },
  {
    title: 'What assets can I stake in Treasure Ark?',
    label: `<p>You can stake ETH, wstETH, ezETH, and STONE tokens. Additional eligible assets may be added during the campaign, so stay updated on the latest announcements.</p>`
  },
  {
    title: 'What are Soulbound Tokens (SBTs), and how do they work?',
    label: `<p>Zypher’s Soulbound Tokens (SBTs) are non-transferable tokens that grant zero-gas privileges on the Zytron Layer 3 network. Players can use SBTs to participate in gas-free gaming and enjoy a seamless experience.</p>`
  },
  {
    title: 'What happens at the end of Season 1?',
    label: `<p>At the end of Season 1 (February 18, 2025), all airdrop points will be locked, and participants can redeem their staked tokens or choose to continue staking for additional $GP rewards and gas-free gaming privileges.</p>`
  }
]
const FAQ = memo(() => {
  const [choseIndex, setChoseIndex] = useState(0)
  const clickHandle = useCallback((index: number) => {
    setChoseIndex(index)
  }, [])
  const toPath = useCallback(() => {
    window.open('https://wiki.zypher.network/campaign-treasure-ark/treasure-ark-is-here/frequently-asked-questions', '_blank')
  }, [])
  return (
    <div className={css.faq}>
      <Title label="FAQ" />
      <div className={css.faq_inner}>
        <div className={css.fl}>
          {list.map((v, index) => (
            <Item key={v.title} item={v} choseIndex={choseIndex} index={index} onClick={() => clickHandle(index)} />
          ))}
        </div>
        <div className={css.fr}>
          <ActivePixelButtonColor
            themeType="brightBlue"
            className={`${css.link_btn}`}
            width={'180px'}
            height={'60px'}
            pixel_height={4}
            onClick={toPath}
          >
            <p>{'More >'}</p>
          </ActivePixelButtonColor>
          <img src={faqPath + '/img.png'} />
        </div>
      </div>
    </div>
  )
}, isEqual)
const Item = memo(({ item, choseIndex, index, onClick }: { item: IItem; choseIndex: number; index: number; onClick: any }) => {
  return (
    <ActivePixelCard className={css.item} pixel_height={4} backgroundColor="#1D263B">
      <div className={css.col1}>
        <img src={faqPath + '/qa.png'} />
      </div>
      <div className={`${css.col2} ${choseIndex === index ? css.col2_on : ''}`}>
        <h2>{item.title}</h2>
        {choseIndex === index ? <div className={css.item_text} dangerouslySetInnerHTML={{ __html: item.label }} /> : null}
      </div>
      {choseIndex === index ? (
        <div className={css.btn} />
      ) : (
        <ActivePixelButton backgroundColor="#1D263B" pixel_height={4} className={css.btn} onClick={onClick}>
          <div className={css.pic} />
          {/* <img src={faqPath + '/arr_white.png'} /> */}
        </ActivePixelButton>
      )}
    </ActivePixelCard>
  )
}, isEqual)
export default FAQ
