import { useActiveWeb3React } from '@ui/src'
import { useCallback, useEffect, useState } from 'react'

import { useAvailableCode } from './useDataCall'

export const useTeam = () => {
  const [availableCode, setAvailableCode] = useState<string[]>(['000001', '000002', '000003'])
  const { account } = useActiveWeb3React()
  const { getAvailableCode } = useAvailableCode()
  const getData = useCallback(async () => {
    if (account) {
      const _availableCode = await getAvailableCode(account)
      console.log('availableCode:', _availableCode)
    }
  }, [account])
  useEffect(() => {
    getData()
  }, [getData])
  return {
    availableCode
  }
}
