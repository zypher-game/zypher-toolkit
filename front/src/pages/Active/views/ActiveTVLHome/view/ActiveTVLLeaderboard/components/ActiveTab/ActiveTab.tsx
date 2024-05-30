import React, { memo } from 'react'

import css from './ActiveTab.module.styl'
const ActiveTab = memo(({ index, setIndex }: { index: number; setIndex: React.Dispatch<React.SetStateAction<number>> }) => {
  return (
    <ul className={css.activeTab}>
      {['Leaderboard', 'Recently Joined'].map((v, _index) => (
        <li key={v} className={`${index === _index ? css.on : ''}`} onClick={() => setIndex(_index)}>
          <p>{v}</p>
          <div className={css.line} />
        </li>
      ))}
    </ul>
  )
})
export default ActiveTab
