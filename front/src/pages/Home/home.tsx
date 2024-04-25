import { IsMdProvider, useIsMobile } from '@UI/src/'
import React from 'react'

import BannerV2Widget from './components/banner/bannerV2'
import Data from './components/data'
import GameListIndex from './components/gameList/gameListIndex'
import GamesWidget from './components/games'
import HomeGameList from './components/HomeGameList'
import MarqueeWidget from './components/marquee'
import { HomeListItem, HomeTitle } from './components/widget'
import { useDataInfo } from './hooks/useDataInfo'
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
