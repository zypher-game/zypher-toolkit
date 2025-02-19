import { DialogContent, DialogOverlay } from '@reach/dialog'
import { preStaticUrl, useRecoilState } from '@ui/src'
import React, { useCallback } from 'react'

import { ChampionRulesState } from '../../../state/championState'
import css from './RewardHistoryDialog.module.stylus'
type Props = {
  onClose?: () => void
}
const RewardHistoryDialog: React.FC<Props> = () => {
  const [isModalOpen, setIsModalOpen] = useRecoilState(ChampionRulesState)

  const handleCancel = useCallback(() => {
    setIsModalOpen(false)
  }, [])
  return (
    <>
      <DialogOverlay isOpen={isModalOpen} onDismiss={handleCancel} className={css.zindex}>
        <DialogContent className={css.championRule}>
          <div className={css.inner}>
            <img src={preStaticUrl + '/img/bingo/close.svg'} alt="close" className={css.close} onClick={handleCancel} />
          </div>
        </DialogContent>
      </DialogOverlay>
    </>
  )
}
export default RewardHistoryDialog
