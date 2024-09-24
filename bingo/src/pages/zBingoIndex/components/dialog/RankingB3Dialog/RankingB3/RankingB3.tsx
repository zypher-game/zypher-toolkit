import { useIsW768 } from '@ui/src'
import { useEffectValue } from '@ui/src/hooks/useEffectValue'
import { Spin } from 'antd'
import classnames from 'classnames'
import React, { useEffect, useMemo, useState } from 'react'

import css from '../../RankingDialog/Ranking/Ranking.module.stylus'
import RankingB3My from './components/rankingB3My'
import RankingB3Table from './components/rankingB3Table'
import { IB3Info } from './hooks/RankingB3Hooks'
export const defaultUser: IB3Info = {
  gameTotalNum: '',
  gameTotalNumStr: '-',
  gameName: '',
  gameWinNum: '',
  gameWinNumStr: '-',
  address: '-',
  winningPercent: '-',
  rank: ''
}
interface IProps {
  rankingList: IB3Info[] | undefined
  tab: number
  setTab: React.Dispatch<React.SetStateAction<number>>
  loading: boolean
  myItem: IB3Info | undefined
  className?: boolean
}

const Ranking = (props: IProps): React.ReactElement | null => {
  const { rankingList, tab, loading, myItem } = props
  const isMobile = useIsW768()
  const [showList, setShowList] = useState<IB3Info[]>([])
  useEffect(() => {
    const newList = (rankingList ?? []).slice()
    while (newList.length < 100) {
      newList.push({
        ...defaultUser,
        rank: `${newList.length + 1}`
      })
    }
    setShowList(newList)
  }, [JSON.stringify(rankingList)])
  const Inner = useMemo(() => {
    if (loading || !showList) {
      return (
        <div className={classnames('lt-spin', css.loadMore)}>
          <Spin size="large" tip="Loading..." />
        </div>
      )
    }
    return (
      <>
        {showList && showList.length > 0 && <RankingB3Table players={showList} isMobile={isMobile} tab={tab} myItem={myItem} />}
        {myItem && <RankingB3My player={myItem} tab={tab} isMobile={isMobile} />}
      </>
    )
  }, [loading, rankingList])
  return <div className={classnames(css.ranking, { [css.myItem]: !!myItem })}>{Inner}</div>
}
export default Ranking
