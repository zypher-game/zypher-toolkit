import { divisorBigNumber, useActiveWeb3React } from '@ui/src'
import { BigNumberJs } from '@ui/src'
import { useCallback, useEffect, useState } from 'react'

import { useActiveData } from './useActiveData'
import { useGetData } from './useActiveInit'
import { useAvailableCode, useTeamCall } from './useDataCall'
export type ITeamMember = {
  headImg: string
  nickname: string
  staking: string
  stakingStr: string
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
    totalStr: '0',
    target: '0',
    targetStr: '0',
    need: '0',
    needStr: '0'
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
      // 获取待领取小组积分卡片数量
      const point = await getGroupScoreCardNum(activeData.id)
      if (_availableCode) {
        setAvailableCode(_availableCode)
      }
      setLoading(false)

      if (_team.members) {
        setTeamMembers(
          _team.members.map((vd: any) => ({
            headImg: vd.headImg,
            nickname: vd.nickname,
            role: vd.role,
            staking: vd.staking,
            stakingStr: new BigNumberJs(`${vd.staking}`).dividedBy(divisorBigNumber).toFixed(2)
          }))
        )
        setActiveData(pre => ({
          staking: `${_team['userInfo']['staking']}`,
          stakingStr: new BigNumberJs(`${_team['userInfo']['staking']}`).dividedBy(divisorBigNumber).toFixed(2),
          airdropPoints: _team['userInfo']['points'],
          ranking: `${_team['userInfo']['rank']}`,
          airdropPointsCardNumber: point['cardNum']
        }))
        // group
        const total = _team['groupGoal']['total']
        const target = _team['groupGoal']['target']

        const totalBig = new BigNumberJs(total)
        const targetBig = new BigNumberJs(target)
        const need = totalBig.minus(targetBig).abs().toFixed(3)
        setGroupGoal({
          percent: target === '0' ? '0' : totalBig.div(target).times(100).toFixed(0),
          total: total,
          totalStr: totalBig.dividedBy(divisorBigNumber).toFixed(2),
          target: target,
          targetStr: targetBig.dividedBy(divisorBigNumber).toFixed(2),
          need: need,
          needStr: new BigNumberJs(need).dividedBy(divisorBigNumber).toFixed(2)
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
