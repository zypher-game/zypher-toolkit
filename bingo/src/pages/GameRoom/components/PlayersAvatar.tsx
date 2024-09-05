import { addressIsEqual, getShortenAddress, IPlayer, LngNs, PlayerAvatarList, useCustomTranslation } from '@ui/src'
import { Space } from 'antd'
import { isEqual } from 'lodash'
import React, { memo } from 'react'
import styled from 'styled-components'

const PlayersWrapper = styled.div<{ highLight: boolean; leave: boolean }>`
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 30px;
  border-color: ${({ highLight }) => (highLight ? '#58d31e' : '#ffd893')};
  border-width: 3px;
  border-style: solid;
  color: #814700;
  font-family: Lemon;
  width: 100%;
  /* box-shadow: ${({ highLight }) =>
    highLight
      ? '0px -0.10000000149011612px 2px 0px #1a8400 inset'
      : '0px 0px 3px 0px #5f3204, 0px 1px 2px 0px #fffbef inset, 0px -1px 1px 0px #c7852e inset'};*/
  background: linear-gradient(180deg, #fff2d1 0%, #ffd893 100%);
  .players-name {
    font-size: 14px;
  }
  .players-address {
    font-size: 13px;
  }
  opacity: ${({ leave }) => leave && 0.7};
`
const PlayersAvatar = memo(({ player, account, players }: { player: string; players: IPlayer[]; account?: string }) => {
  const { t } = useCustomTranslation([LngNs.zBingo])
  return (
    <>
      {players.map((item, playerIndex) => (
        // 产品要求头像绿色的框 不管是不是在上链轮到谁就显示谁的边框
        <PlayersWrapper key={item.user} highLight={addressIsEqual(player, item.user)} leave={item.isAbandoned}>
          <Space>
            <PlayerAvatarList isGreen={player === item.user} account={item.isAbandoned ? '' : item.user} size={'large'} />
            <div>
              <div className="players-name">
                Player {playerIndex + 1} {item.user === account && '(you)'}
                {item.isAbandoned && '(left)'}
              </div>
              <div className="players-address">{item ? getShortenAddress(item.owner ?? item.user) : t('waiting')}</div>
            </div>
          </Space>
        </PlayersWrapper>
      ))}
    </>
  )
}, isEqual)
export default PlayersAvatar
