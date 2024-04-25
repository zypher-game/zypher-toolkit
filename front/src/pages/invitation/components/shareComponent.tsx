import { message } from 'antd'
import { isEqual } from 'lodash'
import React, { FC, memo, useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

interface IProps {
  children: React.ReactNode
  url: string
}

const ShareDiv = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`

const ShareComponent: FC<IProps> = memo(({ children, url }: IProps) => {
  const [isClick, setIsClick] = useState(false)
  // useEffect(() => {
  //   const loadTwitterSDK = () => {
  //     return new Promise((resolve, reject) => {
  //       const script = document.createElement('script')
  //       script.src = 'https://platform.twitter.com/widgets.js'
  //       script.async = true
  //       script.onload = resolve
  //       script.onerror = reject
  //       document.body.appendChild(script)
  //     })
  //   }

  //   const bindTwitterEvents = () => {
  //     return new Promise<void>(resolve => {
  //       window.twttr.ready(twttr => {
  //         // console.log(1111, twttr)
  //         // Now bind our custom intent events
  //         twttr.events.bind('click', event => clickEventToAnalytics(event))
  //         twttr.events.bind('tweet', event => tweetIntentToAnalytics(event))
  //         twttr.events.bind('retweet', event => retweetIntentToAnalytics(event))
  //         twttr.events.bind('like', event => likeIntentToAnalytics(event))
  //         twttr.events.bind('follow', event => followIntentToAnalytics(event))

  //         resolve()
  //       })
  //     })
  //   }

  //   const loadAndBindTwitterSDK = async () => {
  //     try {
  //       await loadTwitterSDK()
  //       await bindTwitterEvents()
  //       // console.log('Twitter SDK loaded and events bound successfully')
  //     } catch (error) {
  //       console.error('Error loading Twitter SDK or binding events:', error)
  //     }
  //   }

  //   loadAndBindTwitterSDK()
  // }, [])

  // // Define our custom event handlers
  // const clickEventToAnalytics = intentEvent => {
  //   // console.log('clickEventToAnalytics')
  // }

  // const tweetIntentToAnalytics = intentEvent => {
  //   // console.log('tweetIntentToAnalytics')
  //   if (!intentEvent) {
  //     return
  //   }
  //   const sharedUrl = intentEvent.data.url
  //   if (sharedUrl === window.location.origin) {
  //     // console.log(sharedUrl, 'User shared the current page')
  //     message.success('Share Successful!')
  //   } else {
  //   }
  // }

  // const likeIntentToAnalytics = intentEvent => {
  //   // console.log('likeIntentToAnalytics')
  //   tweetIntentToAnalytics(intentEvent)
  // }

  // const retweetIntentToAnalytics = intentEvent => {
  //   // console.log('retweetIntentToAnalytics')
  // }

  // const followIntentToAnalytics = intentEvent => {
  //   // console.log('followIntentToAnalytics')
  //   if (!intentEvent) {
  //     return
  //   }
  // }

  const handleVisibilityChange = useCallback(() => {
    if (!document.hidden) {
      // console.log('User returned to the page')
      if (isClick) {
        message.success({
          content: 'Share Successful!',
          className: 'customMessage',
          style: {
            marginTop: '50vh'
          }
        })
        setIsClick(false)
      }
    }
  }, [isClick])

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [handleVisibilityChange])

  const shareOnTwitter = useCallback(() => {
    // // 触发 Twitter Web Intent 事件
    // window.twttr.ready(function (twttr) {
    //   twttr.events.trigger('click', { region: 'share_button' })
    // })
    window.open(url)
    setIsClick(true)
  }, [])

  return (
    <ShareDiv id="share_button" onClick={shareOnTwitter}>
      {children}
    </ShareDiv>
  )
}, isEqual)

export default ShareComponent
