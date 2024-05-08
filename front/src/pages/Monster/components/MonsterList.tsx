import { preStaticUrl, useActiveWeb3React } from '@ui/src'
import { useCustomTranslation } from '@ui/src'
import { getShortenAddress, LngNs } from '@ui/src'
import { PlayerAvatar } from '@ui/src'
import classnames from 'classnames'
import { isEqual } from 'lodash'
import React, { FC, memo, useMemo } from 'react'

import BigNumberJs from '@/utils/BigNumberJs'

import { IDefenceRankDataItem } from '../hooks/monster.types'
import css from './MonsterList.module.stylus'
type IProps = {
  defenceRankDataState?: IDefenceRankDataItem[]
  defenceAccountRankDataState?: IDefenceRankDataItem
  classNames: string
}
const MonsterList = memo(({ defenceRankDataState, defenceAccountRankDataState, classNames }: IProps) => {
  const { account } = useActiveWeb3React()
  const { t } = useCustomTranslation([LngNs.defense])
  return (
    <div className={classNames}>
      <div className={css.monsterList}>
        <div className={css.title}>
          <div className={css.tip}>
            <img src={preStaticUrl + `/img/monster/title_bg.png`} alt="tip" />
            <p>{t('Tips')}</p>
          </div>
          <p className={css.tipText}>{t('MonsterListText1')}</p>
        </div>
        <div className={css.scroll}>
          <div className={css.scrollList}>{!!defenceRankDataState && defenceRankDataState.map(v => <MonsterListItem key={v.rank} item={v} />)}</div>
        </div>
        {!!account && !!defenceAccountRankDataState && <MonsterListItem item={defenceAccountRankDataState} className="my" />}
      </div>
    </div>
  )
}, isEqual)
type IMonsterListItem = {
  className?: string
  item: IDefenceRankDataItem
}
const MonsterListItem = memo(({ item, className }: IMonsterListItem) => {
  return (
    <div className={classnames(css.monsterListItem, css[`${className}`])}>
      {!!item.rank && <RankCol rank={item.rank} account={item.address} />}
      <div className={css.monsterListItemInfo}>
        <p>
          {getShortenAddress(item.address)} {className === 'my' ? '( YOU )' : null}
        </p>
        <div className={css.monsterListItemInfoBg}>
          <img src={preStaticUrl + `/img/monster/fight02.png`} alt="fight" />
          <p>{item.pointStr}</p>
        </div>
      </div>
    </div>
  )
}, isEqual)

type IProp = { rank: string; account: string }
const RankCol: FC<IProp> = memo(({ rank, account }: IProp) => {
  const rankId = useMemo(() => {
    if (rank && rank !== 'undefined') {
      if (new BigNumberJs(rank).isLessThan(4)) {
        return <img className={css.img} src={preStaticUrl + `/img/invitation/rank${rank}.svg`} title="invitation" />
      }
      return <p className={css.p}>{rank}</p>
    }
    return undefined
  }, [rank])
  return (
    <div className={css.rank}>
      {rankId && <div className={css.rankIcon}>{rankId}</div>}
      <PlayerAvatar size={48} className={css.account} account={account} showAccount={false} border={false} AvatarBorder={ShowAvatarBorderWidget} />
    </div>
  )
}, isEqual)
const ShowAvatarBorderWidget = memo(({ children }: { children: React.ReactNode }) => {
  return <div className={css.avatarBorder}>{children}</div>
})
export default MonsterList
