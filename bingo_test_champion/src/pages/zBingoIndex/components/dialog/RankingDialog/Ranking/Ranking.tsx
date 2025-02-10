import { useCustomTranslation } from '@ui/src'
import { useIsW768 } from '@ui/src'
import { LngNs } from '@ui/src'
import { Spin } from 'antd'
import classnames from 'classnames'
import React, { useMemo } from 'react'

import NoDataPage from '@/pages/components/NoData'

import RankingMy from './components/rankingMy'
import RankingTable from './components/rankingTable'
import Tab from './components/tab'
import css from './Ranking.module.stylus'
export type IPlayerRankingItem = {
  index?: number
  address: string
  amount?: string

  joinAmount?: string
  winAmount?: string
}
interface IProps {
  rankingList: IPlayerRankingItem[] | undefined
  tab: number
  setTab: React.Dispatch<React.SetStateAction<number>>
  loading: boolean
  myItem: IPlayerRankingItem | undefined
  className?: boolean
}

const Ranking = (props: IProps): React.ReactElement | null => {
  const { rankingList, tab, setTab, loading, myItem } = props
  const { t } = useCustomTranslation([LngNs.zBingo])
  const isMobile = useIsW768()
  const Inner = useMemo(() => {
    if (loading || rankingList === undefined) {
      return (
        <div className={classnames('lt-spin', css.loadMore)}>
          <Spin size="large" tip="Loading..." />
        </div>
      )
    }
    if (rankingList && rankingList.length === 0) {
      return <NoDataPage />
    }
    return (
      <>
        {rankingList && rankingList.length > 0 && <RankingTable players={rankingList} isMobile={isMobile} tab={tab} myItem={myItem} />}
        {myItem && <RankingMy player={myItem} tab={tab} isMobile={isMobile} />}
      </>
    )
  }, [loading, rankingList])
  return (
    <div className={classnames(css.ranking, { [css.myItem]: !!myItem })}>
      <Tab tab={tab} className={css.rankingTab} setTab={setTab} list={[t('Pledged'), t('Winnings')]} />
      {Inner}
    </div>
  )
}
export default Ranking
