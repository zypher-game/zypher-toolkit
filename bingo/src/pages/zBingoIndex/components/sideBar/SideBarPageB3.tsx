import { ChainId, IGameList, preStaticUrl, useSetRecoilState } from '@ui/src'
import classnames from 'classnames'
import { isEqual } from 'lodash'
import React, { memo } from 'react'

import { IGameListBeta } from '@/hooks/useRecentGames'
import { gameListDialogState, rankingB3DialogState } from '@/pages/state/state'

import GameListDialog from '../dialog/GameListDialog'
import RankingB3Dialog from '../dialog/RankingB3Dialog'
import VideoDialog from '../dialog/VideoDialog'
import css from './SideBarPage.module.stylus'
export type ISide = {
  bingoMapList: Map<ChainId, IGameList[]> | undefined
  listBetaMapList: Map<ChainId, IGameListBeta[]> | undefined
  bingoHasError: boolean
}
const SideBarPageB3 = memo(({ bingoMapList, listBetaMapList, bingoHasError }: ISide) => {
  const setIsGameListModalOpen = useSetRecoilState(gameListDialogState)
  const setIsRankingModalOpen = useSetRecoilState(rankingB3DialogState)
  return (
    <div className={css.sidebar}>
      {/* <SideBarItem label="Tutorial" theme="blue" img="tutorial.png" onClick={() => setIsVideoModalOpen(true)} /> */}
      <SideBarItem label="Game list" theme="red" img="gamelist.png" onClick={() => setIsGameListModalOpen(true)} />
      <SideBarItem label="Ranking" theme="green" img="ranking.png" onClick={() => setIsRankingModalOpen(true)} />
      <RankingB3Dialog />
      <VideoDialog />
      <GameListDialog bingoMapList={bingoMapList} listBetaMapList={listBetaMapList} bingoHasError={bingoHasError} />
    </div>
  )
}, isEqual)
export const SideBarItem = memo(
  ({ label, theme, img, onClick }: { label: string; theme: 'blue' | 'red' | 'green' | 'brown'; img: string; onClick: any }) => {
    return (
      <div className={classnames(css.sidebarItem, css[theme])} onClick={onClick}>
        <div className={css.imageContainerWaves}>
          <div className={css.sidebarItemBg}>
            <div className={css.sidebarItemBgInner} />
          </div>
        </div>
        <img decoding="async" loading="lazy" src={preStaticUrl + '/img/bingo/' + img} alt={label} className={classnames(css.labelImg, 'labelImg')} />
        <p className={css.label}>{label}</p>
      </div>
    )
  },
  isEqual
)
export default SideBarPageB3
