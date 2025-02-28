import { useAaWallet, usePublicNodeWaitForTransaction } from '@ui/src'
import { useCallback, useMemo, useState } from 'react'

import { gasPrice } from '@/constants/constants'
import bingoLobby from '@/contract/bingoLobby'
import { useActiveWeb3ReactForBingo } from '@/hooks/useActiveWeb3ReactForBingo'
import { setErrorToast } from '@/utils/Error/setErrorToast'
import { CardNumbersType } from '@/utils/generateCardNumbers'
import getBingoLines from '@/utils/getBingoLines'

export const useGameLogic = (gameId: string | undefined, cardNumbers: CardNumbersType, selectedNumbers: number[], env: string) => {
  const [pending, setPending] = useState(false)
  const { chainId, bingoVersion } = useActiveWeb3ReactForBingo()
  const { aa_mm_address: account, aaWalletClient: walletClient } = useAaWallet()
  const { waitForTransaction } = usePublicNodeWaitForTransaction(env)

  const matchLines = useMemo(() => {
    return getBingoLines(selectedNumbers, cardNumbers)
  }, [selectedNumbers, cardNumbers])

  const cardNums = useMemo(() => {
    return cardNumbers.reduce(
      (prev, curr) => {
        prev[curr.row - 1].push(curr.num)
        return prev
      },
      [[], [], [], [], []] as number[][]
    )
  }, [cardNumbers])

  const handleBingo = useCallback(async () => {
    if (!chainId || !walletClient || !gameId) {
      return
    }
    setPending(true)

    try {
      const lobbyContract = bingoLobby({
        chainId,
        env,
        bingoVersion,
        walletClient
      })

      const txnReceipt = await lobbyContract.write.bingo([gameId, cardNums], {
        account,
        maxFeePerGas: gasPrice[chainId],
        maxPriorityFeePerGas: gasPrice[chainId]
      })

      const hash = typeof txnReceipt === 'string' ? txnReceipt : txnReceipt.hash
      await waitForTransaction({ confirmations: 1, hash })
    } catch (error) {
      setErrorToast(error)
    } finally {
      setPending(false)
    }
  }, [chainId, walletClient, cardNums, gameId, account])

  return {
    pending,
    matchLines,
    cardNums,
    handleBingo
  }
}
