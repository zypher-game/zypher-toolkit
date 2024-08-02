import { useAvatar } from '@ui/src'
import { Avatar } from 'antd'
import React from 'react'
import styled from 'styled-components'

const { Group } = Avatar

const AvatarContainer = styled(Group)`
  flex-direction: row-reverse;
  .custom-avatar {
    border: 0px;
  }
`
const AvatarBorder = styled.div`
  background: linear-gradient(180deg, #f1a541 0%, #d48a2b 45.31%, #9f5a03 100%);
  box-shadow: 0px 1px 1px #cd9862;
  border-radius: 50%;
  padding: 2px;
  position: relative;
  &:not(:last-child) {
    margin-left: -28px;
  }
  &:last-child {
    margin-left: 0px;
    /* background: linear-gradient(180deg, #8fca3a 0%, #59b11c 32.81%, #259900 100%); */
    background: linear-gradient(180deg, #8fca3a 0%, #59b11c 32.81%, #259900 100%);
    /* filter: drop-shadow(0px 1px 2px rgba(117, 59, 0, 0.79)); */
    /* box-shadow: 0px 1px 2px 0px rgba(117, 59, 0, 0.79); */
    .outer-ring {
      background: linear-gradient(180deg, #289b02 0%, #65b724 29.17%, #8cc939 100%);
    }
    .inner-ring {
      background: #613c17;
    }
  }
  .outer-ring {
    background: linear-gradient(180deg, #ae6306 0%, #d68b2b 29.69%, #e79b3b 100%);
    border-radius: 50%;
  }
  .inner-ring {
    background: #613c17;
    margin: 2px;
    box-shadow: inset 0px 2px 0px rgba(0, 0, 0, 0.25);
    border-radius: 50%;
  }
`

type Iplay = {
  user: string
}

type IAvatarGroup = {
  players: any[]
  targetUser?: string
  border?: boolean
}

const AvatarGroup: React.FC<IAvatarGroup> = ({ players, targetUser, border }) => {
  const sortedPlayers = [...players]

  sortedPlayers.sort((a, b) => {
    if (a.user === targetUser) {
      return 1 // 将具有目标user的对象排在后面
    } else if (b.user === targetUser) {
      return -1 // 将具有目标user的对象排在前面
    } else {
      return 0 // 保持原顺序
    }
  })
  return (
    <>
      <AvatarContainer>
        {sortedPlayers.map(player => (
          <AvatarBorder key={player.user}>
            <div className="outer-ring">
              <div className="inner-ring">
                <AvatarGroupList address={player.isAbandoned ? '' : player.user} size={48} border />
              </div>
            </div>
          </AvatarBorder>
        ))}
      </AvatarContainer>
    </>
  )
}

type IAvatarGroupList = {
  address: string
  border?: boolean
  size?: number
  style?: React.CSSProperties
}

export const AvatarGroupList: React.FC<IAvatarGroupList> = ({ address, size, style, border }) => {
  const { selectedAvatar, selectedBackground } = useAvatar(address, false)

  return (
    <Avatar
      size={size}
      className="custom-avatar"
      src={selectedAvatar}
      style={{ background: selectedBackground, ...style, border: !border ? '1px solid #613C17' : '' }}
      alt={`${address}`}
    />
  )
}

export default AvatarGroup
