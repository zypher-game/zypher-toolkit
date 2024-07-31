import { isEqual } from 'lodash'
import React, { FC, memo, useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

import { GlobalVar } from '@/constants/constants'
import { useActiveData } from '@/pages/Active/hooks/useActiveData'
import { setSuccessToast } from '@/utils/Error/setErrorToast'

import { useTwitterForward } from '../../hooks/useDataCall'

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
  const { activeData } = useActiveData()
  const { twitterForward } = useTwitterForward()
  const handleVisibilityChange = useCallback(() => {
    if (!document.hidden) {
      if (isClick) {
        setSuccessToast(GlobalVar.dispatch, { title: '', message: 'Share Successful!' })
        setIsClick(false)
      }
    }
  }, [isClick, activeData.isTwitterPost])

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [handleVisibilityChange])
  console.log({ isTwitterPost: activeData.isTwitterPost })
  const shareOnTwitter = useCallback(() => {
    window.open(url)
    setIsClick(true)
    if (!activeData.isTwitterPost) {
      twitterForward({ userId: activeData.id })
    }
  }, [activeData.id, activeData.isTwitterPost])

  return (
    <ShareDiv id="share_button" onClick={shareOnTwitter}>
      {children}
    </ShareDiv>
  )
}, isEqual)

export default ShareComponent
