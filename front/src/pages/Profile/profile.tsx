import { useActiveWeb3React, walletModalOpenState } from '@UI/src/'
import { IGameList, useRecoilState, useSetRecoilState } from '@UI/src/'
import { useCustomTranslation } from '@UI/src/'
import { useIsMobile } from '@UI/src/'
import { LngNs } from '@UI/src/'
import React, { useEffect, useState } from 'react'

import GameListIndex from '@/components/gameList/gameListIndex'

import { I2048GameList, useZ2048AccountFromGraph } from '../Home/hooks/useRecentZ2048FromContract'
import LevelRuleDialog from './components/dialog/levelRuleDialog'
import MonsterNftDialog from './components/dialog/monsterNftDialog'
import NFTs from './components/NFTs/NFTs'
import ProfileBanner from './components/profileBanner'
import ProfileTab from './components/tab'
import { useBingoCard, useGetBox, useZ2048Card } from './hooks/profileHook'
import { useBingoAccountFromGraph } from './hooks/useGetHistoryFromGraph'
import css from './profile.module.stylus'
import { profileBingoHistoryListState, profileZ2048HistoryListState } from './state/profileState'

interface IProps {
  className?: boolean
}

export default (props: IProps): React.ReactElement | null => {
  const { account } = useActiveWeb3React()
  const [tab, setTab] = useState(0)
  const [nftTab, setNftTab] = useState(0)
  const setDialogOpen = useSetRecoilState(walletModalOpenState)
  const [bingoHistoryList, setBingoHistoryList] = useRecoilState<IGameList[]>(profileBingoHistoryListState)
  const [z2048HistoryList, setZ2048HistoryList] = useRecoilState<I2048GameList[]>(profileZ2048HistoryListState)
  const { list, listLoading } = useGetBox(nftTab)
  const { z2048GamesLoading } = useZ2048AccountFromGraph({ z2048HistoryList, setZ2048HistoryList })
  const { bingoGamesLoading } = useBingoAccountFromGraph({ bingoHistoryList, setBingoHistoryList })
  const { list: bingoList, listLoading: bingoListLoading } = useBingoCard({ tab, bingoHistoryList })
  const { list: z2048List, listLoading: z2048ListLoading } = useZ2048Card({ tab, z2048HistoryList })

  const isMobile = useIsMobile()
  const [timer, setTime] = useState<number>()
  const { t } = useCustomTranslation([LngNs.profile])
  useEffect(() => {
    setTimeout(() => {
      setTime(1)
    }, 1000)
  }, [])
  useEffect(() => {
    if (timer) {
      if (account) {
        setDialogOpen(false)
      } else {
        setDialogOpen(true)
      }
    }
  }, [timer, account])

  return (
    <>
      <div className={css.profile}>
        <div className={css.content}>
          <ProfileBanner account={account} isMobile={isMobile} />
          <ProfileTab tab={tab} setTab={setTab} list={[t('History'), 'NFTs']} />
          <div className={css.main}>
            {tab === 0 ? (
              <GameListIndex
                z2048Source={z2048HistoryList}
                bingoDataSource={bingoHistoryList}
                showFilter={false}
                z2048HasError={false}
                bingoDataSourceLoading={bingoGamesLoading ?? true}
                z2048DataSourceLoading={z2048GamesLoading ?? true}
                bingoHasError={false}
                loadMorecss={false}
              />
            ) : (
              <NFTs
                nftTab={nftTab}
                setNftTab={setNftTab}
                z2048List={z2048List}
                z2048ListLoading={z2048ListLoading || z2048GamesLoading}
                bingoList={bingoList}
                bingoListLoading={bingoListLoading}
                bingoGamesLoading={bingoGamesLoading}
                listLoading={listLoading}
                list={list}
              />
            )}
          </div>
        </div>
      </div>
      <LevelRuleDialog />
      <MonsterNftDialog />
    </>
  )
}
