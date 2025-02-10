import { useSetRecoilState } from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo } from 'react'

import { DialogTaskListState, rankingTgDialog } from '@/pages/state/state'

import RankingTgDialog from '../dialog/RankingTgDialog'
import TaskTgDialog from '../dialog/TaskTgDialog'
import { SideBarItem } from './SideBarPage'
import css from './SideBarPage.module.stylus'
const SideBarTelegram = memo(() => {
  const setIsRankingTgModalOpen = useSetRecoilState(rankingTgDialog)
  const setIsTaskTgModalOpen = useSetRecoilState(DialogTaskListState)

  return (
    <div className={css.sidebar}>
      <SideBarItem label="Ranking" theme="green" img="ranking.png" onClick={() => setIsRankingTgModalOpen(true)} />
      <SideBarItem label="Task" theme="brown" img="task.png" onClick={() => setIsTaskTgModalOpen(true)} />
      <RankingTgDialog />
      <TaskTgDialog />
    </div>
  )
}, isEqual)
export default SideBarTelegram
