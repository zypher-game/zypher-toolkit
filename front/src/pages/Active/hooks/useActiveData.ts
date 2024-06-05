import { ChainId, useActiveWeb3React, useRecoilState } from '@ui/src'
import { useCallback, useMemo } from 'react'

import { activeDataState, IActiveData, IActiveDataState, initActiveData } from '../state/activeState'
import { canNext } from './activeHooks'

export const useActiveData = () => {
  const { chainId, account } = useActiveWeb3React()
  const [activeDataData, setActiveDataData] = useRecoilState<IActiveDataState>(activeDataState)
  const activeData = useMemo(() => {
    if (canNext(account, chainId)) {
      return activeDataData[chainId] ?? initActiveData
    }
    return initActiveData
  }, [JSON.stringify(activeDataData), chainId])

  const setActiveData = useCallback(
    (obj: (preVal: IActiveData) => Partial<IActiveData>, chainIdParams?: ChainId) => {
      const _chainId = chainIdParams ?? chainId
      setActiveDataData(pre => {
        if (pre[chainId]) {
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
    [setActiveDataData, chainId]
  )
  return { activeData, setActiveData }
}
