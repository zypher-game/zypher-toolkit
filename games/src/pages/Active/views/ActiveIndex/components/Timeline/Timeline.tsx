import { isEqual } from 'lodash'
import React, { memo } from 'react'

import { timelinePath } from '../../config/config'
import Title from '../comp/Title'
import css from './Timeline.module.styl'
interface IItem {
  process: string
  title: string
  details: string
  time: string
}
const list: IItem[] = [
  {
    process: 'Season 01',
    title: 'Staking on Linea',
    details: 'After the event starts on October 17, 2024, you can receive Airdrop points rewards by staking ETH, wstETH, ezETH, and STONE',
    time: 'Oct.17 2024 > Jan.16 2025'
  },
  {
    process: 'Event-1',
    title: 'Earn GP and 0 Gas SBT',
    details:
      'You can earn $GP rewards, game rewards, and airdrop points every week by staking in Season 1! Simultaneously obtain SBT and play games with 0 gas on Zytron Linea Layer 3!',
    time: 'Oct.17 2024 > Jan.16 2025'
  },
  {
    process: 'Event-2',
    title: 'Bet to earn airdrop in zAce',
    details:
      'the more bets you place in zAce, the more TVL airdrop points you will receive. You can receive dual rewards of TVL and ACE at the same time',
    time: 'Oct.22 2024 > Nov 4 2024'
  },
  {
    process: 'Event-3',
    title: 'Challenge z2048 to earn airdrop',
    details:
      'Completing 512, 1024, and 2048 can each earn once airdrop points. Tickets will also enter the prize pool and be distributed at the end of the event.',
    time: 'Nov.5 2024 > Nov.18 2024'
  },
  {
    process: 'Event-4',
    title: 'Crypto Rumble Heroic Epic',
    details: 'Obtain a blind box through the TVL event and mint a hero. Enter the Crypto Rumble game and defeat a BOSS to earn an airdrop point.',
    time: 'Nov.19 2024 > Dec.2 2024'
  },
  {
    process: 'Event-5',
    title: 'Elite Team Selection Competition',
    details: 'Teams with the highest staking amounts in the top 100 will receive additional airdrop points.',
    time: 'Dec.9 2024'
  },
  {
    process: 'Event-6',
    title: 'zBingo Festival',
    details:
      'During the event, players who complete 5 and 15 bingos will each receive an airdrop points. Players who complete one bingo will also receive a Zbox.',
    time: 'Dec.10 2024 > Dec.23 2024'
  },
  {
    process: 'Event-7',
    title: 'Christmas and New Year Airdrop',
    details: 'During Christmas and New Year, we will directly airdrop points to users who participate in staking.',
    time: 'Dec.24 2024 To Jan.6 2025'
  },
  {
    process: 'End of Season 01',
    title: 'Settlement and Redemption.',
    details:
      'You can confirm your airdrop points at the end of Season 1. Redeem your assets or continue staking them to receive GP rewards and gas-free gaming privileges with SBT',
    time: 'Feb.18 2025'
  }
]
const Index = 2
const Timeline = memo(() => {
  return (
    <div className={css.timeline}>
      <Title label="Timeline" />
      <img src={timelinePath + '/bg.jpg'} className={css.bg} />
      <img src={timelinePath + '/fl.png'} className={css.p_fl} />
      <img src={timelinePath + '/fr.png'} className={css.p_fr} />
      <div className={css.list_wrap}>
        <div className={css.list}>
          {list.slice(Math.max(0, Index - 2), Math.min(list.length, Index + 3)).map((v, index) => (
            <Item key={v.time} on={Index === index} item={v} />
          ))}
        </div>
      </div>
    </div>
  )
}, isEqual)

const Item = memo(({ item, on }: { item: IItem; on: boolean }) => {
  return (
    <div className={`${css.item} ${on ? css.on : ''}`}>
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
