import { ChainId, formatMoney, getFormattedTime, getFormattedTimeMobile, IGameIdInfo, IGameList, IGameName, IGameStatus, IRecentGame } from '@UI/src/'
import BigNumberJs from 'bignumber.js'

export const chainIdPre: Record<ChainId, string> = {
  [ChainId.Mainnet]: 'BNB',
  [ChainId.Testnet]: 'BT',
  [ChainId.Arbitrum]: 'AO',
  [ChainId.ArbitrumGoerli]: 'AGT',
  [ChainId.ArbitrumRinkeby]: 'ARBR',
  [ChainId.LineaTestnet]: 'LT',
  [ChainId.LineaMainnet]: 'LM',
  [ChainId.POLYGON_MUMBAI]: 'PM',
  [ChainId.POLYGON_ZKEVM]: 'PZT',
  [ChainId.OPBNB]: 'OB',
  [ChainId.ScrollSepoliaTestnet]: 'SST',
  [ChainId.ScrollAlphaTestnet]: 'SAT',
  [ChainId.OPBNBTEST]: 'OBT',
  [ChainId.MantaPacificMainnet]: 'MPM',
  [ChainId.MantaPacificTestnet]: 'MPT',
  [ChainId.ComboTestnet]: 'CbT',
  [ChainId.Mantle]: 'MTM',
  [ChainId.MantleTestnet]: 'MTT',
  [ChainId.Combo]: 'CB'
}
export const gameFormatGamesWithIRecentGame = ({
  chainId,
  game,
  gameIdInfo
}: {
  chainId: ChainId
  game: IRecentGame
  gameIdInfo: IGameIdInfo
}): IGameList | undefined => {
  const { status, gameId: gameIdBig, players, winner, cardNumbers, selectedNumbers } = game
  const [startedAt, endedAt, joinAmount, , winAmount, , rounds] = gameIdInfo as unknown as IGameIdInfo
  try {
    const localStatus = status as IGameStatus
    let winnerOrPlayers = `${players.length} players`
    let inputPerPlayer = new BigNumberJs(joinAmount).dividedBy(players.length).toString()
    inputPerPlayer = inputPerPlayer === '0' ? '5000' : inputPerPlayer
    let win = '-'
    let multiplier = '-'
    if (localStatus === IGameStatus.End) {
      winnerOrPlayers = winner
      const poolWin = new BigNumberJs(winAmount)
      win = formatMoney(Number(winAmount))
      multiplier = formatMoney(poolWin.dividedBy(new BigNumberJs(inputPerPlayer)).toNumber())
    }
    inputPerPlayer = formatMoney(Number(inputPerPlayer), 0)

    return {
      chainId: chainId,
      status: localStatus,
      startTimeNumber: `${gameIdInfo[0]}`,
      startTime: getFormattedTime(gameIdInfo[0]),
      startTimeMobile: getFormattedTimeMobile(gameIdInfo[0]),
      game: IGameName.zBingo,
      winner: winner,
      players: players.map(({ cardId, isAbandoned, user }) => ({
        user: user,
        cardId: cardId.toString(),
        isAbandoned
      })),
      roomID: gameIdBig.toString(),
      roomIDStr: (chainId ? chainIdPre[chainId] : '') + 'B#' + gameIdBig.toString(),
      bingoInfo: {
        cardNumbers,
        selectedNumbers
      },
      gameIdInfo: gameIdInfo,
      inputPerPlayer: inputPerPlayer,
      multiplier: multiplier,
      win: win,
      winnerOrPlayers: winnerOrPlayers
    }
  } catch (err) {
    console.error('formatGames: ', err)
    return undefined
  }
}