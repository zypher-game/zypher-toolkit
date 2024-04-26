import { DialogContent, DialogOverlay } from '@reach/dialog'
import { preStaticUrl, SvgComponent, useRecoilValue, useSetRecoilState } from '@UI/src/'
import { ActivePixelCard } from '@UI/src/'
import React, { memo, useCallback } from 'react'

import GameListIndex, { IGameListProps } from '@/components/gameList/gameListIndex'

import { gameListDialogState } from '../../state/GamingState'
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
        <div className="select_cursor" onClick={handleCancel}>
          <SvgComponent src={preStaticUrl + '/img/icon/pixel_close.svg'} />
        </div>
      </DialogContent>
    </DialogOverlay>
  )
})
export default GameListDialog
