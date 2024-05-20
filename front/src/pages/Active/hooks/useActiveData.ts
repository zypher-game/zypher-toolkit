import { useActiveWeb3React, useRecoilState } from '@ui/src'
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
    (obj: (preVal: IActiveData) => Partial<IActiveData>) => {
      console.log({ obj })
      setActiveDataData(pre => {
        console.log({ pre, chainId })
        if (pre[chainId]) {
          console.log({ preValue: pre[chainId] })
          const chainObj = {
            ...pre[chainId],
            ...obj(pre[chainId]!)
          }
          console.log({ nextValue: chainObj })
          return {
            ...pre,
            [chainId]: chainObj
          }
        }
        return pre
      })
    },
    [setActiveDataData, chainId]
  )
  return { activeData, setActiveData }
}
