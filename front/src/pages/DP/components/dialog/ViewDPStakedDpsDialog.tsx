import { CloseOutlined } from '@ant-design/icons'
import { DialogContent, DialogOverlay } from '@reach/dialog'
import { LngNs, useCustomTranslation, useRecoilValue, useSetRecoilState } from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo, useCallback, useMemo } from 'react'

import NoDataPage from '@/components/NoData'

import { viewDPStakedDpsDialogState } from '../../hooks/state'
import { IDpBalance } from '../../hooks/useGPAction'
import { DPBalanceItemInner } from './DPAction/DPBalance'
import css from './ViewDPLockedDpsDialog.module.stylus'
const ViewDPStakedDpsDialog = memo(({ stakedBalance }: { stakedBalance: IDpBalance }) => {
  const { t } = useCustomTranslation([LngNs.dp])
  const isModalOpen = useRecoilValue(viewDPStakedDpsDialogState)
  const setIsModalOpen = useSetRecoilState(viewDPStakedDpsDialogState)
  const handleCancel = useCallback(() => {
    setIsModalOpen(false)
  }, [])
  const stakedViewList = useMemo(() => {
    return Object.keys(stakedBalance)
      .map(v => ({ id: v, ...stakedBalance[v] }))
      .filter(v => v.num !== '0') as { id: string; num: string; numStr: string }[]
  }, [stakedBalance])
  return (
    <DialogOverlay isOpen={isModalOpen} onDismiss={handleCancel}>
      <DialogContent className="dialogContent">
        <div className="dialogHeader">
          <h3>{t('My Staked DPs')}</h3>
          <div className="cursor" onClick={handleCancel}>
            <CloseOutlined />
          </div>
        </div>
        <div className={css.dialogContainer}>
          <div className={css.dp_list}>
            {stakedViewList.length ? (
              stakedViewList.map((v, index) => <DPBalanceItemInner key={index} label={`DPs / ${v.numStr} $GP`} amount={v} price={v.id} />)
            ) : (
              <NoDataPage style={{ padding: '20px 0' }} />
            )}
          </div>
        </div>
      </DialogContent>
    </DialogOverlay>
  )
}, isEqual)
export default ViewDPStakedDpsDialog
