import { IGameList, IRecentGame, useActiveWeb3React } from '@UI/src/'
import { isEqual } from 'lodash'
import { useCallback, useEffect, useState } from 'react'

import bingoLobby from '@/contract/bingoLobby'
import { getGameInfo } from '@/hooks/useRecentGames'
import { env } from '@/utils/config'
import { gameFormatGamesWithIRecentGame } from '@/utils/gameFormatGames'

export const useGetHistory = ({
  historyList,
  setHistoryList
}: {
  historyList: IGameList[]
  setHistoryList: React.Dispatch<React.SetStateAction<IGameList[]>>
}): { playedGamesLoading: boolean } => {
  const [playedGamesLoading, setPlayedGamesLoading] = useState<boolean>(false)
  const { chainId, account } = useActiveWeb3React()
  const getPlayedGames = useCallback(async () => {
    try {
      if (chainId && account) {
        setPlayedGamesLoading(true)
        const lobbyContract = bingoLobby(chainId, env)
        const games = await lobbyContract.read.playedGames([account, 0])
        const gameIdList: string[] = games.map((v: IRecentGame) => v.gameId.toString())
        const { gameInfo } =
          (await getGameInfo({
            chainId,
            gameIdList
          })) || {}
        if (gameInfo) {
          setPlayedGamesLoading(false)
          const gameListChainId: IGameList[] = games.map((game: IRecentGame, index: number) => {
            return gameFormatGamesWithIRecentGame({ chainId, game, gameIdInfo: gameInfo[index] })
          })
          if (historyList.length === 0 || !isEqual(historyList, gameListChainId)) {
            setHistoryList(gameListChainId)
          }
        }
      }
    } catch (e) {
      console.error('getPlayedGames: ', e)
    }
  }, [chainId, account])
  useEffect(() => {
    if (chainId && account) {
      getPlayedGames()
    }
  }, [chainId, account])
  return {
    playedGamesLoading
  }
}
