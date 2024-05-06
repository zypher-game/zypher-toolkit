import { useRecoilValue } from '@ui/src'
import { useEffect, useMemo, useState } from 'react'

import {
  useAccountMonsterFetch,
  useAccountMonsterGraphqlFetch,
  useMonsterFetch,
  useMonsterGraphqlFetch,
  useMonsterState
} from '@/store/monster/hooks'
import { AccountMonsterKeyType, IAccountMonsterData, IMonsterData, MonsterKeyType } from '@/store/monster/reducer'
import BigNumberJs from '@/utils/BigNumberJs'

import { refreshMonsterState } from '../state/monsterState'
import { IDefenceRankDataItem, IFightInfo, IMonsterStatus, ImonsterUserStatus } from './monster.types'

export const useMonster = ({
  monsterStatus,
  setMonsterUserStatus,
  setMonsterStatus
}: {
  monsterStatus: IMonsterStatus
  setMonsterUserStatus: React.Dispatch<React.SetStateAction<ImonsterUserStatus>>
  setMonsterStatus: React.Dispatch<React.SetStateAction<IMonsterStatus>>
}): {
  monsterLoading: boolean
  fightInfo: IFightInfo
  monsterState: IMonsterData | undefined
  accountMonsterState: IAccountMonsterData | undefined
  defenceAccountRankDataState: IDefenceRankDataItem | undefined
  defenceRankDataState: IDefenceRankDataItem[] | undefined
} => {
  const refreshMonster = useRecoilValue(refreshMonsterState)
  const [fightInfo, setFightInfo] = useState<IFightInfo>({
    totalPoint: '',
    nowPoint: ''
  })
  const {
    monsterLoading,
    monster: monsterState,
    accountMonster: accountMonsterState,
    defenceAccountRankData: defenceAccountRankDataState,
    defenceRankData: defenceRankDataState
  } = useMonsterState()
  const monsterStateStr = useMemo(() => {
    return monsterState ? JSON.stringify(monsterState) : undefined
  }, [monsterState])

  const accountMonsterStateStr = useMemo(() => {
    return accountMonsterState ? JSON.stringify(accountMonsterState) : undefined
  }, [accountMonsterState])
  useMonsterFetch()
  useAccountMonsterFetch()
  useMonsterGraphqlFetch()
  useAccountMonsterGraphqlFetch()
  useEffect(() => {
    let _fightInfo = {
      totalPoint: '',
      nowPoint: ''
    }
    let _monsterStatus = IMonsterStatus.MonsterNftWait
    if (monsterState) {
      // 怪兽被打死了
      const now = Math.ceil(new Date().getTime() / 1000)
      if (new BigNumberJs(monsterState[MonsterKeyType.maxHP]).lte(new BigNumberJs(monsterState[MonsterKeyType.totalDamage]))) {
        _monsterStatus = IMonsterStatus.End
      } else {
        // 打怪兽时间开始 >=
        if (new BigNumberJs(now).gte(new BigNumberJs(monsterState[MonsterKeyType.challengeEndedAt]))) {
          _monsterStatus = IMonsterStatus.End
        } else if (new BigNumberJs(now).gte(new BigNumberJs(monsterState[MonsterKeyType.challengeStartedAt]))) {
          _monsterStatus = IMonsterStatus.Fight
        } else {
          // nft now <= 购买结束时间
          if (new BigNumberJs(now).lte(new BigNumberJs(monsterState[MonsterKeyType.nftEndedAt]))) {
            // nft 还没开始 >= 开始时间
            if (new BigNumberJs(now).gte(new BigNumberJs(monsterState[MonsterKeyType.nftStartedAt]))) {
              _monsterStatus = IMonsterStatus.MonsterNft
            }
          } else {
            // nft 停止售卖   等待打怪兽开启
            _monsterStatus = IMonsterStatus.WaitFight
          }
        }
      }
      _fightInfo = {
        totalPoint: monsterState[MonsterKeyType.maxHP],
        nowPoint: monsterState[MonsterKeyType.totalDamage]
      }
      if (now < Number(monsterState[MonsterKeyType.nftStartedAt])) {
      }
      setMonsterStatus(_monsterStatus)
      setFightInfo(_fightInfo)
    }
  }, [monsterStateStr, refreshMonster])
  useEffect(() => {
    try {
      if (accountMonsterState && monsterStatus) {
        let _monsterStatus = monsterStatus
        let _monsterUserStatus = ImonsterUserStatus.CannotGetCard
        if (monsterStatus === IMonsterStatus.MonsterNft) {
          if (new BigNumberJs(accountMonsterState?.[AccountMonsterKeyType.balance]).gt(0)) {
            _monsterUserStatus = ImonsterUserStatus.AlreadyHaveACard
            _monsterStatus = IMonsterStatus.WaitFight
          } else {
            if (`${accountMonsterState?.[AccountMonsterKeyType.matchRestriction]}` === 'true') {
              _monsterUserStatus = ImonsterUserStatus.CanGetACard
            }
          }
        } else if (monsterStatus === IMonsterStatus.WaitFight) {
          // console.log({ monsterStatus, a: accountMonsterState?.[AccountMonsterKeyType.balance] })
          // if (new BigNumberJs(accountMonsterState?.[AccountMonsterKeyType.balance]).lte(0)) {
          //   _monsterStatus = IMonsterStatus.MonsterNft
          // }
        } else if (monsterStatus === IMonsterStatus.Fight) {
          if (new BigNumberJs(accountMonsterState?.[AccountMonsterKeyType.balance]).gt(0)) {
            _monsterUserStatus = ImonsterUserStatus.Fight
          } else {
            _monsterUserStatus = ImonsterUserStatus.NoCard
          }
        } else if (monsterStatus === IMonsterStatus.End) {
          if (new BigNumberJs(accountMonsterState?.[AccountMonsterKeyType.balance]).gt(0)) {
            _monsterUserStatus = ImonsterUserStatus.ReceiveAward
          } else {
            _monsterUserStatus = ImonsterUserStatus.CannotReceiveAward
          }
        }
        if (monsterStatus !== _monsterStatus) {
          setMonsterStatus(_monsterStatus)
        }
        setMonsterUserStatus(_monsterUserStatus)
      }
    } catch (err) {
      // console.log({ err })
    }
  }, [monsterStatus, accountMonsterStateStr, refreshMonster])

  return { monsterLoading, fightInfo, monsterState, accountMonsterState, defenceAccountRankDataState, defenceRankDataState }
}
