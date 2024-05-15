import { ChainId, divisorBigNumber, request, useActiveWeb3React } from '@ui/src'
import { useCallback, useState } from 'react'
import { Address } from 'wagmi'

import BigNumberJs from '@/utils/BigNumberJs'

import { getLinkPre, TVL_API } from '../constants/activeConstants'
import { IRestakingItem } from '../state/activeState'
import { form_info, form_primary_score } from '../utils/formmate'
import { IRankBoard } from './useLeaderboard'

export const useGetDataCall = () => {
  const { account } = useActiveWeb3React()
  const { codeCheck } = useCodeCheckCall()
  const { getHero } = useUserHeroCall()
  const { getPrimaryScore } = usePrimaryScore()
  const { getIsRegistered } = useIsRegistered()
  const getUserInfo = useCallback(
    async ({ isInit, chainId }: { isInit: boolean; chainId: ChainId }) => {
      try {
        const linkType = getLinkPre(chainId)
        const info_res = await request(`${TVL_API}/api/info/${account}`, {
          method: 'GET',
          params: {
            page_count: 10,
            linkType: linkType.key
          },
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if (info_res.data) {
          const infoObj = form_info(info_res.data, chainId)
          // console.log(1)
          // check curInviteCode
          let checkRes = false
          if (infoObj.twitter.nickname !== '') {
            checkRes = true
          } else {
            checkRes = await codeCheck(infoObj.invitationCode)
          }

          if (checkRes) {
            if (infoObj.twitter.nickname && isInit) {
              // 获取头像 有头像就注册完成了
              const heroKey = await getHero(infoObj.id)

              // 获取积分
              const primary_score_res = await getPrimaryScore()
              const primaryScoreRes = form_primary_score(infoObj, primary_score_res)
              let isRegistered = false
              if (heroKey) {
                isRegistered = await getIsRegistered(infoObj.id)
                console.log({ isRegistered })
              }
              return {
                ...infoObj,
                ...primaryScoreRes,
                tvlHero: heroKey ?? '',
                isRegistered: isRegistered
              }
            }
            return {
              ...infoObj
            }
          }
        }
      } catch (e: any) {}
    },
    [account]
  )
  return {
    getUserInfo
  }
}
export const usePrimaryScore = () => {
  const { account, chainId } = useActiveWeb3React()
  const getPrimaryScore = useCallback(async () => {
    try {
      // get 检查初始空投积分
      const linkType = getLinkPre(chainId)
      const primary_score_res = await request(`${TVL_API}/api/primary-score`, {
        method: 'GET',
        params: {
          addr: account,
          linkType: linkType.key
        },
        headers: {
          'Content-Type': 'application/json'
        }
      })
      return primary_score_res.data
    } catch (e: any) {
      throw new Error('Verification code has been registered')
    }
  }, [account, chainId])
  return {
    getPrimaryScore
  }
}
export const useCodeCheckCall = () => {
  const [loading, setLoading] = useState(false)
  const codeCheck = useCallback(async codeStr => {
    try {
      setLoading(true)
      const res = await request(`${TVL_API}/api/code/check`, {
        method: 'POST',
        data: JSON.stringify({ code: codeStr.substring(1) }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      setLoading(false)
      if (res.data && res.data['message'] == 'ok') {
        return true
      } else {
        throw new Error('Verification code has been registered')
      }
    } catch (e: any) {
      setLoading(false)
      throw new Error('Verification code has been registered')
    }
  }, [])
  return {
    loading,
    codeCheck
  }
}
export const useAvailableCode = () => {
  const getAvailableCode = useCallback(async (address: string, chainId: ChainId) => {
    try {
      const linkType = getLinkPre(chainId)
      // get 检查初始空投积分
      const recent_user_res = await request(`${TVL_API}/api/available-code`, {
        method: 'GET',
        params: {
          address: address,
          linkType: linkType.key
        },
        headers: {
          'Content-Type': 'application/json'
        }
      })
      return recent_user_res.data
    } catch (e: any) {
      throw new Error('GetAvailableCode Error')
    }
  }, [])
  return {
    getAvailableCode
  }
}

export const useTeamCall = () => {
  const getTeam = useCallback(async (userId: string, chainId: ChainId) => {
    try {
      const linkType = getLinkPre(chainId)
      // get 检查初始空投积分
      const recent_user_res = await request(`${TVL_API}/api/team`, {
        method: 'GET',
        params: {
          user_id: userId,
          linkType: linkType.key
        },
        headers: {
          'Content-Type': 'application/json'
        }
      })
      return recent_user_res.data
    } catch (e: any) {
      throw new Error('getTeam Error')
    }
  }, [])

  const getGroupScoreCardNum = useCallback(async (userId: string) => {
    try {
      // get 检查初始空投积分
      const _res = await request(`${TVL_API}/api/groupScoreCardNum/${userId}`, {
        method: 'GET',
        params: {
          user_id: userId
        },
        headers: {
          'Content-Type': 'application/json'
        }
      })
      return _res.data
    } catch (e: any) {
      throw new Error('getGroupScoreCardNum Error')
    }
  }, [])
  const setOpenCard = useCallback(async (userId: string, isSingle: boolean) => {
    try {
      // get 检查初始空投积分
      const _res = await request(`${TVL_API}/api/openCard/${userId}`, {
        method: 'POST',
        data: JSON.stringify({ isSingle }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      return _res.data
    } catch (e: any) {
      throw new Error('setOpenCard Error')
    }
  }, [])
  return {
    getTeam,
    getGroupScoreCardNum,
    setOpenCard
  }
}
export const useRestakingCall = () => {
  const getRestaking = useCallback(async ({ userId, chainId }: { userId: string; chainId: ChainId }) => {
    try {
      const linkType = getLinkPre(chainId)
      // get 检查初始空投积分
      const restaking_res = await request(`${TVL_API}/api/restaking`, {
        method: 'GET',
        params: {
          user_id: userId,
          linkType: linkType.key
        },
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const res = restaking_res.data
      const records = Object.fromEntries(
        res.records.map((v: any) => {
          // const tokenAddressBig = new BigNumberJs(v.tokenAddress)
          // const userStakeTotalBig = new BigNumberJs(v.userStakeTotal)
          return [
            v.tokenAddress,
            {
              tokenAddress: v.tokenAddress,
              // userStakeTotal: v.userStakeTotal,
              total: v.total
              // totalStr: tokenAddressBig.dividedBy(divisorBigNumber).toFixed(2)
              // ratio: '0'
            } as unknown as IRestakingItem
          ]
        })
      )
      const { stakingAirdrop, stakingGrowthCoefficient, restakingAirdrop, restakingGrowthCoefficient } = res.statistics
      const statistics = {
        stakingAirdrop: stakingAirdrop,
        stakingAirdropStr: new BigNumberJs(stakingAirdrop).dividedBy(divisorBigNumber).toFixed(2),
        stakingGrowthCoefficient: stakingGrowthCoefficient,
        restakingAirdrop: restakingAirdrop,
        restakingAirdropStr: new BigNumberJs(restakingAirdrop).dividedBy(divisorBigNumber).toFixed(2),
        restakingGrowthCoefficient: restakingGrowthCoefficient
      }
      return {
        records: records,
        statistics: statistics
      }
    } catch (e: any) {
      throw new Error('getRestaking Error', e)
    }
  }, [])

  return {
    getRestaking
  }
}

export const useLeaderBoardCall = () => {
  const getRecentUser = useCallback(async ({ chainId }: { chainId: ChainId }) => {
    try {
      const linkType = getLinkPre(chainId)
      // get 检查初始空投积分
      const recent_user_res = await request(`${TVL_API}/api/recent/user`, {
        method: 'GET',
        params: {
          page_count: 20,
          page_no: 1,
          linkType: linkType.key
        },
        headers: {
          'Content-Type': 'application/json'
        }
      })
      return recent_user_res.data
    } catch (e: any) {
      throw new Error('GetRecentUser Error')
    }
  }, [])

  const getRankBoard = useCallback(async ({ chainId }: { chainId: ChainId }) => {
    try {
      const linkType = getLinkPre(chainId)
      const rank_board_res = await request(`${TVL_API}/api/rank-board`, {
        method: 'GET',
        params: {
          page_count: 20,
          page_no: 1,
          linkType: linkType.key
        },
        headers: {
          'Content-Type': 'application/json'
        }
      })
      return rank_board_res.data.data.map(
        (v: any) =>
          ({
            nickname: `${v.nickname}`,
            headImg: `${v.headImg}`,
            fromNickname: `${v.fromNickname}`,
            score: `${v.score}`,
            rank: Number(v.rank)
          } as IRankBoard)
      )
    } catch (e: any) {
      throw new Error('GetRecentUser Error')
    }
  }, [])

  const getMyRankBoard = useCallback(async ({ userId, chainId }: { userId: string; chainId: ChainId }) => {
    try {
      const linkType = getLinkPre(chainId)
      const my_rank_board_res = await request(`${TVL_API}/api/self-rank-board`, {
        method: 'GET',
        params: {
          user_id: userId,
          linkType: linkType.key
        },
        headers: {
          'Content-Type': 'application/json'
        }
      })
      return {
        nickname: `${my_rank_board_res.data.nickname}`,
        headImg: `${my_rank_board_res.data.headImg}`,
        fromNickname: `${my_rank_board_res.data.fromNickname}`,
        score: `${my_rank_board_res.data.score}`,
        rank: Number(my_rank_board_res.data.rank)
      } as IRankBoard
    } catch (e: any) {
      throw new Error('GetRecentUser Error')
    }
  }, [])
  return {
    getRecentUser,
    getRankBoard,
    getMyRankBoard
  }
}
export const useUpdateInfoCall = () => {
  // 更新用户昵称
  const updateInfo = useCallback(async ({ address, nickname, linkType }: { address: Address; nickname: string; linkType: number }) => {
    try {
      const res = await request(`${TVL_API}/api/updateInfo`, {
        method: 'POST',
        data: JSON.stringify({ address, nickname, linkType }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (res.data && res.data['message'] == 'ok') {
        return true
      } else {
        return false
      }
    } catch (e: any) {
      return false
    }
  }, [])
  // 更新用户头像
  const updateHeadImg = useCallback(async ({ formData }: { formData: FormData }) => {
    try {
      const res = await request(`${TVL_API}/api/updateHeadImg`, {
        method: 'POST',
        data: formData,
        headers: {
          accept: 'application/json; charset=utf-8',
          'Content-Type': 'multipart/form-data'
        }
      })
      if (res.data && res.data['message'] == 'ok') {
        return true
      } else {
        return false
      }
    } catch (e: any) {
      return false
    }
  }, [])

  return {
    updateInfo,
    updateHeadImg
  }
}
export const useIsRegistered = () => {
  const getIsRegistered = useCallback(async (userId: string) => {
    try {
      const res = await request(`${TVL_API}/api/isActived/${userId}`, {
        method: 'POST',
        data: JSON.stringify({ userId: Number(userId) }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (res.data && res.data['message']) {
        return res.data['message']
      } else {
        return undefined
      }
    } catch (e: any) {
      return undefined
    }
  }, [])
  return {
    getIsRegistered
  }
}
export const useUserHeroCall = () => {
  const [loading, setLoading] = useState(false)
  const chooseHero = useCallback(async ({ userId, hero }: { userId: string; hero: string }) => {
    try {
      setLoading(true)
      const res = await request(`${TVL_API}/api/choose-role`, {
        method: 'POST',
        data: JSON.stringify({ userId: Number(userId), role: hero }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (res.data && res.data['message'] == 'ok') {
        const rres = await getHero(userId)
        setLoading(false)
        if (rres) {
          return rres
        } else {
          throw new Error('Choose Hero has Error By get')
        }
      } else {
        throw new Error('Choose Hero has Error by Post')
      }
    } catch (e: any) {
      setLoading(false)
      throw new Error('Choose Hero has Error by Catch')
    }
  }, [])
  const getHero = useCallback(async (userId: string) => {
    try {
      const res = await request(`${TVL_API}/api/user-role/${userId}`, {
        method: 'GET',
        params: {
          user_id: userId
        },
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (res.data && res.data['message']) {
        return res.data['message']
      } else {
        return undefined
      }
    } catch (e: any) {
      return undefined
    }
  }, [])
  return {
    loading,
    chooseHero,
    getHero
  }
}
