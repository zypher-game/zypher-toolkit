import { isPro, preStaticUrl, request, useRecoilState } from '@ui/src'
import { useCallback, useEffect } from 'react'

import { gamesBannerState, IBanner } from '../state/GamesState'
export const useBanner = () => {
  const [banner, setBanner] = useRecoilState<IBanner[]>(gamesBannerState)
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
