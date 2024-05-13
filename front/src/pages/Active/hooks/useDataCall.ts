import { ChainId, request, useActiveWeb3React } from '@ui/src'
import { useCallback, useState } from 'react'
import { Address } from 'wagmi'

import { getLinkPre, TVL_API } from '../constants/activeConstants'
import { form_info, form_primary_score } from '../utils/formmate'

export const useGetDataCall = () => {
  const { account } = useActiveWeb3React()
  const { codeCheck } = useCodeCheckCall()
  const { getHero } = useUserHeroCall()
  const { getPrimaryScore } = usePrimaryScore()
  const { getIsRegistered } = useIsRegistered()
  const getUserInfo = useCallback(
    async ({ isInit, chainId }: { isInit: boolean; chainId: ChainId }) => {
      try {
        const link_type = getLinkPre(chainId)
        const info_res = await request(`${TVL_API}/api/info/${account}`, {
          method: 'GET',
          params: {
            page_count: 10,
            link_type: link_type.key
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
export const useRecentUser = () => {
  const getRecentUser = useCallback(async () => {
    try {
      // get 检查初始空投积分
      const recent_user_res = await request(`${TVL_API}/api/recent/user`, {
        method: 'GET',
        params: {
          page_count: 10,
          page_no: 1
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
  return {
    getRecentUser
  }
}
export const usePrimaryScore = () => {
  const { account, chainId } = useActiveWeb3React()
  const getPrimaryScore = useCallback(async () => {
    try {
      // get 检查初始空投积分
      const link_type = getLinkPre(chainId)
      const primary_score_res = await request(`${TVL_API}/api/primary-score`, {
        method: 'GET',
        params: {
          addr: account,
          link_type: link_type.key
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
      const link_type = getLinkPre(chainId)
      // get 检查初始空投积分
      const recent_user_res = await request(`${TVL_API}/api/available-code`, {
        method: 'GET',
        params: {
          address: address,
          link_type: link_type.key
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
      const link_type = getLinkPre(chainId)
      // get 检查初始空投积分
      const recent_user_res = await request(`${TVL_API}/api/team`, {
        method: 'GET',
        params: {
          user_id: userId,
          link_type: link_type.key
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
      throw new Error('GetAvailableCode Error')
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
      throw new Error('GetAvailableCode Error')
    }
  }, [])
  return {
    getTeam,
    getGroupScoreCardNum,
    setOpenCard
  }
}

export const useUpdateInfoCall = () => {
  const updateInfo = useCallback(async ({ address, headImg, nickname }: { address: Address; headImg: FormData; nickname: string }) => {
    try {
      const res = await request(`${TVL_API}/api/updateInfo`, {
        method: 'POST',
        data: {
          address: address,
          headImg: headImg,
          nickname: nickname
        },
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      if (res.data && res.data['message'] == 'ok') {
        return true
      } else {
        throw new Error('UpdateInfo File')
      }
    } catch (e: any) {
      throw e
    }
  }, [])
  return {
    updateInfo
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
