import { LngNs, useCustomTranslation } from '@UI/src/'
import { isEqual } from 'lodash'
import React, { memo, useCallback } from 'react'

import { IDpBalance } from '../../../hooks/useGPAction'
import { Col, PrimaryButton } from '../../UIWidget'
import DPBalance from './DPBalance'
import css from './DPStake.module.stylus'
import { useActionHooks } from './useDialogActionHooks'

const DPStake = memo(
  ({
    loading,
    dpBalance,
    isApprovedForStaking,
    stakeHandleAction
  }: {
    loading: boolean
    dpBalance: IDpBalance
    isApprovedForStaking: boolean
    stakeHandleAction: any
  }) => {
    const { t } = useCustomTranslation([LngNs.dp])
    const { params, setParams, totalChoose, selectAllProps } = useActionHooks(dpBalance)

    const stakeHandle = useCallback(() => {
      if (params && totalChoose) {
        stakeHandleAction(params)
      }
    }, [params, stakeHandleAction])

    return (
      <div className={css.dPStake}>
        <DPBalance dpBalance={dpBalance} setParams={setParams} selectAllProps={selectAllProps} />
        <div className={css.bottom}>
          <Col flText={t('Total selected')} frNode={<h4>{totalChoose} DPs</h4>} />
          <Col flText={t('Increase weight')} frNode={<h4>{totalChoose}</h4>} />
          <PrimaryButton label={t(isApprovedForStaking ? 'Stake' : 'Approve')} loading={loading} disable={totalChoose === 0} onClick={stakeHandle} />
        </div>
      </div>
    )
  },
  isEqual
)

export default DPStake
