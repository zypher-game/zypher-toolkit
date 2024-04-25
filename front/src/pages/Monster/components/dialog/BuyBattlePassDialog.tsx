import { CloseOutlined, LoadingOutlined } from '@ant-design/icons'
import { DialogContent, DialogOverlay } from '@reach/dialog'
import { LngNs, pointsDialogState, PointsIcon, preStaticUrl, useCustomTranslation, useIsMobile, useRecoilValue, useSetRecoilState } from '@UI/src/'
import { Button } from 'antd'
import classnames from 'classnames'
import React, { useCallback } from 'react'

import { IMonsterData } from '@/store/monster/reducer'

import { buyBattlePassDialogState } from '../../state/monsterState'
import css from './BuyBattlePassDialog.module.stylus'
type IProps = {
  isBuyNftLoading?: boolean
  handleBuyBattlePass?: any
  monsterState?: IMonsterData
  onClose?: () => void
  isApprove: boolean
  isPointBalanceEnough: boolean
}
const BuyBattlePassDialog: React.FC<IProps> = ({ handleBuyBattlePass, monsterState, isBuyNftLoading, isApprove, isPointBalanceEnough }: IProps) => {
  const { t } = useCustomTranslation([LngNs.common])
  const isMobile = useIsMobile()
  const isModalOpen = useRecoilValue(buyBattlePassDialogState)
  const setIsModalOpen = useSetRecoilState(buyBattlePassDialogState)
  const setPointsDialogOpen = useSetRecoilState(pointsDialogState)

  const handleCancel = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  const handleOpenGoldPoints = useCallback(() => {
    setIsModalOpen(false)
    setPointsDialogOpen(true)
  }, [])
  return (
    <>
      <DialogOverlay className="dialogPosition" isOpen={isModalOpen} onDismiss={handleCancel}>
        <DialogContent className="dialogContent">
          <div className="dialogHeader">
            <h3>
              {t('Buy')} {monsterState?.name}
            </h3>
            <div className="cursor" onClick={handleCancel}>
              <CloseOutlined />
            </div>
          </div>
          <div className={css.dialogContainer}>
            <div className={css.card}>
              <img src={preStaticUrl + `/img/monster/passCard.png`} alt="passCard" />
            </div>
            <div className={css.priceCard}>
              <p>{monsterState?.purchasePriceStr}</p>
              <PointsIcon isMobile={isMobile} />
            </div>
            <Button className={classnames(css.btn, isPointBalanceEnough ? '' : css.forbid)} onClick={handleBuyBattlePass}>
              {isPointBalanceEnough ? (isApprove ? t('Buy') : t('Approve')) : t('No Balance')}
              {isBuyNftLoading && <LoadingOutlined />}
            </Button>
            {isPointBalanceEnough ? null : (
              <p onClick={handleOpenGoldPoints} className={css.text_btn}>
                + {t('Recharge Gold Points')}
              </p>
            )}
          </div>
        </DialogContent>
      </DialogOverlay>
    </>
  )
}
export default BuyBattlePassDialog
