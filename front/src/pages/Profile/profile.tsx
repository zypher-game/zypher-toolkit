import { IGameList, LngNs, useActiveWeb3React, useCustomTranslation, useIsMobile, useRecoilState } from '@ui/src'
import React, { memo, useState } from 'react'

import GameListIndex from '@/components/gameList/gameListIndex'

import { I2048GameList, useZ2048AccountFromGraph } from '../GamesIndex/hook/useRecentZ2048FromContract'
import { historyTabIndexState } from '../GamesIndex/state/GamesState'
import LevelRuleDialog from './components/dialog/levelRuleDialog'
import MonsterNftDialog from './components/dialog/monsterNftDialog'
import NFTs from './components/NFTs/NFTs'
import ProfileBanner from './components/profileBanner'
import ProfileTab from './components/tab'
import { useBingoCard, useGetBox, useZ2048Card } from './hooks/profileHook'
import { useBingoAccountFromGraph } from './hooks/useGetHistoryFromGraph'
import css from './profile.module.stylus'
import { profileBingoHistoryListState, profileZ2048HistoryListState } from './state/profileState'

const Profile = memo((): React.ReactElement | null => {
  const { account } = useActiveWeb3React()
  const [tab, setTab] = useRecoilState<number>(historyTabIndexState)
  const [nftTab, setNftTab] = useState(0)
  const [bingoHistoryList, setBingoHistoryList] = useRecoilState<IGameList[]>(profileBingoHistoryListState)
  const [z2048HistoryList, setZ2048HistoryList] = useRecoilState<I2048GameList[]>(profileZ2048HistoryListState)
  const { list, listLoading } = useGetBox(nftTab)
  const { z2048GamesLoading } = useZ2048AccountFromGraph({ z2048HistoryList, setZ2048HistoryList })
  const { bingoGamesLoading } = useBingoAccountFromGraph({ bingoHistoryList, setBingoHistoryList })
  const { list: bingoList, listLoading: bingoListLoading } = useBingoCard({ tab, bingoHistoryList })
  const { list: z2048List, listLoading: z2048ListLoading } = useZ2048Card({ tab, z2048HistoryList })

  const isMobile = useIsMobile()
  const { t } = useCustomTranslation([LngNs.profile])

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
            <div className={css.profileInnerBottom} />
          </div>
        </div>
      </div>
      <LevelRuleDialog />
      <MonsterNftDialog />
    </>
  )
})

export default Profile
