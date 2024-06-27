import { preStaticUrl } from '@ui/src'
import React, { useEffect, useState } from 'react'

import css from './profileBox.module.stylus'

interface IProps {
  className?: boolean
}

export default (props: IProps): React.ReactElement | null => {
  return (
    <div className={css.profileBox}>
      <img decoding="async" loading="lazy" src={preStaticUrl + '/img/profile/card.png'} alt="" />
      <div className={css.content}>
        <div className={css.title}>{`What are the Genesis Blind Box？`}</div>
        <div className={css.text}>
          {`The Genesis Blind Box is Zypher Games' reward for early backers. Only the Beta version is available for free. After the official version is
        launched, Genesis Blind Box can issue ZG IP NFT. Only those who own NFT can participate in the official version of zBingo game and earn rewards at the same time.`}
        </div>
        <div className={css.title}>{`How to get the Genesis Blind Box？`}</div>
        <div className={css.text}>
          {`Players who participate in the zBingo game and win can get 1 Genesis Blind Box, and there is no limit to the amount that can be obtained from a wallet address.`}
          {` Start the Game!`}
        </div>
        <div className={css.title}>{`What are the ZG IP？`}</div>
        <div className={css.text}>
          {`ZG IP is the cute pet of Zypher Games, guarding the game park and giving it infinite vitality. ZG IPs (NFT), there are 6 rarities. They are
        Common, Uncommon, Unique, Rare, Epic, Legendary. The equity rewards corresponding to different levels are also different. Multiple NFTs can be
        upgraded. The wallet address account holding NFT will get the corresponding rights and interests. For more information, please pay attention
        to the official website Twitter. Stay tuned!`}
        </div>
      </div>
    </div>
  )
}
