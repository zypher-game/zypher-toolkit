import { useEffect, useMemo, useState } from 'react'

import { TVLStakingSupportedChainId } from '../constants/activeConstants'
import { useActiveData } from './useActiveData'
import { useLeaderBoardCall } from './useDataCall'
export type IRankBoard = {
  nickname: string
  headImg: string
  fromNickname: string
  score: string
  rank: number
}
type IRecentUser = {
  nickname: string
  fromNickname: string
  headImg: string
  joinTime: number
}
export const useLeaderBoard = () => {
  const [chainIndex, setChainIndex] = useState(0)
  const [recentUser, setRecentUser] = useState<IRecentUser[]>([])
  const [rankBoard, setRankBoard] = useState<IRankBoard[]>([])
  const [my, setMy] = useState<IRankBoard>()
  const { getRecentUser, getRankBoard, getMyRankBoard } = useLeaderBoardCall()
  const chainIdLocal = useMemo(() => {
    return TVLStakingSupportedChainId[chainIndex]
  }, [chainIndex, JSON.stringify(TVLStakingSupportedChainId)])
  const { activeData } = useActiveData()
  const { id } = activeData
  console.log({ recentUser })
  useEffect(() => {
    const getData = async () => {
      try {
        const res_recentUser = await getRecentUser({ chainId: chainIdLocal })
        const res_rankBoard = await getRankBoard({ chainId: chainIdLocal })
        if (id) {
          const res_myRankBoard = await getMyRankBoard({ chainId: chainIdLocal, userId: id })
          console.log({ res_recentUser, res_rankBoard, res_myRankBoard })
          setMy(res_myRankBoard)
        }
        if (res_recentUser) {
          setRecentUser(res_recentUser.data ?? [])
        }
        if (res_rankBoard) {
          setRankBoard(res_rankBoard.data ?? [])
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
