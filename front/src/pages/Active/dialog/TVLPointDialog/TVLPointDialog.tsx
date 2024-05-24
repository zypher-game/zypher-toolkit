import { DialogContent, DialogOverlay } from '@reach/dialog'
import { DialogClose, LoadingButton, preStaticUrl, useRecoilValue, useSetRecoilState } from '@ui/src'
import { ActivePixelButtonColor, ActivePixelCard } from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo, useCallback } from 'react'

import { useActiveData } from '../../hooks/useActiveData'
import { tvlPointDialogState } from '../../state/activeState'
import css from './TVLPointDialog.module.styl'
const TVLPointDialog = memo(
  ({ openCard, isLoadingSingle, isLoadingAll }: { openCard: (key: string) => Promise<void>; isLoadingSingle: boolean; isLoadingAll: boolean }) => {
    const isModalOpen = useRecoilValue(tvlPointDialogState)
    const setIsModalOpen = useSetRecoilState(tvlPointDialogState)

    const { activeData } = useActiveData()
    const { airdropPointsCardNumber } = activeData

    const handleCancel = useCallback(() => {
      setIsModalOpen(false)
    }, [])

    return (
      <DialogOverlay isOpen={isModalOpen} onDismiss={handleCancel}>
        <DialogContent className={css.center}>
          <ActivePixelCard className={css.TVLPointDialog} backgroundColor="#1D263B" pixel_height={10}>
            <h3>You Got {airdropPointsCardNumber} Airdrop Points Card</h3>
            <img src={preStaticUrl + '/img/tvl/airdrop_point/bg.png'} alt="card2" className={`${css.card}`} />
            <div className={css.btn}>
              <ActivePixelButtonColor themeType="brightBlue" pixel_height={6} width="180px" height="52px" onClick={() => openCard('1')}>
                <p>
                  Open <strong>1</strong> Card
                </p>
                <LoadingButton isLoading={isLoadingSingle} />
              </ActivePixelButtonColor>

              <ActivePixelButtonColor pixel_height={6} width="180px" height="52px" themeType="yellow" onClick={() => openCard('all')}>
                <p className={css.yellow}>Open All</p>
                <LoadingButton isLoading={isLoadingAll} />
              </ActivePixelButtonColor>
            </div>
          </ActivePixelCard>
          <DialogClose onClick={handleCancel} />
        </DialogContent>
      </DialogOverlay>
    )
  },
  isEqual
)

export default TVLPointDialog
