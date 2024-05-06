import { DialogContent, DialogOverlay } from '@reach/dialog'
import { DialogClose, preStaticUrl, SvgComponent, useRecoilValue, useSetRecoilState } from '@ui/src'
import { ActivePixelButtonColor, ActivePixelCard } from '@ui/src'
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
        <DialogClose onClick={handleCancel} />
      </DialogContent>
    </DialogOverlay>
  )
}, isEqual)

export default ZypherGamesDialog
