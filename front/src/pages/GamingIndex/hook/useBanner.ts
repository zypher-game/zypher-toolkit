import { isPro, preStaticUrl, request, useRecoilState } from '@UI/src'
import { useCallback, useEffect } from 'react'

import { gamingBannerState, IBanner } from '../state/GamingState'
export const useBanner = () => {
  const [banner, setBanner] = useRecoilState<IBanner[]>(gamingBannerState)
  const getBanner = useCallback(async () => {
    const banner_res = await request(`${preStaticUrl}/json/banner/banner_${isPro() ? 'pro' : 'dev'}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    setBanner(banner_res.data)
  }, [])
  useEffect(() => {
    getBanner()
  }, [])
  return {
    banner
  }
}
