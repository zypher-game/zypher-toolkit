import { IGameName } from '@ui/src'
import { ChainId, IGameList } from '@ui/src'
import { List } from 'antd'
import { isEqual } from 'lodash'
import React, { memo, useEffect, useMemo, useRef, useState } from 'react'

import { IsPixelWidgetTable } from '@/components/gameList/bingo/gameListTable'
import css from '@/components/gameList/bingo/gameListTable.module.stylus'
import MobileRow from '@/components/gameList/bingo/tableRow/m/MobileRow'
import GameListBorderSelect from '@/components/gameList/gameListBorderSelect'
import Z2048MobileRow from '@/components/gameList/z2048/tableRow/m/Z2048MobileRow'
import { NotDataWithLoading } from '@/components/NoData'

import { I2048GameList } from '../GamesIndex/hook/useRecentZ2048FromContract'
import { HomeListItem } from '../Home/components/widget'
import { useGameListIndex } from '../Home/hooks/useGameListIndex'

const GamesList = memo(() => {
  const [selectValue, setSelectValue] = useState<ChainId | 'All'>('All')
  const [chooseGame, setChooseGame] = useState<IGameName>(IGameName.z2048)
  const targetRef = useRef<HTMLDivElement>(null)
  const { bingoHasError, bingoDataSource, z2048Source, z2048HasError, bingoDataSourceLoading, z2048DataSourceLoading } = useGameListIndex()

  useEffect(() => {
    if (targetRef.current != null) {
      targetRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }, [])
  const showBingoData = useMemo(() => {
    if (bingoDataSource.length && selectValue && selectValue !== 'All') {
      return bingoDataSource.filter(v => v.chainId === selectValue).slice(0, 20)
    }
    return bingoDataSource.slice(0, 20)
  }, [bingoDataSource.length, selectValue])

  const showZ2048Data = useMemo(() => {
    if (z2048Source.length && selectValue && selectValue !== 'All') {
      return z2048Source.filter(v => v.chainId === selectValue).slice(0, 20)
    }
    return z2048Source.slice(0, 20)
  }, [z2048Source.length, selectValue])
  return (
    <div className={css.games_list_content} ref={targetRef}>
      <HomeListItem>
        <GameListBorderSelect
          className={css.games_list_filter}
          setSelectValue={setSelectValue}
          selectValue={selectValue}
          setChooseGame={setChooseGame}
          chooseGame={chooseGame}
          showFilter={true}
        />
        <IsPixelWidgetTable>
          {chooseGame === IGameName.zBingo ? (
            showBingoData.length === 0 ? (
              <List
                locale={{
                  emptyText: (
                    <NotDataWithLoading loading={bingoDataSourceLoading} hasError={bingoHasError} errorCss={css.error} loadMoreCss={css.loadMore} />
                  )
                }}
              />
            ) : (
              showBingoData.map((v: IGameList) => <MobileRow key={v.roomID} item={v} />)
            )
          ) : null}
          {chooseGame === IGameName.z2048 ? (
            showZ2048Data.length === 0 ? (
              <List
                locale={{
                  emptyText: (
                    <NotDataWithLoading loading={z2048DataSourceLoading} hasError={z2048HasError} errorCss={css.error} loadMoreCss={css.loadMore} />
                  )
                }}
              />
            ) : (
              z2048Source.map((v: I2048GameList) => <Z2048MobileRow key={v.tokenIdStr} item={v} showFilter={false} />)
            )
          ) : null}
        </IsPixelWidgetTable>
      </HomeListItem>
    </div>
  )
}, isEqual)
export default GamesList
