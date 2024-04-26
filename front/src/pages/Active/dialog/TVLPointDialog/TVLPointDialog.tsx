import { DialogContent, DialogOverlay } from '@reach/dialog'
import { preStaticUrl, SvgComponent, useRecoilValue, useSetRecoilState } from '@UI/src/'
import { ActivePixelButtonColor, ActivePixelCard } from '@UI/src/'
import { isEqual } from 'lodash'
import React, { memo, useCallback } from 'react'

import { activeDataState, IActiveData, tvlPointDialogState } from '../../state/activeState'
import css from './TVLPointDialog.module.styl'
const TVLPointDialog = memo(() => {
  const isModalOpen = useRecoilValue(tvlPointDialogState)
  const setIsModalOpen = useSetRecoilState(tvlPointDialogState)
  const activeData = useRecoilValue<IActiveData>(activeDataState)
  const { airdropPointsCardNumber } = activeData

  const handleCancel = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  return (
    <DialogOverlay isOpen={isModalOpen} onDismiss={handleCancel}>
      <DialogContent className={css.center}>
        <ActivePixelCard className={css.TVLPointDialog} backgroundColor="#1D263B" pixel_height={10}>
          <h3>You Got 1 Airdrop Points Card</h3>
          <img src={preStaticUrl + '/img/tvl/airdrop_point/bg.png'} alt="card2" className={`${css.card}`} />
          <div className={css.btn}>
            <ActivePixelButtonColor pixel_height={6} width="180px" height="52px">
              <p>
                Open <strong>1</strong> Card
              </p>
            </ActivePixelButtonColor>

            <ActivePixelButtonColor
              pixel_height={6}
              width="180px"
              height="52px"
              borderBottomColor="#E1820C"
              borderTopColor="#FFE299"
              backgroundColor="#FEBE1E"
            >
              <p className={css.yellow}>Open All</p>
            </ActivePixelButtonColor>
          </div>
        </ActivePixelCard>
        <div className="select_cursor" onClick={handleCancel}>
          <SvgComponent src={preStaticUrl + '/img/icon/pixel_close.svg'} />
        </div>
      </DialogContent>
    </DialogOverlay>
  )
}, isEqual)

export default TVLPointDialog
