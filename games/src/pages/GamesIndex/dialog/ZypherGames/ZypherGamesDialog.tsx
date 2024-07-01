import { DialogClose, ModalWithMotion, preStaticUrl, useIsW768, useRecoilValue, useSetRecoilState } from '@ui/src'
import { ActivePixelCard } from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo, useCallback } from 'react'

import { zypherGamesDialogState } from '../../state/GamesState'
import css from './ZypherGamesDialog.module.styl'
const ZypherGamesDialog = memo(() => {
  const isModalOpen = useRecoilValue(zypherGamesDialogState)
  const setIsModalOpen = useSetRecoilState(zypherGamesDialogState)
  const isW768 = useIsW768()
  const handleCancel = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  return (
    <ModalWithMotion isOpen={isModalOpen} onDismiss={handleCancel} contentClassName={css.center}>
      <ActivePixelCard className={css.ZypherGamesDialog} backgroundColor="#1D263B" pixel_height={isW768 ? 5 : 10}>
        <img decoding="async" loading="lazy" src={preStaticUrl + '/img/games/zypher_games.jpg'} alt="card2" className={`${css.card}`} />
        <h3>Zypher Games</h3>
        <p>
          Zypher Games is a decentralized publishing DAO committed to supporting games empowered by Zypher Network’s next-gen AI & ZKP based solutions
          with collective treasuries, yield resources, dev tools, and much more. It’s fueled by $Gold Points, a dynamic cross-promotion currency
          vehicle to empower the ecosystem with economic composability and yield aggregation.
        </p>
      </ActivePixelCard>
      <DialogClose onClick={handleCancel} />
    </ModalWithMotion>
  )
}, isEqual)

export default ZypherGamesDialog
