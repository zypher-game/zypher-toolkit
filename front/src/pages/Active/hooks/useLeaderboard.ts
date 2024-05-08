import { useEffect, useState } from 'react'

import { useRecentUser } from './useDataCall'
type IRecentUser = {
  nickname: string
  fromNickname: string
  headImg: string
  joinTime: number
}
export const useLeaderboard = () => {
  const [recentUser, setRecentUser] = useState<IRecentUser[]>([])
  const { getRecentUser } = useRecentUser()
  useEffect(() => {
    const getData = async () => {
      const res = await getRecentUser()
      if (res) {
        setRecentUser(res)
      }
    }
    getData()
  }, [])
  return {
    recentUser
  }
}
