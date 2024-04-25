import { useSetRecoilState } from '@UI/src/'
import { ActivePixelButtonColor } from '@UI/src/'
import React, { memo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import AirdropPointCard from '@/pages/Active/components/AirdropPointCard/AirdropPointCard'
import { airdropPathname, preAirdropPathname } from '@/pages/Active/hooks/activeHooks'
import { pointSuccessDialogState, tvlStakingDialogState } from '@/pages/Active/state/activeState'

import ActiveComp from '../../../components/ActiveComp/ActiveComp'
import { GetAirdropCard } from '../components/GetAirdropWrap/GetAirdropWrap'
import css from './MoreActiveSuccess.module.styl'
const MoreActiveSuccess = memo(() => {
  return (
    <ActiveComp>
      <MoreActiveSuccessCard isModal={false} />
    </ActiveComp>
  )
})

const MoreActiveSuccessCard = memo(({ isModal }: { isModal: boolean }) => {
  const navigate = useNavigate()
  const setIsTvlStakingModalOpen = useSetRecoilState(tvlStakingDialogState)
  const setIsPointSuccessDialogOpen = useSetRecoilState(pointSuccessDialogState)
  const toPath = useCallback(() => {
    if (isModal) {
      setIsTvlStakingModalOpen(true)
      setIsPointSuccessDialogOpen(false)
    } else {
      navigate(`/${preAirdropPathname}/${airdropPathname.staking}`)
    }
  }, [navigate])
  return (
    <GetAirdropCard className={css.moreActiveSuccess}>
      <h3>Congrats! Get bonus points!</h3>
      <AirdropPointCard amount="340" />
      <ActivePixelButtonColor className={css.toPath} onClick={toPath} width="318px" height="52px" pixel_height={5}>
        <p>Staking ETH to activate points</p>
      </ActivePixelButtonColor>
    </GetAirdropCard>
  )
})
export default MoreActiveSuccess
