import { useActiveWeb3React } from '@ui/src'
import { useCallback, useEffect, useState } from 'react'

import BigNumberJs from '@/utils/BigNumberJs'

import { useActiveData } from './useActiveData'
import { useAvailableCode, useTeamCall } from './useDataCall'
import { useGetData } from './useInit'
export type ITeamMember = {
  headImg: string
  nickname: string
  staking: string
  role: string
}
export const useTeam = () => {
  const { getData } = useGetData()
  const [availableCode, setAvailableCode] = useState<string[]>([])
  const { activeData, setActiveData } = useActiveData()
  const [teamMembers, setTeamMembers] = useState<ITeamMember[]>([])
  const [groupGoal, setGroupGoal] = useState({
    percent: '0',
    total: '0',
    target: '0',
    need: '0'
  })
  const { account, chainId } = useActiveWeb3React()
  const { getAvailableCode } = useAvailableCode()
  const [loading, setLoading] = useState(false)
  const { getTeam, getGroupScoreCardNum, setOpenCard } = useTeamCall()
  const { id } = activeData
  const getDataTeam = useCallback(async () => {
    if (id) {
      if (loading || teamMembers.length) {
        return
      }
      setLoading(true)
      // 获取邀请码
      const _availableCode = await getAvailableCode(account!, chainId)
      if (_availableCode) {
        setAvailableCode(_availableCode)
      }
      // 获取队伍信息
      const _team = await getTeam(activeData.id, chainId)
      console.log({ _team })
      // 获取待领取小组积分卡片数量
      const point = await getGroupScoreCardNum(activeData.id)
      if (_availableCode) {
        setAvailableCode(_availableCode)
      }
      setLoading(false)

      if (_team.members) {
        setTeamMembers(_team.members)

        setActiveData(pre => ({
          ...pre,
          airdropPoints: _team['userInfo']['points'],
          ranking: _team['userInfo']['role'],
          airdropPointsCardNumber: point
        }))
        // group
        const total = _team['groupGoal']['total']
        const target = _team['groupGoal']['target']
        setGroupGoal({
          percent: target === '0' ? '0' : new BigNumberJs(total).div(target).times(100).toFixed(0),
          total: total,
          target: target,
          need: new BigNumberJs(target).minus(total).toFixed(3)
        })
      }
    }
  }, [id])
  useEffect(() => {
    getDataTeam()
  }, [getDataTeam])
  const openCard = useCallback(
    async (key: string) => {
      const isSingle = key === 'all'
      const setOpenCard_res = await setOpenCard(activeData.id, isSingle)
      console.log({ setOpenCard_res })
      if (setOpenCard_res) {
        getData()
      }
    },
    [JSON.stringify(activeData)]
  )
  return {
    groupGoal,
    availableCode,
    teamMembers,
    activeData,
    openCard
  }
}
