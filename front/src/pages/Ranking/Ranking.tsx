import { useCustomTranslation } from '@ui/src'
import { useIsW768 } from '@ui/src'
import { LngNs } from '@ui/src'
import { Spin } from 'antd'
import classnames from 'classnames'
import React, { useMemo } from 'react'

import NoDataPage from '@/components/NoData'

import ProfileTab from '../Profile/components/tab'
import RankingBanner from './components/rankingBanner'
import RankingMy from './components/rankingMy'
import RankingTable from './components/rankingTable'
import { useRanking } from './hooks/rankingHooks'
import css from './Ranking.module.stylus'
export type IPlayerRankingItem = {
  index?: number
  address: string
  amount?: string

  joinAmount?: string
  winAmount?: string
}
interface IProps {
  className?: boolean
}

const Ranking = (props: IProps): React.ReactElement | null => {
  const { t } = useCustomTranslation([LngNs.zBingo])
  const isMobile = useIsW768()
  const { ranking: rankingList, tab, setTab, loading, myItem } = useRanking()
  const rankingPreList: IPlayerRankingItem[] | undefined = useMemo(() => {
    if (rankingList) {
      return rankingList.slice(0, 3)
    }
    return []
  }, [rankingList])
  const rankingLastList: IPlayerRankingItem[] | undefined = useMemo(() => {
    if (rankingList) {
      return rankingList.slice(3)
    }
    return []
  }, [rankingList])
  const Inner = useMemo(() => {
    if (loading || !rankingList || !rankingPreList) {
      return (
        <div className={classnames(css.loadMore)}>
          <Spin size="large" tip="Loading..." />
        </div>
      )
    }
    if (rankingPreList.length === 0) {
      return <NoDataPage />
    }
    return (
      <>
        <RankingBanner players={rankingPreList} isMobile={isMobile} />
        {rankingLastList && rankingLastList.length > 0 && <RankingTable players={rankingLastList} isMobile={isMobile} tab={tab} />}
        {myItem && <RankingMy player={myItem} tab={tab} isMobile={isMobile} />}
      </>
    )
  }, [loading, rankingPreList])
  return (
    <div className={css.ranking}>
      <ProfileTab tab={tab} className={css.rankingTab} setTab={setTab} list={[t('Pledged'), t('Winnings')]} />
      {Inner}
    </div>
  )
}
export default Ranking
