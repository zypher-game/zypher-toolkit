import { NavKey, useActiveWeb3React, useRecoilValue } from '@ui/src'
import { pathnameState } from '@ui/src'
import { useCallback, useEffect } from 'react'

import { initActiveData } from '../state/activeState'
import { canNext } from './activeHooks'
import { useActiveData } from './useActiveData'
import { useGetDataCall } from './useDataCall'

export const useGetData = () => {
  const { account, chainId } = useActiveWeb3React()
  const { setActiveData } = useActiveData()
  const { getUserInfo } = useGetDataCall()
  const getData = useCallback(async () => {
    if (chainId && account && canNext(account, chainId)) {
      setActiveData(pre => ({
        ...pre,
        isInitLoading: true
      }))
      const userInfo = await getUserInfo({
        isInit: true,
        chainId
      })
      console.log({ userInfo })
      if (userInfo) {
        setActiveData(pre => ({
          ...pre,
          ...{
            ...userInfo,
            airdropPointsDetail: {
              ...userInfo.airdropPointsDetail,
              byTwitterMore: pre.airdropPointsDetail.byTwitterMore
            }
          },
          accountAddress: account,
          isInitLoading: false
        }))
      } else {
        setActiveData(pre => ({
          ...pre,
          accountAddress: account,
          isInitLoading: false
        }))
      }
    }
  }, [account, chainId])
  return {
    getData
  }
}
export const useActiveInit = () => {
  const { account, chainId } = useActiveWeb3React()
  const { setActiveData } = useActiveData()
  // const { isInitLoading, id } = activeData
  const { getData } = useGetData()
  const pathname = useRecoilValue(pathnameState)

  useEffect(() => {
    if (NavKey[0].includes(pathname[0])) {
      getData()
      setActiveData(pre => {
        return (pre.accountAddress ?? '').toString().toLowerCase() === (account ?? '').toLowerCase() ? { ...pre } : { ...initActiveData }
      })
    }
  }, [account, chainId])
  return {
    getData
  }
}
