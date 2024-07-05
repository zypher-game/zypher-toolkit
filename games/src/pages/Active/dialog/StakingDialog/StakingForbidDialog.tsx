import { ActivePixelButtonColor, DialogClose, ModalWithMotion, NavKey, PixelCube2, useIsW768, useRecoilValue, useSetRecoilState } from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { tvlStakingForbidDialogState } from '../../state/activeState'
import css from './StakingForbidDialog.module.stylus'
const StakingForbidDialog = memo(() => {
  const isModalOpen = useRecoilValue(tvlStakingForbidDialogState)
  const setIsModalOpen = useSetRecoilState(tvlStakingForbidDialogState)
  const isW768 = useIsW768()
  const navigate = useNavigate()

  const handleCancel = useCallback(() => {
    setIsModalOpen(false)
  }, [])
  const go = useCallback(() => {
    navigate(`/${NavKey[0][1]}`)
    handleCancel()
  }, [])
  return (
    <ModalWithMotion isOpen={isModalOpen} onDismiss={handleCancel} contentClassName={css.stakingForbidDialog}>
      <PixelCube2 className={css.PixelCube2} pixel_height={isW768 ? 5 : 10} backgroundColor="#1D263B" borderColor="#1D263B">
        <h3 className={css.title}>Staking</h3>
        <p className={css.text}>Please participate in the TVL event registration first to pledge assets to obtain SBT!</p>
        <ActivePixelButtonColor width="100%" height={isW768 ? '48px' : '54px'} pixel_height={5} onClick={go} themeType="brightBlue">
          <p>GO</p>
        </ActivePixelButtonColor>
      </PixelCube2>
      <DialogClose onClick={handleCancel} />
    </ModalWithMotion>
  )
}, isEqual)

export default StakingForbidDialog
