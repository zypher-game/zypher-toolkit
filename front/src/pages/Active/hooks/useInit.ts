import { ChainId, useActiveWeb3React } from '@ui/src'
import { useCallback, useEffect } from 'react'

import { initActiveData } from '../state/activeState'
import { canNext } from './activeHooks'
import { useActiveData } from './useActiveData'
import { useGetDataCall } from './useDataCall'

export const useInit = () => {
  const { account, chainId } = useActiveWeb3React()
  const { setActiveData } = useActiveData()
  const { getUserInfo } = useGetDataCall()
  // const { isInitLoading, id } = activeData
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
  }, [account])

  useEffect(() => {
    getData()
  }, [account])
  useEffect(() => {
    setActiveData(pre => {
      return (pre.accountAddress ?? '').toString().toLowerCase() === (account ?? '').toLowerCase() ? pre : initActiveData
    })
  }, [account])
  return {
    getData
  }
}
