import './styles.css'

import React, { useEffect, useState } from 'react'
import { animated, useTransition } from 'react-spring'

import data from './data'
import styles from './styles.module.css'
type IAvatarQueue = {
  players: any[]
  targetUser?: string
}

const AvatarQueue: React.FC<IAvatarQueue> = ({ players, targetUser }) => {
  const [avatars, setAvatars] = useState(data)
  const transitions = useTransition(
    avatars.map(data => ({ ...data, y: data.height })),
    {
      key: (item: any) => item.name,
      from: { height: 0, opacity: 0 },
      leave: { height: 0, opacity: 0 },
      enter: ({ y, height }) => ({ y, height, opacity: 1 }),
      update: ({ y, height }) => ({ y, height })
    }
  )

  const moveAvatarToFront = (address: string) => {
    const reorderedAvatars = [...avatars]
    const targetIndex = reorderedAvatars.findIndex(avatar => avatar.address === address)
    if (targetIndex !== -1) {
      const [targetAvatar] = reorderedAvatars.splice(targetIndex, 1)
      reorderedAvatars.unshift(targetAvatar)
      setAvatars(reorderedAvatars)
    }
  }

  return (
    <div className="avatar-container">
      {transitions((style, item, index) => (
        <animated.div className="avatar" style={{ ...style }}>
          <div className={styles.details} style={{ backgroundImage: item.css }}>
            {item.name}
          </div>
        </animated.div>
      ))}
      <button onClick={() => moveAvatarToFront('789')}>下一个</button>
    </div>
  )
}

export default AvatarQueue
