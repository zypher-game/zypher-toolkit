import React, { memo } from 'react'

import TVLFooter from '@/pages/Active/components/TVLFooter/TVLFooter'
import { useGameListIndex } from '@/pages/Home/hooks/useGameListIndex'

import GameListDialog from '../../dialog/GameListDialog/GameListDialog'
import ZypherGamesDialog from '../../dialog/ZypherGames/ZypherGamesDialog'
import Banner from './components/Banner/Banner'
import GameItem from './components/GameItem/GameItem'
import Nav from './components/Nav/Nav'
import css from './GamesIndex.module.styl'
const GameIndex = memo(() => {
  const gameList = useGameListIndex()
  return (
    <div className={css.games}>
      <div className={css.inner}>
        {/* <Nav /> */}
        {/* <Banner /> */}
        <GameItem />
      </div>
      <TVLFooter />
      <ZypherGamesDialog />
      <GameListDialog {...gameList} showFilter={true} loadMorecss={true} />
    </div>
  )
})
export default GameIndex
