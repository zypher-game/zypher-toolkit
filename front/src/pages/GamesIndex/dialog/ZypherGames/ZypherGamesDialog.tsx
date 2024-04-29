import { DialogContent, DialogOverlay } from '@reach/dialog'
import { preStaticUrl, SvgComponent, useRecoilValue, useSetRecoilState } from '@UI/src/'
import { ActivePixelButtonColor, ActivePixelCard } from '@UI/src/'
import { isEqual } from 'lodash'
import React, { memo, useCallback } from 'react'

import { zypherGamesDialogState } from '../../state/GamesState'
import css from './ZypherGamesDialog.module.styl'
const ZypherGamesDialog = memo(() => {
  const isModalOpen = useRecoilValue(zypherGamesDialogState)
  const setIsModalOpen = useSetRecoilState(zypherGamesDialogState)

  const handleCancel = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  return (
    <DialogOverlay isOpen={isModalOpen} onDismiss={handleCancel}>
      <DialogContent className={css.center}>
        <ActivePixelCard className={css.ZypherGamesDialog} backgroundColor="#1D263B" pixel_height={10}>
          <img src={preStaticUrl + '/img/games/zypher_games.jpg'} alt="card2" className={`${css.card}`} />
          <h3>Zypher Games</h3>
          <p>
            Zypher Games is an innovative on-chain games platform that provides a decentralized and provably fair games experience by harnessing the
            power of Zero-Knowledge Proofs (ZKPs) and Artificial Intelligence. It creates engaging and immersive fully on-chain games that showcase
            the transformative potential of combining blockchain and AI technology.
          </p>
        </ActivePixelCard>
        <div className="select_cursor" onClick={handleCancel}>
          <SvgComponent src={preStaticUrl + '/img/icon/pixel_close.svg'} />
        </div>
      </DialogContent>
    </DialogOverlay>
  )
}, isEqual)

export default ZypherGamesDialog
