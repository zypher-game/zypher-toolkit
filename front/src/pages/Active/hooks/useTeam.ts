import { divisorBigNumber, useActiveWeb3React, useRecoilValue, useSetRecoilState } from '@ui/src'
import { BigNumberJs } from '@ui/src'
import { ethers } from 'ethers'
import { useCallback, useEffect, useState } from 'react'

import { GlobalVar } from '@/constants/constants'
import { setErrorToast, setSuccessToast } from '@/utils/Error/setErrorToast'
import { getWeb3Sign } from '@/utils/getSign'

import { getPointAmount, pointSuccessDialogState, tvlPointDialogState, tvlStakingDialogState } from '../state/activeState'
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
export type IAvailableCode = {
  codeType: number // 0 normal 7 forever
  inviteCode: string
}
export type IGroupGoal = {
  percent: string
  total: string
  totalStr: string
  target: string
  targetStr: string
  need: string
  needStr: string
}
export const useTeam = () => {
  const { getData } = useGetData()
  const [availableCode, setAvailableCode] = useState<IAvailableCode[]>([])
  const { activeData, setActiveData } = useActiveData()
  const [teamMembers, setTeamMembers] = useState<ITeamMember[]>([])
  const [isLoadingSingle, setIsLoadingSingle] = useState<boolean>(false)
  const [isLoadingAll, setIsLoadingAll] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)

  const [groupGoal, setGroupGoal] = useState<IGroupGoal>({
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
  const { getTeam, getGroupScoreCardNum, setOpenCard } = useTeamCall()
  const { id } = activeData
  const setIsTvlPointModalOpen = useSetRecoilState(tvlPointDialogState)
  const setIsPointSuccessModalOpen = useSetRecoilState(pointSuccessDialogState)
  const tvlStakingDialog = useRecoilValue(tvlStakingDialogState)
  const setPointAmount = useSetRecoilState(getPointAmount)
  const getDataTeam = useCallback(async () => {
    if (id) {
      if (loading || teamMembers.length) {
        return
      }
      setLoading(true)
      // 获取邀请码
      const _availableCode = await getAvailableCode(account!, chainId)
      console.log({ _availableCode })
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
            stakingStr: new BigNumberJs(`${vd.staking}`).dividedBy(divisorBigNumber).toFormat(2)
          }))
        )
        // const staking = `${_team['userInfo']['staking']}`
        const airdropPoints = _team['userInfo']['points']
        const ranking = `${_team['userInfo']['rank']}`
        setActiveData(pre => ({
          // staking: staking,
          // stakingStr: new BigNumberJs(staking).toFormat(2),
          airdropPoints: airdropPoints,
          airdropPointsStr: new BigNumberJs(airdropPoints).toFormat(2),
          ranking: ranking,
          rankingStr: new BigNumberJs(ranking).toFormat(0),
          airdropPointsCardNumber: `${point['cardNum']}`
        }))
        // group
        const total = _team['groupGoal']['total']
        const target = _team['groupGoal']['target']

        const totalBig = new BigNumberJs(total)
        const targetBig = new BigNumberJs(target)
        const needBig = targetBig.minus(totalBig)

        const need = needBig.gte(0) ? needBig : new BigNumberJs('0')
        const totalStr = totalBig.dividedBy(divisorBigNumber).toFixed(2)
        const targetStr = targetBig.dividedBy(divisorBigNumber).toFixed(2)
        const percent = target === '0' ? '0' : totalBig.div(target).times(100).toFixed(0)
        setGroupGoal({
          percent: Number(percent) > 100 ? '100' : `${percent}`,
          total: total,
          totalStr: totalStr,
          target: target,
          targetStr: targetStr,
          need: need.toFixed(3),
          needStr: new BigNumberJs(need).dividedBy(divisorBigNumber).toFormat(2)
        })
      }
    }
  }, [id])
  useEffect(() => {
    getDataTeam()
  }, [id])
  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        getDataTeam()
      }, 2000)
    }
  }, [tvlStakingDialog])
  const openCard = useCallback(
    async (key: string) => {
      const isSingle = key !== 'all'
      try {
        if (account) {
          console.log(2)
          if (isSingle) {
            if (isLoadingSingle) {
              return
            }
            setIsLoadingSingle(true)
          } else {
            if (isLoadingAll) {
              return
            }
            setIsLoadingAll(true)
          }
          console.log(1)
          const hashedCardBytes = ethers.utils.hexConcat([account])
          let _signedStr
          try {
            _signedStr = await getWeb3Sign(hashedCardBytes, account, false)
          } catch (err) {
            setErrorToast(GlobalVar.dispatch, err)
            if (isSingle) {
              setIsLoadingSingle(false)
            } else {
              setIsLoadingAll(false)
            }
            return
          }
          if (typeof _signedStr === 'string') {
            const setOpenCard_res = await setOpenCard({
              userId: activeData.id,
              address: account,
              signature: _signedStr,
              isSingle: isSingle
            })
            console.log({ setOpenCard_res })
            if (setOpenCard_res) {
              await getData()
              await getDataTeam()
              setPointAmount(new BigNumberJs(setOpenCard_res.message).toFormat(2))
              setIsLoadingSingle(false)
              setIsLoadingAll(false)
              setIsPointSuccessModalOpen(true)
              setSuccessToast(GlobalVar.dispatch, { title: '', message: 'Open Card successful' })
              setIsTvlPointModalOpen(false)
            } else {
              throw new Error('Open Card Failed')
            }
          }
        }
      } catch (e) {
        if (isSingle) {
          setIsLoadingSingle(false)
        } else {
          setIsLoadingAll(false)
        }
        setErrorToast(GlobalVar.dispatch, e)
      }
    },
    [JSON.stringify(activeData), isLoadingSingle, isLoadingAll]
  )
  return {
    groupGoal,
    availableCode,
    teamMembers,
    activeData,
    openCard,
    isLoadingAll,
    isLoadingSingle,
    loading: loading && !teamMembers.length
  }
}
