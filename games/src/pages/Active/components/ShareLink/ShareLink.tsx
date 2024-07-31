import { ActivePixelButtonColor, IPixelButtonTheme, preStaticUrl, SvgComponent, useActiveWeb3React } from '@ui/src'
import React, { memo, useMemo } from 'react'

import { useActiveData } from '../../hooks/useActiveData'
import ShareComponent from '../shareComponent/shareComponent'
const ShareLink = memo(({ css, preWidth, pixel_styled }: { preWidth: string; css: any; pixel_styled: IPixelButtonTheme }) => {
  const { activeData } = useActiveData()
  const { account } = useActiveWeb3React()
  const { height, pixel_height, themeType } = pixel_styled
  const twitterShare = useMemo(() => {
    if (account) {
      const title01 =
        '🔥 Get set for an exhilarating journey! 🙌 Join me at Zypher Games with my exclusive invitation link unlock  Airdrop points and LXP and other rewards!! Let us start this thrilling adventure together! @Zypher_network'
      const myhashtag = 'web3game'
      const link = 'https://zypher.game/'
      const tweetText = `${link}${title01}`
      const encodedTweetText = encodeURIComponent(tweetText)
      return `https://twitter.com/intent/tweet?text=${encodedTweetText}&hashtags=${myhashtag}`
    }
    return ''
  }, [account])
  if (activeData.airdropPointsDetail.byTwitterMore || activeData.isTwitterPost) {
    return <></>
  }
  return (
    <div className={css.link}>
      <ActivePixelButtonColor
        className={css.twitter}
        // onClick={twitterShare}
        width={preWidth}
        height={height}
        pixel_height={pixel_height}
        themeType={themeType}
      >
        <ShareComponent url={twitterShare}>
          <SvgComponent src={preStaticUrl + '/img/layout/twitter.svg'} className={css.twitterIcon} />
          <p>Tweet to get more Airdrop Points</p>
          <SvgComponent src={`${preStaticUrl}/img/icon/pixel_link.svg`} className={css.linkIcon} />
        </ShareComponent>
      </ActivePixelButtonColor>
    </div>
  )
})
export default ShareLink
