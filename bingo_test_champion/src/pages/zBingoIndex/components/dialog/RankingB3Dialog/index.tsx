import { DialogContent, DialogOverlay } from '@reach/dialog'
import { preStaticUrl, useIsW768, useRecoilValue, useSetRecoilState } from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo, useCallback } from 'react'

import { rankingB3DialogState } from '@/pages/state/state'

import css from '../RankingDialog/index.module.stylus'
import RankingB3 from './RankingB3'
import { useB3Ranking } from './RankingB3/hooks/RankingB3Hooks'

const RankingB3Dialog = memo(() => {
  const { ranking: rankingList, tab, setTab, loading, myItem } = useB3Ranking()
  const isMobile = useIsW768()
  const isModalOpen = useRecoilValue(rankingB3DialogState)
  const setIsModalOpen = useSetRecoilState(rankingB3DialogState)
  const handleCancel = useCallback(() => {
    setIsModalOpen(false)
  }, [])
  return (
    <>
      <DialogOverlay isOpen={isModalOpen} onDismiss={handleCancel} className={css.bg}>
        <DialogContent
          className={css.rankingInner}
          style={{
            padding: myItem ? (isMobile ? '100px 0 83px' : '100px 0px 111px') : '100px 0 60px',
            backgroundImage: `url(${preStaticUrl}/img/bingo/${myItem ? 'ranking_bg' : 'ranking_bg_01'}${isMobile ? '_m' : ''}.png)`
          }}
        >
          <img decoding="async" loading="lazy" src={preStaticUrl + `/img/bingo/close.svg`} alt="close" className={css.close} onClick={handleCancel} />
          <img decoding="async" loading="lazy" src={preStaticUrl + '/img/bingo/ranking_title.png'} alt="ranking" className={css.title} />
          <RankingB3 rankingList={rankingList} tab={tab} setTab={setTab} loading={loading} myItem={myItem} />
        </DialogContent>
      </DialogOverlay>
    </>
  )
}, isEqual)
export default RankingB3Dialog
