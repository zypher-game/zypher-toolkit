import { TelegramUserInfoDto } from '@ui/src'
import { useIsW768 } from '@ui/src'
import { Spin } from 'antd'
import classnames from 'classnames'
import React, { useMemo } from 'react'

import NoDataPage from '@/pages/components/NoData'

import css from '../../RankingDialog/Ranking/Ranking.module.stylus'
import RankingTgMy from './components/rankingTgMy'
import RankingTgTable from './components/rankingTgTable'
interface IProps {
  rankingList: TelegramUserInfoDto[] | undefined
  tab: number
  setTab: React.Dispatch<React.SetStateAction<number>>
  loading: boolean
  myItem: TelegramUserInfoDto | undefined
  className?: boolean
}

const Ranking = (props: IProps): React.ReactElement | null => {
  const { rankingList, tab, loading, myItem } = props
  const isMobile = useIsW768()
  const Inner = useMemo(() => {
    if (loading || !rankingList || !rankingList) {
      return (
        <div className={classnames('lt-spin', css.loadMore)}>
          <Spin size="large" tip="Loading..." />
        </div>
      )
    }
    if (rankingList.length === 0) {
      return <NoDataPage />
    }
    return (
      <>
        {rankingList && rankingList.length > 0 && <RankingTgTable players={rankingList} isMobile={isMobile} tab={tab} myItem={myItem} />}
        {myItem && <RankingTgMy player={myItem} tab={tab} isMobile={isMobile} />}
      </>
    )
  }, [loading, rankingList])
  return <div className={classnames(css.ranking, { [css.myItem]: !!myItem })}>{Inner}</div>
}
export default Ranking
