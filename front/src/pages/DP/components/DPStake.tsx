import { LngNs, useActiveWeb3React, useCustomTranslation, useSetRecoilState } from '@UI/src/'
import { isEqual } from 'lodash'
import React, { memo, useCallback, useMemo } from 'react'

import { dpActionDialogState, dpTabIndexState, viewDPStakedDpsDialogState } from '../hooks/state'
import { IDPData, IMyDPData } from '../hooks/useGPAction'
import { ClaimWidget } from './ClaimWidget'
import css from './DPStake.module.stylus'
import { ActionBorder, OutlineButton, PrimaryButton, TitleAndBorder } from './UIWidget'
const DPStake = memo(
  ({
    myDpData,
    preHandleAction,
    isClaimLoading,
    dpData,
    claimHandleAction
  }: {
    myDpData: IMyDPData
    preHandleAction: any
    isClaimLoading: boolean
    dpData: IDPData
    claimHandleAction: any
  }) => {
    const { t } = useCustomTranslation([LngNs.dp])
    const setIsModalOpen = useSetRecoilState(viewDPStakedDpsDialogState)
    const setDpTabIndexState = useSetRecoilState(dpTabIndexState)
    const setDpActionDialogStateOpen = useSetRecoilState(dpActionDialogState)
    const { chainId, account } = useActiveWeb3React()

    const showUnstake = useMemo(() => {
      if (chainId && account && myDpData.stakedTotal != '-' && myDpData.stakedTotal != '0') {
        return true
      }
      return false
    }, [chainId, account, myDpData])
    const handleShowActionDialog = useCallback(
      (index: number) => {
        const isOk = preHandleAction()
        if (isOk) {
          setDpActionDialogStateOpen(true)
          setDpTabIndexState(index)
        }
      },
      [preHandleAction]
    )

    const viewHandle = useCallback(() => {
      const isOk = preHandleAction()
      if (isOk) {
        setIsModalOpen(true)
      }
    }, [preHandleAction])
    return (
      <TitleAndBorder label={'Stake'}>
        <ul className={css.labelTable}>
          {[
            {
              label: 'Total Staked',
              value: dpData.staked,
              valueStr: dpData.stakedStr + ' DPs'
            },
            {
              label: 'Total weight',
              value: dpData.staked,
              valueStr: dpData.stakedStr
            },
            {
              label: 'My weight',
              value: myDpData.stakedTotal,
              valueStr: myDpData.stakedTotalStr
            }
          ].map(v => (
            <li key={v.label}>
              <p className={css.grey}>{t(v.label)}</p>
              <p className={css.title}>{v.valueStr}</p>
            </li>
          ))}
        </ul>
        <div className={css.fr}>
          <ActionBorder label={t('My Staked')} amountStr={myDpData.stakedTotalStr + ' DPs'} showViewBtn={true} showViewBtnClick={viewHandle}>
            <div className={css.btnWrap}>
              {showUnstake ? <OutlineButton label={'-'} loading={false} disable={false} onClick={() => handleShowActionDialog(2)} /> : null}
              <PrimaryButton
                label={t('Stake')}
                loading={false}
                disable={false}
                onClick={() => handleShowActionDialog(1)}
                size={showUnstake ? 'middle' : 'large'}
              />
            </div>
          </ActionBorder>
          <ClaimWidget isClaimLoading={isClaimLoading} claimHandleAction={claimHandleAction} claimNumber={myDpData.stakedClaimStr} />
        </div>
      </TitleAndBorder>
    )
  },
  isEqual
)
export default DPStake
