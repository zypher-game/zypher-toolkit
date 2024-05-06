import { DialogOverlay } from '@reach/dialog'
import { preStaticUrl } from '@ui/src'
import { useRecoilValue, useSetRecoilState } from '@ui/src'
import { useCustomTranslation } from '@ui/src'
import { LngNs } from '@ui/src'
import { Button } from 'antd'
import classnames from 'classnames'
import React, { useCallback } from 'react'

import Icon from '@/assets/iconsLocal'

import { receiveAwardDialogState } from '../../state/monsterState'
import css from './ReceiveAwardDialog.module.stylus'
type Props = {
  onClose?: () => void
}
const ReceiveAwardDialog: React.FC<Props> = () => {
  const { t } = useCustomTranslation([LngNs.defense])
  const isModalOpen = useRecoilValue(receiveAwardDialogState)
  const setIsModalOpen = useSetRecoilState(receiveAwardDialogState)
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
          <div className={css.boxWrap}>
            {[
              {
                name: 'receive_box01',
                img: preStaticUrl + '/img/monster/receive_box01.png',
                amount: '50k'
              },
              {
                name: 'receive_box02',
                img: preStaticUrl + '/img/monster/receive_box02.png',
                amount: '15'
              }
            ].map((v, index) => (
              <div className={classnames(css.box, css[v.name])} key={index}>
                <img src={v.img} alt={v.name} />
                <p>{v.amount}</p>
              </div>
            ))}
          </div>
          <div className="liner_sort" />
          <Button className={css.btn}>{t('Confirm')}</Button>
        </div>
      </DialogOverlay>
    </>
  )
}
export default ReceiveAwardDialog
