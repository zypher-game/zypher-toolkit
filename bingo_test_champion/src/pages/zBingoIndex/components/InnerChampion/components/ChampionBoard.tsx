import { LoadingOutlined } from '@ant-design/icons'
import {
  BigNumberJs,
  BlockExplorerUrls,
  erc20Contract,
  getShortenAddress,
  IContractName,
  preStaticUrl,
  txStatus,
  useAaWallet,
  useActiveWeb3React,
  usePublicNodeWaitForTransaction,
  useRecoilValue,
  useSetRecoilState,
  zkBingoChampion,
  zkBingoV1
} from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TransactionReceipt, zeroAddress } from 'viem'

import { useChainIdParams } from '@/hooks/useChainIdParams'
import { env } from '@/utils/config'
import { setErrorToast, setSuccessToast } from '@/utils/Error/setErrorToast'
import { toChampionPlayHref } from '@/utils/toBingoHref'

import ChampionContract from '../contract/championContract'
import { useChampionAction } from '../hooks/useChampionAction'
import { useLabel } from '../hooks/useLabel'
import { ChampionRewardsHistoryState, ChampionshipAmount, CurrentChampionState, ICurrentChampionState } from '../state/championState'
import { StatsLoadingState, StatsState } from '../state/StatsState'
import css from './ChampionBoard.module.stylus'
import ChampionRulesDialog from './dialog/ChampionRulesDialog/ChampionRulesDialog'
import RewardHistoryDialog from './dialog/RewardHistoryDialog/RewardHistoryDialog'

const ChampionBoard = memo(() => {
  const setRewardsHistory = useSetRecoilState(ChampionRewardsHistoryState)
  const showRewardModal = useCallback(() => {
    setRewardsHistory(true)
  }, [])
  const { chainId, account, walletClient } = useAaWallet()
  const { currentRemainTime, nextMatchTime, currentRemainLabel, gameStatusLabel, btnLabel, lastWinner, curPlayer } = useLabel()
  const currentChampionState = useRecoilValue(CurrentChampionState)
  const stats = useRecoilValue(StatsState)
  const statsLoadingState = useRecoilValue(StatsLoadingState)
  const { handleAction } = useChampionAction()
  const navigate = useNavigate()
  const { waitForTransaction } = usePublicNodeWaitForTransaction(env)
  const [registerLoading, setRegisterLoading] = useState(false)
  const chainIdParams = useChainIdParams()
  const handleOnClick = useCallback(async () => {
    const canProceed = await handleAction()
    if (!canProceed || !chainId || statsLoadingState) {
      setErrorToast({
        title: '',
        message: `No chainId!`
      })
      return
    }
    try {
      if (currentChampionState === ICurrentChampionState.RegistrationOpen) {
        setRegisterLoading(true)
        const pointsAddress = zkBingoV1(chainId, IContractName.ZypherGameToken)
        console.log({ pointsAddress })
        const Championship = zkBingoChampion(chainId, IContractName.ZypherBingoChampionship)
        const pointsContract = erc20Contract(chainId, env, pointsAddress, walletClient)
        const allowance = await pointsContract.read.allowance([account, Championship])
        if (new BigNumberJs(allowance.toString()).lt(ChampionshipAmount)) {
          const approveTxn = await pointsContract.write.approve([Championship, ChampionshipAmount], {
            account: account
          })
          const approveTxnHash = typeof approveTxn === 'string' ? approveTxn : approveTxn.hash
          await waitForTransaction({ confirmations: 2, hash: approveTxnHash })
          setSuccessToast({ title: '', message: 'Approve successful' })
        }
        const championContract = ChampionContract({
          chainId,
          env,
          walletClient
        })
        const res = await championContract.write.register([stats.current.champId, account], {
          account: account
        })
        const hash = typeof res === 'string' ? res : res.hash
        const nativeSwapTx: TransactionReceipt | undefined = await waitForTransaction({ confirmations: 1, hash })
        if (nativeSwapTx && nativeSwapTx.status === txStatus) {
          setSuccessToast({
            title: '',
            message: `Register successful!`
          })
          toChampionPlayHref({
            chainIdParams: chainId,
            navigate
          })
        } else {
          throw Object.assign(new Error('Register Failed'), {
            name: 'Register'
          })
        }
      } else {
        toChampionPlayHref({
          chainIdParams: chainIdParams,
          navigate
        })
      }
    } catch (e) {
      console.log(e)
      setErrorToast(e)
    } finally {
      setRegisterLoading(false)
    }
  }, [handleAction, chainId, currentChampionState, stats?.current.champId, statsLoadingState])
  return (
    <div className={css.championBoard}>
      <div className={css.col1}>
        <GreyLink onClick={showRewardModal} label="Rewards History" />
        <Prize />
        <GreyLink onClick={showRewardModal} label="Rules" />
      </div>
      <div className={css.col2}>
        <PlayItem curPlayer={curPlayer} />
        <TimeItem currentRemainLabel={currentRemainLabel} currentRemainTime={currentRemainTime} />
        <GameItem gameStatusLabel={gameStatusLabel} />
      </div>
      <Col3 lastWinner={lastWinner} nextMatchTime={nextMatchTime} />
      <p className={css.btn} onClick={handleOnClick}>
        {btnLabel} {(registerLoading || statsLoadingState) && <LoadingOutlined />}
      </p>
      <ChampionRulesDialog />
      <RewardHistoryDialog />
    </div>
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
const PlayItem = memo(({ curPlayer }: { curPlayer: number }) => {
  return (
    <div className={css.item}>
      <div className={css.title}>
        <img src={preStaticUrl + '/img/bingo/play_icon.webp'} />
        <p className={css.title_p}>Registered Players</p>
      </div>
      <p className={css.amount}>{curPlayer}/50</p>
    </div>
  )
})

const TimeItem = memo(({ currentRemainLabel, currentRemainTime }: { currentRemainLabel: string; currentRemainTime: string[] }) => {
  return (
    <div className={css.item}>
      <div className={css.title}>
        <img src={preStaticUrl + '/img/bingo/time_icon.webp'} />
        <p className={css.title}>{currentRemainLabel}</p>
      </div>
      <p className={css.amount}>
        {currentRemainTime.map((v, index) => (
          <span key={index}>
            <span className={`${css.spanTime} ${index + 1 === currentRemainTime.length ? css.spanLast : ''}`}>{v}</span>
            {index + 1 === currentRemainTime.length ? '' : <span className={css.spanPoint}>:</span>}
          </span>
        ))}
      </p>
    </div>
  )
})

const GameItem = memo(({ gameStatusLabel }: { gameStatusLabel: 'In Progress' | 'Not Started' | 'Ended' }) => {
  return (
    <div className={css.item}>
      <div className={css.title}>
        <img src={preStaticUrl + '/img/bingo/game_icon.webp'} />
        <p className={css.title}>Elimination Status</p>
      </div>
      <p className={`${css.amount} ${css.state} ${gameStatusLabel === 'In Progress' ? css.in : ''}`}>{gameStatusLabel}</p>
    </div>
  )
})
const Col3 = memo(({ lastWinner, nextMatchTime }: { lastWinner: string; nextMatchTime: string[] }) => {
  const { chainId } = useActiveWeb3React()

  return (
    <div className={css.col3}>
      <div className={css.fl}>
        <p className={css.title}>{"Previous Champion's Address"}</p>
        {chainId ? (
          <a className={css.orange} href={`${BlockExplorerUrls[chainId][0]}/address/${zeroAddress}`} target="_blank" rel="noreferrer">
            {getShortenAddress(lastWinner)}
          </a>
        ) : (
          <a className={css.orange} href="#">
            {getShortenAddress(zeroAddress)}
          </a>
        )}
      </div>
      <div className={css.fr}>
        <p className={css.title}>Time Until Next Registration Opens</p>
        <p className={`${css.orange} ${css.orangeRight}`}>
          {nextMatchTime.map((v, index) => (
            <span key={index}>
              <span className={`${css.spanTime} ${index + 1 === nextMatchTime.length ? css.spanLast : ''}`}>{v}</span>
              {index + 1 === nextMatchTime.length ? '' : <span className={css.spanPoint}>:</span>}
            </span>
          ))}
        </p>
      </div>
    </div>
  )
}, isEqual)
export default ChampionBoard
