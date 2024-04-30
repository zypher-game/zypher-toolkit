import { preStaticUrl, request, useRecoilState, useRecoilValue, useSetRecoilState } from '@UI/src'
import { useCallback, useEffect, useState } from 'react'

import { announcementDialogState, announcementTimeState } from '../state/GamesState'

export type IAnnouncement = {
  title: string
  content: string
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
  }, [])
  useEffect(() => {
    if (announcement && announcement.length) {
      const last = announcement.sort((a, b) => b.time - a.time)[0]
      console.log({ last })
      setAnnouncementTime([announcementTime[1] !== last.time, last.time])
    }
  }, [JSON.stringify(announcement)])
  useEffect(() => {
    if (isModalOpen) {
      setAnnouncementTime(pre => [false, pre[1]])
    }
  }, [isModalOpen])
  useEffect(() => {
    getAnnouncement()
  }, [])
  return {
    announcement
  }
}
