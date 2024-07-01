import { DialogClose, LoadingButton, ModalWithMotion, preStaticUrl, useIsW768, useRecoilValue, useSetRecoilState } from '@ui/src'
import { ActivePixelButtonColor, ActivePixelCard } from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo, useCallback } from 'react'

import { useActiveData } from '../../hooks/useActiveData'
import { tvlPointDialogState } from '../../state/activeState'
import css from './TVLPointDialog.module.styl'
type IProps = { openCard: (key: string) => Promise<void>; isLoadingSingle: boolean; isLoadingAll: boolean }
const TVLPointDialog = memo(({ openCard, isLoadingSingle, isLoadingAll }: IProps) => {
  const isModalOpen = useRecoilValue(tvlPointDialogState)
  const setIsModalOpen = useSetRecoilState(tvlPointDialogState)
  const isW768 = useIsW768()
  const { activeData } = useActiveData()
  const { airdropPointsCardNumber } = activeData

  const handleCancel = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  return (
    <ModalWithMotion isOpen={isModalOpen} onDismiss={handleCancel} contentClassName={css.center}>
      <ActivePixelCard className={css.TVLPointDialog} backgroundColor="#1D263B" pixel_height={isW768 ? 5 : 10}>
        <h3>You Got {airdropPointsCardNumber} Airdrop Points Card</h3>
        <img decoding="async" loading="lazy" src={preStaticUrl + '/img/tvl/airdrop_point/bg.png'} alt="card2" className={`${css.card}`} />
        {!isW768 ? <Btn openCard={openCard} isLoadingSingle={isLoadingSingle} isLoadingAll={isLoadingAll} /> : null}
      </ActivePixelCard>
      {isW768 ? <Btn openCard={openCard} isLoadingSingle={isLoadingSingle} isLoadingAll={isLoadingAll} /> : null}
      <DialogClose onClick={handleCancel} />
    </ModalWithMotion>
  )
}, isEqual)
const Btn = memo(({ openCard, isLoadingSingle, isLoadingAll }: IProps) => {
  const isW768 = useIsW768()
  return (
    <div className={css.btn}>
      <ActivePixelButtonColor
        themeType="brightBlue"
        pixel_height={isW768 ? 4 : 6}
        width={isW768 ? '50%' : '180px'}
        height={isW768 ? '48px' : '52px'}
        onClick={() => openCard('1')}
      >
        <p>
          Open <strong>1</strong> Card
        </p>
        <LoadingButton isLoading={isLoadingSingle} />
      </ActivePixelButtonColor>

      <ActivePixelButtonColor
        pixel_height={6}
        width={isW768 ? '50%' : '180px'}
        height={isW768 ? '48px' : '52px'}
        themeType="yellow"
        onClick={() => openCard('all')}
      >
        <p className={css.yellow}>Open All</p>
        <LoadingButton isLoading={isLoadingAll} />
      </ActivePixelButtonColor>
    </div>
  )
})
export default TVLPointDialog
