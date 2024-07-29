import { ChainId, IGameList, preStaticUrl, useRecoilValue, useSetRecoilState } from '@zypher-game/toolkit/ui'
import classnames from 'classnames'
import { isEqual } from 'lodash'
import React, { memo } from 'react'

import { IGameListBeta } from '@/hooks/useRecentGames'
import { bingoVersionState, gameListDialogState, IBingoVersion, rankingDialogState } from '@/pages/state/state'

import GameListDialog from '../dialog/GameListDialog'
import RankingDialog from '../dialog/RankingDialog'
import VideoDialog from '../dialog/VideoDialog'
import css from './sideBar.module.stylus'
const SideBar = memo(
  ({
    bingoMapList,
    listBetaMapList,
    bingoHasError
  }: {
    bingoMapList: Map<ChainId, IGameList[]> | undefined
    listBetaMapList: Map<ChainId, IGameListBeta[]> | undefined
    bingoHasError: boolean
  }) => {
    const bingoVersion = useRecoilValue(bingoVersionState)
    const setIsGameListModalOpen = useSetRecoilState(gameListDialogState)
    const setIsRankingModalOpen = useSetRecoilState(rankingDialogState)
    return (
      <div className={css.sidebar}>
        {/* <SideBarItem label="Tutorial" theme="blue" img="tutorial.png" onClick={() => setIsVideoModalOpen(true)} /> */}
        <SideBarItem label="Game list" theme="red" img="gamelist.png" onClick={() => setIsGameListModalOpen(true)} />
        {bingoVersion === IBingoVersion.beta ? null : (
          <>
            <SideBarItem label="Ranking" theme="green" img="ranking.png" onClick={() => setIsRankingModalOpen(true)} />
            <RankingDialog />
          </>
        )}
        <VideoDialog />
        <GameListDialog bingoMapList={bingoMapList} listBetaMapList={listBetaMapList} bingoHasError={bingoHasError} />
      </div>
    )
  },
  isEqual
)
const SideBarItem = memo(({ label, theme, img, onClick }: { label: string; theme: 'blue' | 'red' | 'green'; img: string; onClick: any }) => {
  return (
    <div className={classnames(css.sidebarItem, css[theme])} onClick={onClick}>
      <div className={css.imageContainerWaves}>
        <div className={css.sidebarItemBg}>
          <div className={css.sidebarItemBgInner} />
        </div>
      </div>
      <img src={preStaticUrl + '/img/bingo/' + img} alt={label} className={classnames(css.labelImg, 'labelImg')} />
      <p className={css.label}>{label}</p>
    </div>
  )
}, isEqual)
export default SideBar
