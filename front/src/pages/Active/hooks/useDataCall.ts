import { request, useActiveWeb3React } from '@ui/src'
import { useCallback, useState } from 'react'
import { Address } from 'wagmi'

import { TVL_API } from '../constants/activeConstants'
import { form_info, form_primary_score } from '../utils/formmate'

export const useGetDataCall = () => {
  const { account } = useActiveWeb3React()
  const { codeCheck } = useCodeCheckCall()
  const { getPrimaryScore } = usePrimaryScore()
  const getUserInfo = useCallback(
    async (getPoint: boolean) => {
      try {
        const info_res = await request(`${TVL_API}/api/info/${account}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if (info_res.data) {
          const infoObj = form_info(info_res.data)
          // check curInviteCode
          const checkRes = await codeCheck(infoObj.invitationCode)
          if (checkRes) {
            if (infoObj.twitter.nickname && getPoint) {
              const primary_score_res = await getPrimaryScore()
              const primaryScoreRes = form_primary_score(infoObj, primary_score_res)
              return {
                ...infoObj,
                ...primaryScoreRes
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
  const { account } = useActiveWeb3React()
  const getPrimaryScore = useCallback(async () => {
    try {
      // get 检查初始空投积分
      const primary_score_res = await request(`${TVL_API}/api/primary-score`, {
        method: 'GET',
        params: {
          addr: account
        },
        headers: {
          'Content-Type': 'application/json'
        }
      })
      return primary_score_res.data
    } catch (e: any) {
      throw new Error('Verification code has been registered')
    }
  }, [account])
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
        data: JSON.stringify({ code: codeStr }),
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
  const getAvailableCode = useCallback(async (address: string) => {
    try {
      // get 检查初始空投积分
      const recent_user_res = await request(`${TVL_API}/api/available_code`, {
        method: 'GET',
        params: {
          address: address
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
