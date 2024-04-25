import { DialogOverlay } from '@reach/dialog'
import { useRecoilValue, useSetRecoilState } from '@UI/src/'
import { preStaticUrl } from '@UI/src/'
import classnames from 'classnames'
import React, { useCallback } from 'react'

import Icon from '@/assets/iconsLocal'

import { receiveNftDialogState, tokenIdState } from '../../state/monsterState'
import css from './ReceiveNftDialog.module.stylus'
type Props = {
  onClose?: () => void
}
const ReceiveNftDialog: React.FC<Props> = () => {
  const isModalOpen = useRecoilValue(receiveNftDialogState)
  const setIsModalOpen = useSetRecoilState(receiveNftDialogState)

  const tokenId = useRecoilValue(tokenIdState)

  const handleCancel = useCallback(() => {
    setIsModalOpen(false)
  }, [])
  return (
    <>
      <DialogOverlay className="dialogPosition" isOpen={isModalOpen} onDismiss={handleCancel}>
        <div className={css.dialogContent}>
          <div className="starTitle">
            <h3>Challenge Success</h3>
            <h3 className="h3bg">Challenge Success</h3>
            <Icon name="star" className={classnames('star', 'star1', css.star, css.star1)} />
            <Icon name="star" className={classnames('star', 'star2', css.star, css.star2)} />
            <Icon name="star" className={classnames('star', 'star3', css.star, css.star3)} />
            <Icon name="star" className={classnames('star', 'star4', css.star, css.star4)} />
          </div>
          <div className="liner_long" />
          <div className={css.card}>
            <img src={preStaticUrl + `/img/monster/passCard.png`} alt="passCard" />
            <div className={css.text_card}>
              <p>{tokenId}</p>
              <svg xmlns="http://www.w3.org/2000/svg" width="89" height="22" viewBox="0 0 89 22" fill="none">
                <path
                  d="M86.0585 0.78837L88.5459 2.68749V19.3726L86.0585 21.2717H3.18393L0.696467 19.3726V2.68749L3.18393 0.78837H86.0585Z"
                  stroke="#EEE7FB"
                  strokeWidth="0.749379"
                />
              </svg>
            </div>
          </div>
          <div className="liner_sort" />
        </div>
      </DialogOverlay>
    </>
  )
}
export default ReceiveNftDialog
