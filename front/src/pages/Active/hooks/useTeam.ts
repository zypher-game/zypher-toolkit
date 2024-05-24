import { divisorBigNumber, useActiveWeb3React, useRecoilValue, useSetRecoilState } from '@ui/src'
import { BigNumberJs } from '@ui/src'
import { ethers } from 'ethers'
import { useCallback, useEffect, useState } from 'react'

import { GlobalVar } from '@/constants/constants'
import { setErrorToast, setSuccessToast } from '@/utils/Error/setErrorToast'
import { getWeb3Sign } from '@/utils/getSign'

import { tvlPointDialogState, tvlStakingDialogState } from '../state/activeState'
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
export const useTeam = () => {
  const { getData } = useGetData()
  const [availableCode, setAvailableCode] = useState<IAvailableCode[]>([])
  const { activeData, setActiveData } = useActiveData()
  const [teamMembers, setTeamMembers] = useState<ITeamMember[]>([])
  const [isLoadingSingle, setIsLoadingSingle] = useState<boolean>(false)
  const [isLoadingAll, setIsLoadingAll] = useState<boolean>(false)

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
  const setIsTvlPointModalOpen = useSetRecoilState(tvlPointDialogState)
  const tvlStakingDialog = useRecoilValue(tvlStakingDialogState)
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
            stakingStr: new BigNumberJs(`${vd.staking}`).dividedBy(divisorBigNumber).toFixed(2)
          }))
        )
        setActiveData(pre => ({
          staking: `${_team['userInfo']['staking']}`,
          stakingStr: new BigNumberJs(`${_team['userInfo']['staking']}`).dividedBy(divisorBigNumber).toFixed(2),
          airdropPoints: _team['userInfo']['points'],
          ranking: `${_team['userInfo']['rank']}`,
          airdropPointsCardNumber: `${point['cardNum']}`
        }))
        // group
        const total = _team['groupGoal']['total']
        const target = _team['groupGoal']['target']

        const totalBig = new BigNumberJs(total)
        const targetBig = new BigNumberJs(target)
        const need = totalBig.minus(targetBig).abs().toFixed(3)
        const totalStr = totalBig.dividedBy(divisorBigNumber).toFixed(2)
        const targetStr = targetBig.dividedBy(divisorBigNumber).toFixed(2)
        const percent = target === '0' ? '0' : totalBig.div(target).times(100).toFixed(0)
        setGroupGoal({
          percent: Number(percent) > 100 ? '100' : `${percent}`,
          total: total,
          totalStr: totalStr,
          target: target,
          targetStr: targetStr,
          need: need,
          needStr: new BigNumberJs(need).dividedBy(divisorBigNumber).toFixed(2)
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

            if (setOpenCard_res) {
              await getData()
              await getDataTeam()
              if (isSingle) {
                setIsLoadingSingle(false)
              } else {
                setIsLoadingAll(false)
              }
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
    [JSON.stringify(activeData)]
  )
  return {
    groupGoal,
    availableCode,
    teamMembers,
    activeData,
    openCard,
    isLoadingAll,
    isLoadingSingle
  }
}
