import { DialogContent, DialogOverlay } from '@reach/dialog'
import { ActivePixelCard, DialogClose, useIsW768, useRecoilValue, useSetRecoilState } from '@ui/src'
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
    <DialogOverlay className={css.bottom} isOpen={isModalOpen} onDismiss={handleCancel}>
      <DialogContent className={css.center}>
        <IsPixelWidget>
          <h3 className={css.title}>Game list</h3>
          <GameListIndex {...props} />
        </IsPixelWidget>
        <DialogClose onClick={handleCancel} />
      </DialogContent>
    </DialogOverlay>
  )
})
const IsPixelWidget = memo(({ children }: { children: React.ReactNode }) => {
  const isW768 = useIsW768()
  return isW768 ? (
    <>{children}</>
  ) : (
    <ActivePixelCard className={css.GameListDialog} backgroundColor="#1D263B" pixel_height={10}>
      {children}
    </ActivePixelCard>
  )
})
export default GameListDialog
