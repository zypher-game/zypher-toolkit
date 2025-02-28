import { ChainId, IGameList, preStaticUrl } from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo } from 'react'
import { zeroAddress } from 'viem'

import { useScale } from '@/pages/components/ScaleProvider/ScaleProvider'
import ResultModalChampion from '@/pages/GameRoom/resultModalChampion'

import Inner from '../Inner/Inner'
import ChampionBoard from './components/ChampionBoard'
import { useChampion } from './hooks/useChampion'
import css from './InnerChampion.module.stylus'
import { TabTextList } from './state/championState'

const InnerChampion = memo(({ bingoMapList, bingoHasError }: { bingoMapList: Map<ChainId, IGameList[]> | undefined; bingoHasError: boolean }) => {
  const { tab, setTabHandle, bg } = useChampion()
  const { scale } = useScale()

  if (!bg) {
    return <></>
  }
  return (
    <div
      className={`${css.innerChampion} ${bg || ''}`}
      style={{
        backgroundImage: `url(${preStaticUrl}/img/bingo/${bg}.webp)`,
        transform: `translate(-50%, -50%) scale(${scale})`
      }}
    >
      <div className={css.tabHeader}>
        {TabTextList.map(v => (
          <p
            className={`${css.tabItem} ${css[`tabItem${v.key}`]} ${tab.key === v.key ? css.on : css.off}`}
            key={v.key}
            onClick={() => setTabHandle(v)}
          >
            {v.text}
          </p>
        ))}
      </div>
      {tab.key ? <Inner bingoMapList={bingoMapList} bingoHasError={bingoHasError} className={css.innerFromChampion} /> : <ChampionBoard />}
    </div>
  )
}, isEqual)

export default InnerChampion
