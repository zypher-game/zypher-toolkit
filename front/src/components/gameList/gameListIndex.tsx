import { ChainId, IGameList, IGameName, useIsW768 } from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo, useState } from 'react'
import { Link } from 'react-router-dom'

import Icon from '@/assets/iconsLocal'
import { I2048GameList } from '@/pages/GamesIndex/hook/useRecentZ2048FromContract'

import GameListTableWidget from './bingo/gameListTable'
import GameListBorderSelect from './gameListBorderSelect'
import css from './gameListIndex.module.stylus'
import Z2048ListTableWidget from './z2048/Z2048ListTableWidget'
export type IGameListProps = {
  z2048Source: I2048GameList[]
  bingoDataSource: IGameList[]
  showFilter: boolean
  bingoDataSourceLoading: boolean
  z2048DataSourceLoading: boolean
  bingoHasError?: boolean
  z2048HasError?: boolean
  loadMorecss?: boolean
}
const GameListIndex = memo(
  ({
    z2048Source,
    bingoDataSourceLoading,
    z2048DataSourceLoading,
    z2048HasError,
    bingoDataSource,
    showFilter,
    bingoHasError,
    loadMorecss
  }: IGameListProps) => {
    const [selectValue, setSelectValue] = useState<ChainId | 'All'>('All')
    const [chooseGame, setChooseGame] = useState<IGameName>(IGameName.z2048)
    const isMobile = useIsW768()
    return (
      <div className={css.gameListIndex}>
        {showFilter ? (
          isMobile ? (
            <Link to={'/games/list'} className={css.more_right}>
              More
              <Icon name="right" />
            </Link>
          ) : null
        ) : null}
        <GameListBorderSelect
          chooseGame={chooseGame}
          setSelectValue={setSelectValue}
          setChooseGame={setChooseGame}
          selectValue={selectValue}
          showFilter={showFilter}
        />
        {chooseGame === IGameName.zBingo ? (
          <GameListTableWidget
            loading={bingoDataSourceLoading}
            hasError={bingoHasError}
            loadMorecss={loadMorecss}
            dataSource={bingoDataSource}
            selectValue={selectValue}
          />
        ) : null}
        {chooseGame === IGameName.z2048 ? (
          <Z2048ListTableWidget
            loading={z2048DataSourceLoading}
            hasError={z2048HasError}
            loadMorecss={loadMorecss}
            dataSource={z2048Source}
            selectValue={selectValue}
            showFilter={showFilter}
          />
        ) : null}
      </div>
    )
  },
  isEqual
)
export default GameListIndex
