import { ChainId, useActiveWeb3React, useRecoilState } from '@ui/src'
import { useCallback, useMemo } from 'react'

import { activeDataState, IActiveData, IActiveDataState, initActiveData } from '../state/activeState'

export const useActiveData = () => {
  const { chainId, account } = useActiveWeb3React()
  const [activeDataData, setActiveDataData] = useRecoilState<IActiveDataState>(activeDataState)
  const activeData = useMemo(() => {
    return activeDataData[chainId] ?? initActiveData
  }, [JSON.stringify(activeDataData), chainId])

  const setActiveData = useCallback(
    (obj: (preVal: IActiveData) => Partial<IActiveData>, chainIdParams?: ChainId) => {
      const _chainId = chainIdParams ?? chainId
      setActiveDataData(pre => {
        if (pre[_chainId]) {
          const chainObj = {
            ...pre[_chainId],
            ...obj(pre[_chainId]!)
          }
          return {
            ...pre,
            [_chainId]: chainObj
          }
        }
        return pre
      })
    },
    [setActiveDataData, account, chainId]
  )
  return { activeData, setActiveData }
}
