import { CloseOutlined } from '@ant-design/icons'
import { LoadingOutlined } from '@ant-design/icons'
import { DialogContent, DialogOverlay } from '@reach/dialog'
import { formatMoney, LngNs, pointsDialogState, preStaticUrl, useCustomTranslation, useRecoilValue, useSetRecoilState } from '@UI/src/'
import BigNumberjs from 'bignumber.js'
import { isEqual } from 'lodash'
import React, { memo, useCallback, useMemo } from 'react'

import { GlobalVar } from '@/constants/constants'
import { setErrorToast } from '@/utils/Error/setErrorToast'

import { dpBuyDialogState } from '../../hooks/state'
import { DP_PRICE } from '../../hooks/useGPAction'
import { DPAmountInputItem } from '../UIWidget'
import css from './DPBuyDialog.module.stylus'
const DPBuyDialog = memo(
  ({
    buyHandleAction,
    loading,
    isApprove,
    isPointBalanceEnough,
    buyValue,
    setBuyValue
  }: {
    buyHandleAction: any
    loading: boolean
    isApprove: boolean
    isPointBalanceEnough: boolean
    buyValue: string
    setBuyValue: React.Dispatch<React.SetStateAction<string>>
  }) => {
    const { t } = useCustomTranslation([LngNs.dp])
    const isModalOpen = useRecoilValue(dpBuyDialogState)
    const setIsModalOpen = useSetRecoilState(dpBuyDialogState)

    const setPointsDialogOpen = useSetRecoilState(pointsDialogState)
    const handleCancel = useCallback(() => {
      setIsModalOpen(false)
    }, [])
    const buyHandle = useCallback(() => {
      if (!buyValue) {
        setErrorToast(GlobalVar.dispatch, 'Please input value')
        return
      }
      buyHandleAction({
        id: DP_PRICE.num
      })
    }, [buyValue, buyHandleAction])
    const handleOpenGoldPoints = useCallback(() => {
      setIsModalOpen(false)
      setPointsDialogOpen(true)
    }, [])
    const gpPrice = useMemo(() => {
      return formatMoney(new BigNumberjs(DP_PRICE.num).times(buyValue).toString(), 0)
    }, [buyValue])
    return (
      <DialogOverlay className="dialogPosition" isOpen={isModalOpen} onDismiss={handleCancel}>
        <DialogContent className="dialogContent">
          <div className="dialogHeader">
            <h3>{t('Buy DP')}</h3>
            <div className="cursor" onClick={handleCancel}>
              <CloseOutlined />
            </div>
          </div>
          <div className={css.dPBuyDialogContainer}>
            <img src={preStaticUrl + `/img/dp/buy_${DP_PRICE.num}.png`} className={css.buyimg} />
            <DPAmountInputItem size="middle" value={buyValue} setValue={setBuyValue} max="9999999999" />
            <button className={css.btn} onClick={buyHandle}>
              <div className={css.btnbg}>
                <img src={preStaticUrl + '/img/dp/buy_btn_bg.png'} />
                <p>{gpPrice} $GP</p>
              </div>
              <strong>
                {isApprove ? t('BUY') : t('Approve')}
                {loading ? ' ' : ''}
              </strong>
              {loading ? <LoadingOutlined /> : null}
            </button>
            {isPointBalanceEnough ? null : (
              <p onClick={handleOpenGoldPoints} className={css.text_btn}>
                + {t('Recharge Gold Points')}
              </p>
            )}
          </div>
        </DialogContent>
      </DialogOverlay>
    )
  },
  isEqual
)
export default DPBuyDialog
