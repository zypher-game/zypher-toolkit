import { BlockExplorerUrls, preStaticUrl, useActiveWeb3React, useRecoilValue } from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo, useCallback } from 'react'
import { zeroAddress } from 'viem'

import { CurrentPlayerNumber } from '../state/championState'
import css from './ChampionBoard.module.stylus'
import ChampionRulesDialog from './dialog/ChampionRulesDialog/ChampionRulesDialog'
import RewardHistoryDialog from './dialog/RewardHistoryDialog/RewardHistoryDialog'
const ChampionBoard = memo(({ btnLabe }: { btnLabe: string }) => {
  // const currentChampionState = useRecoilValue(CurrentChampionState)
  const showRewardModal = useCallback(() => {}, [])
  return (
    <>
      <div className={css.col1}>
        <GreyLink onClick={showRewardModal} label="Rewards History" />
        <Prize />
        <GreyLink onClick={showRewardModal} label="Rules" />
      </div>
      <div className={css.col2}>
        <PlayItem />
        <TimeItem />
        <GameItem />
      </div>
      <Col3 />
      <p className={css.btn}>{btnLabe}</p>
      <ChampionRulesDialog />
      <RewardHistoryDialog />
    </>
  )
}, isEqual)
const GreyLink = memo(({ onClick, label }: { onClick: any; label: string }) => {
  return (
    <p onClick={onClick} className={css.greyLink}>
      {label}
    </p>
  )
})
const Prize = memo(() => {
  return (
    <div className={css.prizeCol}>
      <p className={css.title}>Current Prize Pool</p>
      <p className={css.amount}>50,000 GP</p>
    </div>
  )
})
const PlayItem = memo(() => {
  const curPlayerNum = useRecoilValue(CurrentPlayerNumber)
  return (
    <div className={css.item}>
      <div className={css.title}>
        <img src={preStaticUrl + '/img/bingo/play_icon.webp'} />
        <p className={css.title}>Registered Players</p>
      </div>
      <p className={css.amount}>{curPlayerNum}/50</p>
    </div>
  )
})

const TimeItem = memo(() => {
  return (
    <div className={css.item}>
      <div className={css.title}>
        <img src={preStaticUrl + '/img/bingo/time_icon.webp'} />
        <p className={css.title}>Prelim Entry Countdown</p>
      </div>
      <p className={css.amount}>19m : 26s</p>
    </div>
  )
})

const GameItem = memo(() => {
  return (
    <div className={css.item}>
      <div className={css.title}>
        <img src={preStaticUrl + '/img/bingo/game_icon.webp'} />
        <p className={css.title}>Elimination Status</p>
      </div>
      <p className={css.state}>In Progress</p>
    </div>
  )
})
const Col3 = memo(() => {
  const { chainId } = useActiveWeb3React()
  return (
    <div className={css.col3}>
      <div className={css.fl}>
        <p className={css.title}>{"Previous Champion's Address"}</p>
        <a className={css.orange} href={`${BlockExplorerUrls[chainId][0]}/address/${zeroAddress}`} target="_blank" rel="noreferrer">
          {zeroAddress}
        </a>
      </div>
      <div className={css.fr}>
        <p className={css.title}>Time Until Next Registration Opens</p>
        <p className={css.orange}>1h : 39m : 56s</p>
      </div>
    </div>
  )
}, isEqual)
export default ChampionBoard
