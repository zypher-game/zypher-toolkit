import { CloseOutlined } from '@ant-design/icons'
import { DialogContent, DialogOverlay } from '@reach/dialog'
import { useRecoilState, useRecoilValue, useSetRecoilState } from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo, useCallback } from 'react'

import { dpActionDialogState, dpTabIndexState } from '../../hooks/state'
import { IDpBalance } from '../../hooks/useGPAction'
import { DialogTab } from '../UIWidget'
import DPLocked from './DPAction/DPLocked'
import DPStake from './DPAction/DPStake'
import DPUnstake from './DPAction/DPUnstake'
import css from './DPActionDialog.module.stylus'

const DPActionDialog = memo(
  ({
    dpBalance,
    stakedBalance,
    isApprovedForStaking,
    stakeHandleAction,
    stakeLockHandleAction,
    withdrawHandleAction,
    isStakeLoading,
    isStakeLockLoading,
    isWithdrawLoading
  }: {
    stakedBalance: IDpBalance
    dpBalance: IDpBalance
    isApprovedForStaking: boolean
    stakeHandleAction: any
    stakeLockHandleAction: any
    withdrawHandleAction: any
    isStakeLoading: boolean
    isStakeLockLoading: boolean
    isWithdrawLoading: boolean
  }) => {
    const isModalOpen = useRecoilValue(dpActionDialogState)
    const setIsModalOpen = useSetRecoilState(dpActionDialogState)
    const [tabIndex, setTabIndex] = useRecoilState(dpTabIndexState)

    const handleCancel = useCallback(() => {
      setIsModalOpen(false)
    }, [])
    return (
      <DialogOverlay className={css.dialogWrap} isOpen={isModalOpen} onDismiss={handleCancel}>
        <DialogContent className={css.dialogContent}>
          <div className={css.dialogContentInner}>
            <div className={css.dialogHeader}>
              <DialogTab tabIndex={tabIndex} setTabIndex={setTabIndex} />
            </div>
            <div className={css.dialogContainer}>
              {tabIndex === 0 ? (
                <DPLocked
                  dpBalance={dpBalance}
                  loading={isStakeLockLoading}
                  stakeLockHandleAction={stakeLockHandleAction}
                  isApprovedForStaking={isApprovedForStaking}
                />
              ) : null}
              {tabIndex === 1 ? (
                <DPStake
                  dpBalance={dpBalance}
                  loading={isStakeLoading}
                  stakeHandleAction={stakeHandleAction}
                  isApprovedForStaking={isApprovedForStaking}
                />
              ) : null}
              {tabIndex === 2 ? (
                <DPUnstake withdrawHandleAction={withdrawHandleAction} loading={isWithdrawLoading} stakedBalance={stakedBalance} />
              ) : null}
            </div>
          </div>
          <div className={css.cursor} onClick={handleCancel}>
            <CloseOutlined />
          </div>
        </DialogContent>
      </DialogOverlay>
    )
  },
  isEqual
)

export default DPActionDialog
