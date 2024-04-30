import { isPro, preStaticUrl, request, useRecoilState } from '@UI/src'
import { useCallback, useEffect } from 'react'

import { gamesAnnouncementState, IAnnouncement } from '../state/GamesState'
export const useAnnouncement = () => {
  const [banner, setAnnouncement] = useRecoilState<IAnnouncement[]>(gamesAnnouncementState)
  const getAnnouncement = useCallback(async () => {
    const banner_res = await request(`${preStaticUrl}/json/announcement/announcement.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    setAnnouncement(banner_res.data)
  }, [])
  useEffect(() => {
    getAnnouncement()
  }, [])
  return {
    banner
  }
}
