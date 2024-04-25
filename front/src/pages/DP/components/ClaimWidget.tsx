import { LngNs, useCustomTranslation } from '@UI/src/'
import { isEqual } from 'lodash'
import React, { memo, useCallback } from 'react'

import css from './DPStake.module.stylus'
import { ActionBorder, PrimaryButton } from './UIWidget'
export const ClaimWidget = memo(
  ({ claimNumber, isClaimLoading, claimHandleAction }: { claimNumber: string; isClaimLoading: boolean; claimHandleAction: any }) => {
    const { t } = useCustomTranslation([LngNs.dp])
    const showClaimHandle = useCallback(() => {
      claimHandleAction()
    }, [claimHandleAction])
    return (
      <ActionBorder label={t('Rewards')} amountStr={(claimNumber === '0.' ? '0' : claimNumber) + ' $GP'} showViewBtn={false}>
        <div className={css.btnWrap}>
          <PrimaryButton label={t('Claim')} loading={isClaimLoading} disable={false} onClick={showClaimHandle} />
        </div>
      </ActionBorder>
    )
  },
  isEqual
)
