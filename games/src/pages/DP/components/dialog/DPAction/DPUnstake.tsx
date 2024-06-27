import { LngNs, useCustomTranslation } from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo, useCallback } from 'react'

import { IDpBalance } from '../../../hooks/useGPAction'
import { Col, PrimaryButton } from '../../UIWidget'
import DPBalance from './DPBalance'
import css from './DPStake.module.stylus'
import { useActionHooks } from './useDialogActionHooks'

const DPUnstake = memo(
  ({ loading, stakedBalance, withdrawHandleAction }: { stakedBalance: IDpBalance; loading: boolean; withdrawHandleAction: any }) => {
    const { t } = useCustomTranslation([LngNs.dp])
    const { params, setParams, totalChoose, selectAllProps } = useActionHooks(stakedBalance)

    const withdrawHandle = useCallback(() => {
      if (params && totalChoose) {
        withdrawHandleAction(params)
      }
    }, [params, withdrawHandleAction])
    return (
      <div className={css.dPStake}>
        <DPBalance dpBalance={stakedBalance} setParams={setParams} selectAllProps={selectAllProps} />
        <div className={css.bottom}>
          <Col flText={t('Total selected')} frNode={<h4>{totalChoose} DPs</h4>} />
          <PrimaryButton label={t('Unstake')} loading={loading} disable={totalChoose === 0} onClick={withdrawHandle} />
        </div>
      </div>
    )
  },
  isEqual
)

export default DPUnstake
