import { ActivePixelCard, Currency, useActiveWeb3React, useIsW768, useSetRecoilState } from '@ui/src'
import { ActivePixelButtonColor } from '@ui/src'
import React, { memo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import AirdropPointCard from '@/pages/Active/components/AirdropPointCard/AirdropPointCard'
import { airdropPathname, preAirdropPathname } from '@/pages/Active/hooks/activeHooks'
import { useActiveData } from '@/pages/Active/hooks/useActiveData'
import { useTvlStakingDialogState } from '@/pages/Active/hooks/useTvlStakingDialogState'
import { pointSuccessDialogState, tvlStakingDialogState } from '@/pages/Active/state/activeState'

import ActiveComp from '../../../components/ActiveComp/ActiveComp'
import css from './MoreActiveSuccess.module.styl'
const MoreActiveSuccess = memo(() => {
  const { activeData } = useActiveData()
  const { airdropPoints } = activeData
  return (
    <ActiveComp>
      <div className={css.wrap}>
        <MoreActiveSuccessCard isModal={false} amount={airdropPoints} />
      </div>
    </ActiveComp>
  )
})

export const MoreActiveSuccessCard = memo(({ isModal, amount }: { isModal: boolean; amount: string }) => {
  const isW768 = useIsW768()
  return (
    <>
      <ActivePixelCard className={css.moreActiveSuccess} backgroundColor="#1D263B" pixel_height={isW768 ? 5 : 10}>
        <h3>Congratulations!</h3>
        <h3>{"You've earned bonus points."}</h3>
        <AirdropPointCard amount={amount} />
        {!isW768 ? <Btn isModal={isModal} /> : null}
      </ActivePixelCard>
      {isW768 ? <Btn isModal={isModal} /> : null}
    </>
  )
})
const Btn = memo(({ isModal }: { isModal: boolean }) => {
  const isW768 = useIsW768()
  const navigate = useNavigate()
  const setIsStakingOpenHandle = useTvlStakingDialogState()

  const setIsPointSuccessDialogOpen = useSetRecoilState(pointSuccessDialogState)
  const { chainId } = useActiveWeb3React()
  const toPath = useCallback(() => {
    if (isModal) {
      setIsStakingOpenHandle({
        key: 'tvlStakingDialogState',
        chainId: chainId,
        isOpen: true
      })
      setIsPointSuccessDialogOpen(false)
    } else {
      navigate(`/${preAirdropPathname}/${airdropPathname.staking}`)
    }
  }, [isModal, chainId, navigate])
  if (isModal) {
    return <></>
  }
  return (
    <ActivePixelButtonColor
      themeType="brightBlue"
      className={css.toPath}
      onClick={toPath}
      width={isW768 ? '100%' : '318px'}
      height={isW768 ? '48px' : '52px'}
      pixel_height={5}
    >
      <p>Staking {Currency[chainId]} to activate points</p>
    </ActivePixelButtonColor>
  )
})
export default MoreActiveSuccess
