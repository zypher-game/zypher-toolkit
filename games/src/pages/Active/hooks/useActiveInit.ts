import { addressIsEqual, ChainId, defaultActiveChainId, NavKey, pathnameState, useActiveWeb3React, useRecoilValue } from '@ui/src'
import { useCallback, useEffect, useMemo } from 'react'

import { useIsGetActiveData } from '@/hooks/useInit'

import { initActiveData } from '../state/activeState'
import { canNext } from './activeHooks'
import { useActiveData } from './useActiveData'
import { useGetDataCall } from './useDataCall'

export const useGetData = () => {
  const { account, chainId: ChainID } = useActiveWeb3React()
  const { setActiveData } = useActiveData()
  const { getUserInfo } = useGetDataCall()
  const pathname = useRecoilValue(pathnameState)
  const chainId = useMemo(() => {
    if (pathname[1] === NavKey[2][0]) {
      return ChainID ? (canNext(account, ChainID) ? ChainID : defaultActiveChainId) : undefined
    } else {
      return ChainID
    }
  }, [ChainID, JSON.stringify(pathname)])
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
        setActiveData(
          pre => ({
            ...pre,
            ...{
              ...userInfo,
              airdropPointsDetail: {
                ...(userInfo?.airdropPointsDetail ?? {}),
                byTwitterMore: pre.airdropPointsDetail.byTwitterMore
              }
            },
            accountAddress: account,
            chainId: chainId,
            isInitLoading: false
          }),
          chainId
        )
      } else {
        setActiveData(
          pre => ({
            ...pre,
            accountAddress: account,
            chainId: chainId,
            isInitLoading: false
          }),
          chainId
        )
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
  const { isActiveInit } = useIsGetActiveData()
  useEffect(() => {
    if (isActiveInit) {
      setActiveData(pre => {
        return addressIsEqual(pre.accountAddress, account) ? { ...pre } : { ...initActiveData }
      })
      getData()
    }
  }, [account, chainId, isActiveInit])
  return {
    getData
  }
}
