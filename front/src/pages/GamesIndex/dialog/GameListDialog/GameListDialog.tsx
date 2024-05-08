import { DialogContent, DialogOverlay } from '@reach/dialog'
import { DialogClose, preStaticUrl, SvgComponent, useRecoilValue, useSetRecoilState } from '@ui/src'
import { ActivePixelCard } from '@ui/src'
import React, { memo, useCallback } from 'react'

import GameListIndex, { IGameListProps } from '@/components/gameList/gameListIndex'

import { gameListDialogState } from '../../state/GamesState'
import css from './GameListDialog.module.styl'
const GameListDialog = memo((props: IGameListProps) => {
  const isModalOpen = useRecoilValue(gameListDialogState)
  const setIsModalOpen = useSetRecoilState(gameListDialogState)

  const handleCancel = useCallback(() => {
    setIsModalOpen(false)
  }, [])
  return (
    <DialogOverlay isOpen={isModalOpen} onDismiss={handleCancel}>
      <DialogContent className={css.center}>
        <ActivePixelCard className={css.GameListDialog} backgroundColor="#1D263B" pixel_height={10}>
          <h3>Game list</h3>
          <GameListIndex {...props} />
        </ActivePixelCard>
        <DialogClose onClick={handleCancel} />
      </DialogContent>
    </DialogOverlay>
  )
})
export default GameListDialog
