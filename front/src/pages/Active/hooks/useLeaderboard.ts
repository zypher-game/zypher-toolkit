import { useEffect, useState } from 'react'

import { calculateTimeAgo } from '@/utils/calculateTimeAgo'

import { useActiveData } from './useActiveData'
import { useChainIndex } from './useChainIndex'
import { useLeaderBoardCall } from './useDataCall'
export type IRankBoard = {
  nickname: string
  headImg: string
  fromNickname: string
  score: string
  scoreStr: string
  rank: number
}
export type IRecentUser = {
  nickname: string
  fromNickname: string
  headImg: string
  joinTime: number
  joinTimeStr: number
}
export const useLeaderBoard = () => {
  const [recentUser, setRecentUser] = useState<IRecentUser[]>([])
  const [rankBoard, setRankBoard] = useState<IRankBoard[]>([])
  const [my, setMy] = useState<IRankBoard>()
  const { getRecentUser, getRankBoard, getMyRankBoard } = useLeaderBoardCall()
  const { chainIndex, setChainIndex, chainIdLocal } = useChainIndex()
  const { activeData } = useActiveData()
  const { id } = activeData
  useEffect(() => {
    const getData = async () => {
      try {
        const res_recentUser = await getRecentUser({ chainId: chainIdLocal })
        const res_rankBoard = await getRankBoard({ chainId: chainIdLocal })
        if (id) {
          const res_myRankBoard = await getMyRankBoard({ chainId: chainIdLocal, userId: id })
          setMy(res_myRankBoard)
        }
        if (res_recentUser) {
          setRecentUser(
            res_recentUser.data.map((v: any) => ({
              ...v,
              joinTimeStr: calculateTimeAgo(v['joinTime'])
            })) ?? []
          )
        }
        if (res_rankBoard) {
          setRankBoard(res_rankBoard ?? [])
        }
      } catch (e) {
        console.log('useLeaderBoard err:', e)
      }
    }
    getData()
  }, [chainIdLocal, id])
  return {
    chainIndex,
    setChainIndex,
    recentUser,
    rankBoard,
    my
  }
}
