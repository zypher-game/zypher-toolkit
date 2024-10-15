import { BM, ChainId, FORMAT, formatMoney, getLinkPre, request, TVL_API, useActiveWeb3React, useGetHero, useGetUserInfo } from '@ui/src'
import { BigNumberJs } from '@ui/src'
import { useCallback, useState } from 'react'

import { initActiveData, IStakingItem } from '../state/activeState'
import { form_primary_score } from '../utils/formmate'
import { useGetData } from './useActiveInit'
import { IRankBoard } from './useLeaderboard'

export const useGetDataCall = () => {
  const { account } = useActiveWeb3React()
  const { codeCheck } = useCodeCheckCall()
  const { getHero } = useGetHero()
  const { getPrimaryScore } = usePrimaryScore()
  const { getIsRegistered } = useIsRegistered()
  const { getUserInfo: getUserInfoCall } = useGetUserInfo()
  const getUserInfo = useCallback(
    async ({ isInit, chainId }: { isInit: boolean; chainId: ChainId }) => {
      try {
        if (account) {
          const linkType = getLinkPre(chainId)
          const infoObj = await getUserInfoCall({ account, chainId })
          if (infoObj) {
            let checkRes = false
            if (infoObj.twitter.nickname !== '') {
              checkRes = true
            } else {
              checkRes = !!(await codeCheck(infoObj.invitationCode))
            }

            if (checkRes) {
              if (infoObj.twitter.nickname && isInit) {
                // 获取头像 有头像就注册完成了
                let heroKey
                try {
                  if (account) {
                    heroKey = await getHero({
                      address: account,
                      linkType: linkType.key
                    })
                  }
                } catch (e) {}
                // 获取积分
                let primary_score_res
                try {
                  primary_score_res = await getPrimaryScore(chainId)
                } catch (e) {
                  console.log('primary_score_res Error', e)
                }
                const primaryScoreRes = form_primary_score(infoObj, primary_score_res ?? {})
                let isRegistered = false
                try {
                  isRegistered = await getIsRegistered(infoObj.id)
                } catch (e) {}
                return {
                  ...primaryScoreRes,
                  ...infoObj,
                  tvlHero: heroKey ?? '',
                  isRegistered: `${isRegistered ?? false}` === 'true'
                }
              }
              return {
                ...infoObj
              }
            }
          }
        }
      } catch (e: any) {
        console.log('getUserInfo err', e)
        return initActiveData
      }
    },
    [account]
  )
  return {
    getUserInfo
  }
}
export const usePrimaryScore = () => {
  const { account } = useActiveWeb3React()
  const getPrimaryScore = useCallback(
    async (chainId: ChainId) => {
      try {
        // get 检查初始空投积分
        const linkType = getLinkPre(chainId)
        const primary_score_res = await request(`${TVL_API[chainId]}/api/primary-score`, {
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
        throw new Error('primary-score has Error')
      }
    },
    [account]
  )
  return {
    getPrimaryScore
  }
}
export const useCodeCheckCall = () => {
  const [loading, setLoading] = useState(false)
  const { chainId } = useActiveWeb3React()
  const codeCheck = useCallback(
    async (codeStr: string) => {
      try {
        if (chainId) {
          setLoading(true)
          const res = await request(`${TVL_API[chainId]}/api/code/check`, {
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
        }
      } catch (e: any) {
        setLoading(false)
        throw new Error('Verification code has been registered')
      }
    },
    [chainId]
  )
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
      const recent_user_res = await request(`${TVL_API[chainId]}/api/available-code`, {
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
  const { chainId: chainIdLocal } = useActiveWeb3React()
  const getTeam = useCallback(async (userId: string, chainId: ChainId) => {
    try {
      const linkType = getLinkPre(chainId)
      // get 检查初始空投积分
      const recent_user_res = await request(`${TVL_API[chainId]}/api/team`, {
        method: 'GET',
        params: {
          userId: userId,
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

  const getGroupScoreCardNum = useCallback(
    async (userId: string) => {
      try {
        // get 检查初始空投积分
        const _res = await request(`${TVL_API[chainIdLocal]}/api/groupScoreCardNum/${userId}`, {
          method: 'GET',
          params: {
            userId: userId
          },
          headers: {
            'Content-Type': 'application/json'
          }
        })
        return _res.data
      } catch (e: any) {
        throw new Error('getGroupScoreCardNum Error')
      }
    },
    [chainIdLocal]
  )
  const setOpenCard = useCallback(
    async ({ userId, address, signature, isSingle }: { userId: string; address: string; signature: string; isSingle: boolean }) => {
      try {
        // get 检查初始空投积分
        const _res = await request(`${TVL_API[chainIdLocal]}/api/openCard/${userId}`, {
          method: 'POST',
          data: JSON.stringify({
            isSingle,
            signature: signature,
            address: address
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        return _res.data
      } catch (e: any) {
        throw new Error('setOpenCard Error')
      }
    },
    [chainIdLocal]
  )
  return {
    getTeam,
    getGroupScoreCardNum,
    setOpenCard
  }
}
export const useGetPointCard = () => {
  const getGroupScoreCardRead = useCallback(async ({ userId, chainId }: { userId: string; chainId: ChainId }) => {
    try {
      const linkType = getLinkPre(chainId)
      // get 检查初始空投积分
      const groupScore_res = await request(`${TVL_API[chainId]}/api/groupScoreCardRead/${userId}`, {
        method: 'GET',
        params: {
          userId: userId,
          linkType: linkType.key
        },
        headers: {
          'Content-Type': 'application/json'
        }
      })
      return groupScore_res.data
    } catch (e: any) {
      throw new Error('groupScoreCardRead Error')
    }
  }, [])
  const postGroupScoreCardRead = useCallback(async ({ scoreIds, chainId }: { scoreIds: number[]; chainId: ChainId }) => {
    try {
      const linkType = getLinkPre(chainId)
      const res = await request(`${TVL_API[chainId]}/api/groupScoreCardRead`, {
        method: 'POST',
        data: JSON.stringify({ scoreIds, linkType: linkType.key }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      return res.data['message']
    } catch (e: any) {
      throw new Error('groupScoreCardRead has Error by Catch')
    }
  }, [])
  return { getGroupScoreCardRead, postGroupScoreCardRead }
}
export const useStakingCall = () => {
  const getStaking = useCallback(async ({ userId, chainId }: { userId: string; chainId: ChainId }) => {
    try {
      if (!userId) {
        return
      }
      const linkType = getLinkPre(chainId)
      // get 检查初始空投积分
      const restaking_res = await request(`${TVL_API[chainId]}/api/restaking`, {
        method: 'GET',
        params: {
          userId: userId,
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
            } as unknown as IStakingItem
          ]
        })
      )
      const { stakingAirdrop, stakingGrowthCoefficient, restakingAirdrop, restakingGrowthCoefficient } = res.statistics
      const statistics = {
        stakingAirdrop: stakingAirdrop,
        stakingAirdropStr: formatMoney(new BigNumberJs(stakingAirdrop).toFixed(), 8),
        stakingGrowthCoefficient: stakingGrowthCoefficient,
        restakingAirdrop: restakingAirdrop,
        restakingAirdropStr: formatMoney(new BigNumberJs(restakingAirdrop).toFixed(), 8),
        restakingGrowthCoefficient: restakingGrowthCoefficient
      }
      return {
        records: records,
        statistics: statistics
      }
    } catch (e: any) {
      throw new Error('getStaking Error', e)
    }
  }, [])

  return {
    getStaking
  }
}

export const useLeaderBoardCall = () => {
  const getRecentUser = useCallback(async ({ chainId }: { chainId: ChainId }) => {
    try {
      const linkType = getLinkPre(chainId)
      // get 检查初始空投积分
      const recent_user_res = await request(`${TVL_API[chainId]}/api/recent/user`, {
        method: 'GET',
        params: {
          pageCount: 20,
          pageNo: 1,
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
      const rank_board_res = await request(`${TVL_API[chainId]}/api/rank-board`, {
        method: 'GET',
        params: {
          pageCount: 20,
          pageNo: 1,
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
            scoreStr: formatMoney(
              new BigNumberJs(v.score).gte(BM) ? new BigNumberJs(v.score).dividedBy(BM).toFixed() : new BigNumberJs(v.score).toFixed(),
              8
            ),
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
      const my_rank_board_res = await request(`${TVL_API[chainId]}/api/self-rank-board`, {
        method: 'GET',
        params: {
          userId: userId,
          linkType: linkType.key
        },
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const { nickname, headImg, fromNickname, score, rank } = my_rank_board_res.data
      return {
        nickname: `${nickname}`,
        headImg: `${headImg}`,
        fromNickname: `${fromNickname}`,
        score: `${score}`,
        scoreStr: formatMoney(new BigNumberJs(score).gte(BM) ? new BigNumberJs(score).dividedBy(BM).toFixed() : new BigNumberJs(score).toFixed(), 8),
        rank: Number(rank)
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
  const { chainId } = useActiveWeb3React()
  // 更新用户昵称
  const updateInfo = useCallback(
    async ({ formData }: { formData: FormData }) => {
      try {
        if (chainId) {
          // const res = await request(`${TVL_API[chainId]}/api/updateInfo`, {
          //   method: 'POST',
          //   data: JSON.stringify({ address, nickname, linkType, signature }),
          //   headers: {
          //     'Content-Type': 'application/json'
          //   }
          // })
          const res = await request(`${TVL_API[chainId]}/api/updateInfo`, {
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
        }
      } catch (e: any) {
        return false
      }
    },
    [chainId]
  )
  // 更新用户头像
  const updateHeadImg = useCallback(
    async ({ formData }: { formData: FormData }) => {
      try {
        const res = await request(`${TVL_API[chainId]}/api/updateHeadImg`, {
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
    },
    [chainId]
  )

  return {
    updateInfo,
    updateHeadImg
  }
}
export const useIsRegistered = () => {
  const { chainId } = useActiveWeb3React()
  const getIsRegistered = useCallback(
    async (userId: string) => {
      try {
        if (chainId) {
          const res = await request(`${TVL_API[chainId]}/api/isActived/${userId}`, {
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
        }
      } catch (e: any) {
        return undefined
      }
    },
    [chainId]
  )
  return {
    getIsRegistered
  }
}
export const useUserHeroCall = () => {
  const [loading, setLoading] = useState(false)
  const { getHero } = useGetHero()
  const chooseHero = useCallback(
    async ({
      account,
      chainId,
      userId,
      role,
      signature,
      address
    }: {
      account: string
      chainId: ChainId
      userId: string
      role: string
      signature: string
      address: string
    }) => {
      try {
        const linkType = getLinkPre(chainId)
        setLoading(true)
        const res = await request(`${TVL_API[chainId]}/api/choose-role`, {
          method: 'POST',
          data: JSON.stringify({ userId: Number(userId), role: role, signature, address }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if (res.data && res.data['message'] == 'ok') {
          const rres = await getHero({ address: account, linkType: linkType.key })
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
    },
    []
  )
  return {
    loading,
    chooseHero
  }
}

export const useTwitterForward = () => {
  const [loading, setLoading] = useState(false)
  const { getData } = useGetData()
  const { chainId } = useActiveWeb3React()
  const twitterForward = useCallback(
    async ({ userId }: { userId: string }) => {
      try {
        setLoading(true)
        const res = await request(`${TVL_API[chainId]}/api/twitterForward`, {
          method: 'POST',
          data: JSON.stringify({ userId: Number(userId) }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if (res.data && res.data['message'] == 'ok') {
          getData()
        } else {
          throw new Error('twitterForward has Error by Post')
        }
      } catch (e: any) {
        setLoading(false)
        throw new Error('twitterForward has Error by Catch')
      }
    },
    [getData, chainId]
  )
  return {
    loading,
    twitterForward
  }
}
