import { useActiveWeb3React, useRecoilState } from '@ui/src'
import { useCallback, useEffect } from 'react'

import { activeDataState, IActiveData, initActiveData } from '../state/activeState'
import { useGetDataCall } from './useDataCall'

export const useInit = () => {
  const { account } = useActiveWeb3React()
  const [activeData, setActiveData] = useRecoilState<IActiveData>(activeDataState)
  const { getUserInfo } = useGetDataCall()
  const { isInitLoading, id } = activeData
  const getData = useCallback(async () => {
    if (account && !isInitLoading && !id) {
      setActiveData(pre => ({
        ...pre,
        isInitLoading: true
      }))
      const userInfo = await getUserInfo(true)
      if (userInfo) {
        setActiveData(pre => ({
          ...pre,
          ...userInfo,
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
  }, [account, isInitLoading])

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
