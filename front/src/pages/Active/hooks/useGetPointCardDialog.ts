import { useActiveWeb3React, useRecoilState, useRecoilValue, useSetRecoilState } from '@ui/src'
import { useCallback, useEffect } from 'react'

import { getPointCardData, getPointCardDialogState } from '../state/activeState'
import { canNext } from './activeHooks'
import { useActiveData } from './useActiveData'
import { useGetPointCard } from './useDataCall'

export const useGetPointCardDialog = () => {
  const { activeData } = useActiveData()
  const [pointCardData, setGetPointCardData] = useRecoilState(getPointCardData)
  const { airdropPointsCardNumber, id, chainId, accountAddress, userStakedAmount } = activeData
  const { getGroupScoreCardRead } = useGetPointCard()
  const [, setIsModalOpen] = useRecoilState(getPointCardDialogState)
  const getData = useCallback(async () => {
    const res = await getGroupScoreCardRead({
      userId: id,
      chainId: chainId!
    })
    setGetPointCardData(res)
  }, [airdropPointsCardNumber, id, chainId])
  useEffect(() => {
    if (pointCardData) {
      if (pointCardData.ownerTeam.num || pointCardData.parentTeam.num) {
        const res: [string | undefined, string | undefined] = [undefined, undefined]
        // 先弹 parent 在弹 owner
        if (pointCardData.ownerTeam.num) {
          res[0] = pointCardData.ownerTeam.captainNickname
        }
        if (pointCardData.parentTeam.num) {
          res[1] = pointCardData.parentTeam.captainNickname
        }
        setIsModalOpen(res)
      }
    }
  }, [JSON.stringify(pointCardData)])

  useEffect(() => {
    if (airdropPointsCardNumber && airdropPointsCardNumber !== '' && canNext(accountAddress, chainId)) {
      getData()
    }
  }, [getData, userStakedAmount])
}
export const usePostPointCardDialog = () => {
  const { chainId } = useActiveWeb3React()
  const { postGroupScoreCardRead } = useGetPointCard()
  const pointCardData = useRecoilValue(getPointCardData)
  const postGroupRead = useCallback(async () => {
    return await postGroupScoreCardRead({
      scoreIds: [...(pointCardData?.ownerTeam.scoreIds ?? []), ...(pointCardData?.parentTeam.scoreIds ?? [])],
      chainId
    })
  }, [JSON.stringify(pointCardData), chainId])
  return { postGroupRead, pointCardData }
}
