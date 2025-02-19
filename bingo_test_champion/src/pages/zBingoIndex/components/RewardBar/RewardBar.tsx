import { preStaticUrl } from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo, useCallback } from 'react'

import css from './RewardBar.module.stylus'
const RewardBar = memo(() => {
  const twitterShare = useCallback(() => {
    const title = `💥Welcome to join the zBingo, is a ZK-powered game where you will compete fairly and transparently with players worldwide. Invite your friends and earn massive airdrop points!🚀

⏭️Play zBingo: https://zypher.game/bingo/

✨Join the Zypher Network TG Group: https://t.me/zyphernetwork
`
    // @Zypher_network #web3game #GameFi

    const encodedTweetText = encodeURIComponent(title)
    window.open(`https://twitter.com/intent/tweet?text=${encodedTweetText}`)
  }, [])
  return (
    <div className={css.rewardBar}>
      <img src={preStaticUrl + `/img/bingo/reward.svg`} alt="" onClick={twitterShare} />
    </div>
  )
}, isEqual)
export default RewardBar
