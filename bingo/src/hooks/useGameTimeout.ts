import { useEffect, useState } from 'react'

import { IBingoVersion } from '@/pages/state/state'

import bingoLobby from '../contract/bingoLobby'
import { env } from '../utils/config'
import { useActiveWeb3ReactForBingo } from './useActiveWeb3ReactForBingo'

//         開始遊戲後會等多久開始第一輪
//         uint32 startTimeout;

//         前 N 輪之間沒有 gap 時間
//         uint8 boostRounds;

//         各輪選號之間空白的間隔
//         uint32 roundGap;

//         每輪選擇時間 (linea 1min = 60)
//         uint32 roundTimeout;

//         整場遊戲的時長
//         uint32 maxDuration;

const useGameTimeout = () => {
  const { account, chainId, bingoVersion } = useActiveWeb3ReactForBingo()
  const [gameTime, setGameTime] = useState<number[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | unknown | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      if (!chainId || !account) {
        return
      }
      try {
        const lobbyContract = bingoLobby({ chainId, env, bingoVersion })
        const time = await lobbyContract.read.timer()
        const { startTimeout, boostRounds, roundGap, roundTimeout, maxDuration } = time
        setGameTime([startTimeout, boostRounds, roundGap, roundTimeout, maxDuration])
        setLoading(false)
      } catch (err) {
        setError(err)
        setLoading(false)
      }
    }
    fetchData()
  }, [account, chainId, bingoVersion])
  return { gameTime, error, loading }
}

export default useGameTimeout
