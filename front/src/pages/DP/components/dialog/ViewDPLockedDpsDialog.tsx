import { CloseOutlined } from '@ant-design/icons'
import { DialogContent, DialogOverlay } from '@reach/dialog'
import { LngNs, useCustomTranslation, useRecoilValue, useSetRecoilState } from '@UI/src/'
import { isEqual } from 'lodash'
import React, { memo, useCallback, useMemo, useState } from 'react'

import NoDataPage from '@/components/NoData'

import { viewDPLockedDpsDialogState } from '../../hooks/state'
import { ILockedItem } from '../../hooks/useGPAction'
import { DPBalanceItemInner } from './DPAction/DPBalance'
import { getLockedTimesStr, ILockedTimesItem, LockedTimes, TimeLi } from './DPAction/DPLocked'
import css from './ViewDPLockedDpsDialog.module.stylus'
const ViewDPLockedDpsDialog = memo(({ lockedViewList }: { lockedViewList?: ILockedItem[] }) => {
  const { t } = useCustomTranslation([LngNs.dp])
  const [choseTime, setChoseTime] = useState<ILockedTimesItem>({
    labe: 'All',
    amount: 0
  })

  const isModalOpen = useRecoilValue(viewDPLockedDpsDialogState)
  const setIsModalOpen = useSetRecoilState(viewDPLockedDpsDialogState)
  const LockedTimesALl = useMemo(() => {
    if (lockedViewList && lockedViewList.length) {
      const all = LockedTimes.flat().filter(
        v =>
          lockedViewList.filter(vv => {
            return `${vv.duration}` === `${v.amount}`
          }).length > 0
      )
      return [
        {
          labe: 'All',
          amount: 0
        },
        ...all
      ]
    }
    return undefined
  }, [LockedTimes, lockedViewList])
  const showLockedViewList = useMemo(() => {
    if (lockedViewList && lockedViewList.length) {
      if (choseTime.amount) {
        return lockedViewList.filter(v => `${v.duration}` === `${choseTime.amount}`)
      } else {
        return lockedViewList
      }
    } else {
      return []
    }
  }, [choseTime, lockedViewList])
  const handleCancel = useCallback(() => {
    setIsModalOpen(false)
  }, [])
  return (
    <DialogOverlay isOpen={isModalOpen} onDismiss={handleCancel}>
      <DialogContent className="dialogContent">
        <div className="dialogHeader">
          <h3>{t('My Locked DPs')}</h3>
          <div className="cursor" onClick={handleCancel}>
            <CloseOutlined />
          </div>
        </div>
        <div className={css.dialogContainer}>
          {LockedTimesALl ? <TimeLi time={LockedTimesALl} chosedTime={choseTime} setChoseTime={setChoseTime} /> : null}
          <div className={css.dp_list_lock}>
            {showLockedViewList.length ? (
              showLockedViewList.map((v, index) => (
                <DPBalanceItemInner key={index} label={`DPs / ${v.idStr} $GP`} amount={{ num: v.amount, numStr: v.amountStr }} price={v.id}>
                  <p className={css.dp_label}>{getLockedTimesStr(v.duration)}</p>
                </DPBalanceItemInner>
              ))
            ) : (
              <NoDataPage style={{ padding: '30px 0 20px' }} />
            )}
          </div>
        </div>
      </DialogContent>
    </DialogOverlay>
  )
}, isEqual)
export default ViewDPLockedDpsDialog
