import { addressIsEqual, LngNs, useCustomTranslation } from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo, useMemo } from 'react'

import { IRoomInfo } from '@/hooks/useGetGameInfoV1.types'

const Tip = memo(({ round, roomInfo, isControllerEnabled }: { round: number; isControllerEnabled: boolean; roomInfo: IRoomInfo }) => {
  const { t } = useCustomTranslation([LngNs.zBingo])
  const Run = useMemo(() => {
    const Index = roomInfo.players.findIndex(address => addressIsEqual(address.user, roomInfo.player))
    if (Index !== -1) {
      return Index + 1
    }
    return 0
  }, [roomInfo.players])
  return roomInfo.status === 'live' ? (
    isControllerEnabled ? (
      <div>
        Round <span>{round}</span>
        {"! It's your turn to choose the number"}
      </div>
    ) : Run ? (
      <div>
        Round <span>{round}</span>! Player <span>{Run}</span>, choose your number to submit!
      </div>
    ) : (
      <div>{t('Synchronizing')}</div>
    )
  ) : (
    <div>{t('Synchronizing')}</div>
  )
}, isEqual)
export default Tip
