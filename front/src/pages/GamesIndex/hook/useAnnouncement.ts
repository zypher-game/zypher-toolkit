import { preStaticUrl, request, useRecoilState, useRecoilValue, useSetRecoilState } from '@ui/src'
import { useCallback, useEffect, useState } from 'react'

import { announcementDialogState, announcementTimeState } from '../state/GamesState'

export type IAnnouncement = {
  title: string
  content: string
  link?: string
  time: number
}
export const useAnnouncement = () => {
  const [announcementTime, setAnnouncementTime] = useRecoilState<[boolean, number]>(announcementTimeState)
  const isModalOpen = useRecoilValue(announcementDialogState)
  const [announcement, setAnnouncement] = useState<IAnnouncement[]>([])
  const getAnnouncement = useCallback(async () => {
    const announcement_res = await request(`${preStaticUrl}/json/announcement/announcement.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    setAnnouncement(announcement_res.data)
    const last = announcement_res.data.sort((a: any, b: any) => b.time - a.time)[0]
    setAnnouncementTime(pre => [announcementTime[1] !== last.time, pre[1]])
  }, [])
  useEffect(() => {
    if (isModalOpen) {
      const last = announcement.sort((a, b) => b.time - a.time)[0]
      setAnnouncementTime([false, last.time])
    }
  }, [isModalOpen])
  useEffect(() => {
    getAnnouncement()
  }, [])
  return {
    announcement
  }
}
