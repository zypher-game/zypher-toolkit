import { DialogContent, DialogOverlay } from '@reach/dialog'
import { preStaticUrl, useIsW768, useRecoilValue, useSetRecoilState } from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo, useCallback, useRef } from 'react'

import { rankingTgDialog } from '@/pages/state/state'

import css from '../RankingDialog/index.module.stylus'
import RankingTg from './RankingTg'
import { useTgRanking } from './RankingTg/hooks/RankingTgHooks'

const RankingTgDialog = memo(() => {
  const { ranking: rankingList, tab, setTab, loading, myItem } = useTgRanking()
  const isMobile = useIsW768()
  const isModalOpen = useRecoilValue(rankingTgDialog)
  const setIsModalOpen = useSetRecoilState(rankingTgDialog)
  const handleCancel = useCallback(() => {
    setIsModalOpen(false)
  }, [])
  console.log({ isModalOpen })
  return (
    <>
      <DialogOverlay isOpen={isModalOpen} onDismiss={handleCancel} className={css.bg}>
        <DialogContent
          className={css.rankingInner}
          style={{
            padding: myItem ? (isMobile ? '100px 0 83px' : '100px 0 108px') : '100px 0 60px',
            backgroundImage: `url(${preStaticUrl}/img/bingo/${myItem ? 'ranking_bg' : 'ranking_bg_01'}${isMobile ? '_m' : ''}.png)`
          }}
        >
          <img src={preStaticUrl + `/img/bingo/close.svg`} alt="close" className={css.close} onClick={handleCancel} />
          <img src={preStaticUrl + '/img/bingo/ranking_title.png'} alt="ranking" className={css.title} />
          <RankingTg rankingList={rankingList} tab={tab} setTab={setTab} loading={loading} myItem={myItem} />
        </DialogContent>
      </DialogOverlay>
    </>
  )
}, isEqual)
export default RankingTgDialog
