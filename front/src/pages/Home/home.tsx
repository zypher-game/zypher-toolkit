import { IsMdProvider, useIsMobile } from '@ui/src'
import React from 'react'

import GameListIndex from '@/components/gameList/gameListIndex'

import { useDataInfo } from '../GamesIndex/hook/useDataInfo'
import Data from '../GamesIndex/view/GamesIndex/components/Data/data'
import BannerV2Widget from './components/banner/bannerV2'
import GamesWidget from './components/games'
import HomeGameList from './components/HomeGameList'
import MarqueeWidget from './components/marquee'
import { HomeListItem, HomeTitle } from './components/widget'
import { useGameListIndex } from './hooks/useGameListIndex'
import css from './index.module.stylus'
const Home: React.FC = () => {
  const { bingoHasError, bingoDataSource, z2048Source, z2048HasError, bingoDataSourceLoading, z2048DataSourceLoading } = useGameListIndex()

  const { data } = useDataInfo()
  const isMobile = useIsMobile()
  return (
    <IsMdProvider>
      {/* <ButtonFollowerCount /> */}
      <div className={css.home}>
        <div className={css.top}>
          <MarqueeWidget />
        </div>
        <div className={css.content}>
          <BannerV2Widget />
          <HomeGameList />
          <Data data={data} />
          <HomeListItem>
            <HomeTitle label="Games List" label_icon="gameList.svg" />
            <GameListIndex
              z2048Source={z2048Source}
              bingoDataSource={bingoDataSource}
              showFilter={true}
              z2048HasError={z2048HasError}
              bingoDataSourceLoading={bingoDataSourceLoading}
              z2048DataSourceLoading={z2048DataSourceLoading}
              bingoHasError={bingoHasError}
              loadMorecss={true}
            />
          </HomeListItem>

          <GamesWidget isMobile={isMobile} />
          <div className={css.footer}>Copyright © 2023 Zypher Games. All rights reserved.</div>
        </div>
      </div>
    </IsMdProvider>
  )
}

export default Home
