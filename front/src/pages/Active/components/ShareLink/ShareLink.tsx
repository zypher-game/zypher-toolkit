import { ActivePixelButtonColor, IPixelProps, LoadingButton, preStaticUrl, SvgComponent, useActiveWeb3React, useRecoilValue } from '@ui/src'
import React, { memo, useCallback, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { GlobalVar } from '@/constants/constants'
import ShareComponent from '@/pages/invitation/components/shareComponent'
import { setErrorToast, setSuccessToast } from '@/utils/Error/setErrorToast'
import sleep from '@/utils/sleep'

import { airdropPathname, getAirdropPathname, preAirdropPathname } from '../../hooks/activeHooks'
import { useActiveData } from '../../hooks/useActiveData'
const ShareLink = memo(({ css, preWidth, nextWidth, pixel_styled }: { preWidth: string; nextWidth: string; css: any; pixel_styled: IPixelProps }) => {
  const { activeData } = useActiveData()
  const [loading, setLoading] = useState(false)
  const { account } = useActiveWeb3React()
  const navigate = useNavigate()
  const location = useLocation()
  const { height, pixel_height, small_pixel_height, backgroundColor, borderBottomColor, borderTopColor } = pixel_styled
  const twitterShare = useMemo(() => {
    if (account) {
      const title01 = '🔥 Get set for an exhilarating journey! 🙌 Join me at Zypher Games with my exclusive invitation link'
      const title02 = 'unlock mystery boxes and 🥕Gold Points! Let us start this thrilling adventure together! @Zypher_network'
      const myhashtag = 'web3game'
      const tweetText = `${title01} ${title02}`
      const encodedTweetText = encodeURIComponent(tweetText)
      return `https://twitter.com/intent/tweet?text=${encodedTweetText}&hashtags=${myhashtag}`
    }
    return ''
  }, [account])
  const verifyHandle = useCallback(async () => {
    setLoading(true)
    await sleep(2)
    setLoading(false)
    const isOk = Math.floor(Math.random() * 10) % 2 === 0
    if (isOk) {
      const arr = location.pathname.split('/')
      if (arr[1] !== airdropPathname.tvl) {
        navigate(`/${preAirdropPathname}/${airdropPathname.getAirdrop}/${getAirdropPathname.MoreActiveSuccess}`)
        return
      }
      setSuccessToast(GlobalVar.dispatch, 'Verify Success')
    } else {
      setErrorToast(GlobalVar.dispatch, 'Verify Failed')
    }
  }, [navigate])
  if (activeData.airdropPointsDetail.byTwitterMore) {
    return <></>
  }
  return (
    <div className={css.link}>
      <ActivePixelButtonColor
        className={css.twitter}
        onClick={twitterShare}
        width={preWidth}
        height={height}
        pixel_height={pixel_height}
        small_pixel_height={small_pixel_height}
        backgroundColor={backgroundColor}
        borderBottomColor={borderBottomColor}
        borderTopColor={borderTopColor}
      >
        <ShareComponent url={twitterShare}>
          <SvgComponent src={preStaticUrl + '/img/layout/twitter.svg'} className={css.twitterIcon} />
          <p>Tweet to get more Airdrop Points</p>
        </ShareComponent>
      </ActivePixelButtonColor>

      <ActivePixelButtonColor
        className={css.verify}
        onClick={verifyHandle}
        width={nextWidth}
        height={height}
        pixel_height={pixel_height}
        small_pixel_height={small_pixel_height}
        backgroundColor={backgroundColor}
        borderBottomColor={borderBottomColor}
        borderTopColor={borderTopColor}
      >
        <p>Verify</p>
        <LoadingButton isLoading={loading} />
      </ActivePixelButtonColor>
    </div>
  )
})
export default ShareLink
