import { LngNs, useCustomTranslation, useSetRecoilState } from '@ui/src'
import { useIsMobile } from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo, useCallback, useState } from 'react'

import NoDataPage from '@/components/NoData'

import { dpActionDialogState, dpTabIndexState, viewDPLockedDpsDialogState } from '../hooks/state'
import { IDPData, ILockedItem, IMyDPData } from '../hooks/useGPAction'
import { ClaimWidget } from './ClaimWidget'
import { getLockedTimesStr } from './dialog/DPAction/DPLocked'
import css from './DPStake.module.stylus'
import { ActionBorder, PlainArrowButton, PrimaryButton, TitleAndBorder } from './UIWidget'
const DPLocked = memo(
  ({
    myDpData,
    preHandleAction,
    isClaimLoading,
    claimHandleAction,
    dpData,
    lockedViewList
  }: {
    myDpData: IMyDPData
    preHandleAction: any
    isClaimLoading: boolean
    claimHandleAction: any
    dpData: IDPData
    lockedViewList?: ILockedItem[]
  }) => {
    const isMobile = useIsMobile()
    const { t } = useCustomTranslation([LngNs.dp])
    const [show, setShow] = useState(false)
    const setIsModalOpen = useSetRecoilState(viewDPLockedDpsDialogState)
    const setDpTabIndexState = useSetRecoilState(dpTabIndexState)
    const setDpActionDialogStateOpen = useSetRecoilState(dpActionDialogState)
    const showHandle = useCallback(() => {
      setShow(!show)
    }, [show])
    const viewHandle = useCallback(() => {
      const isOk = preHandleAction()
      if (isOk) {
        setIsModalOpen(true)
      }
    }, [preHandleAction])
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
    return (
      <TitleAndBorder
        label={t('Lock')}
        bottom={
          <>
            <PlainArrowButton label={t('locked details')} show={show} onClick={showHandle} />
            {show ? <ShowTableDetail lockedViewList={lockedViewList} /> : null}
          </>
        }
      >
        <ul className={css.labelTable}>
          {[
            {
              label: t('Total Locked'),
              value: dpData.locked,
              valueStr: dpData.lockedStr + ' DPs'
            },
            {
              label: t('Total weight'),
              value: dpData.lockWeight,
              valueStr: dpData.lockWeightStr
            },
            {
              label: t('My weight'),
              value: myDpData.lockWeight,
              valueStr: myDpData.lockWeightStr
            }
          ].map(v => (
            <li key={v.label}>
              <p className={css.grey}>{v.label}</p>
              <p className={css.title}>{v.valueStr}</p>
            </li>
          ))}
        </ul>
        <div className={css.fr}>
          <ActionBorder label={t('My Locked')} amountStr={myDpData.lockedTotalStr + ' DPs'} showViewBtn={true} showViewBtnClick={viewHandle}>
            <div className={css.btnWrap}>
              <PrimaryButton
                label={t('Lock')}
                loading={false}
                disable={false}
                onClick={() => handleShowActionDialog(0)}
                size={isMobile ? 'middle' : 'large'}
              />
            </div>
          </ActionBorder>
          <ClaimWidget isClaimLoading={isClaimLoading} claimHandleAction={claimHandleAction} claimNumber={myDpData.lockedClaimStr} />
        </div>
      </TitleAndBorder>
    )
  },
  isEqual
)
const ShowTableDetail = memo(({ lockedViewList }: { lockedViewList?: ILockedItem[] }) => {
  const { t } = useCustomTranslation([LngNs.dp])
  const isMobile = useIsMobile()
  if (!lockedViewList || lockedViewList.length === 0) {
    return <NoDataPage style={{ padding: '20px 0 30px' }} />
  }
  if (isMobile) {
    return (
      <div className={css.table}>
        <div className={css.tableHeader}>
          {[[t('My Locked')], [t('Lock duration'), t('My weight')], [t('Latest lock time'), t('Expire date')]].map(v => (
            <p key={v[0]} className={css.col}>
              {v.map(vv => (
                <i key={vv}>{vv}</i>
              ))}
            </p>
          ))}
        </div>
        <div className={css.tableBody}>
          {lockedViewList.map((vv: ILockedItem, index: number) => (
            <div className={css.row} key={index}>
              {[[vv.amount + ' DPs'], [getLockedTimesStr(vv.duration), vv.weightStr], [vv.lastLockTimeStr, vv.unlockTimeStr]].map(v => (
                <p key={v[0]} className={css.col}>
                  {v.map(vvv => (
                    <i key={vvv}>{vvv}</i>
                  ))}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }
  return (
    <div className={css.table}>
      <div className={css.tableHeader}>
        {[t('My Locked'), t('Lock duration'), t('My weight'), t('Latest lock time'), t('Expire date')].map(v => (
          <p key={v} className={css.col}>
            {v}
          </p>
        ))}
      </div>
      <div className={css.tableBody}>
        {lockedViewList.map((vv: ILockedItem, index: number) => (
          <div className={css.row} key={index}>
            {[vv.amount + ' DPs', getLockedTimesStr(vv.duration), vv.weightStr, vv.lastLockTimeStr, vv.unlockTimeStr].map(v => (
              <p key={v} className={css.col}>
                {v}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}, isEqual)
export default DPLocked
