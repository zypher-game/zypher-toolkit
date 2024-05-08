import { isEqual } from 'lodash'
import React, { memo, useState } from 'react'

import DPActionDialog from './components/dialog/DPActionDialog'
import DPBuyDialog from './components/dialog/DPBuyDialog'
import ViewDPLockedDpsDialog from './components/dialog/ViewDPLockedDpsDialog'
import ViewDPStakedDpsDialog from './components/dialog/ViewDPStakedDpsDialog'
import DPBanner from './components/DPBanner'
import DPLocked from './components/DPLocked'
import DPStake from './components/DPStake'
import css from './dp.module.stylus'
import { useGPAction } from './hooks/useGPAction'
const DP = memo(() => {
  const {
    buyValue,
    setBuyValue,
    lockedViewList,
    stakedBalance,
    dpBalance,
    stakeHandleAction,
    stakeLockHandleAction,
    withdrawHandleAction,
    isApprovedForStaking,
    dpData,
    myDpData,
    isApprove,
    isPointBalanceEnough,
    preHandleAction,
    buyHandleAction,
    isBuyNftLoading,
    isClaimLockLoading,
    claimLockHandleAction,
    isClaimUnLockLoading,
    claimUnLockHandleAction,
    isStakeLoading,
    isStakeLockLoading,
    isWithdrawLoading
  } = useGPAction()
  return (
    <div className={css.dp}>
      <DPBanner preHandleAction={preHandleAction} dpData={dpData} />
      <DPStake
        preHandleAction={preHandleAction}
        myDpData={myDpData}
        isClaimLoading={isClaimUnLockLoading}
        dpData={dpData}
        claimHandleAction={claimUnLockHandleAction}
      />
      <DPLocked
        preHandleAction={preHandleAction}
        myDpData={myDpData}
        isClaimLoading={isClaimLockLoading}
        dpData={dpData}
        claimHandleAction={claimLockHandleAction}
        lockedViewList={lockedViewList}
      />
      <>
        <DPActionDialog
          isApprovedForStaking={isApprovedForStaking}
          stakeHandleAction={stakeHandleAction}
          stakeLockHandleAction={stakeLockHandleAction}
          withdrawHandleAction={withdrawHandleAction}
          dpBalance={dpBalance}
          stakedBalance={stakedBalance}
          isStakeLoading={isStakeLoading}
          isStakeLockLoading={isStakeLockLoading}
          isWithdrawLoading={isWithdrawLoading}
        />
        <DPBuyDialog
          buyHandleAction={buyHandleAction}
          loading={isBuyNftLoading}
          isApprove={isApprove}
          isPointBalanceEnough={isPointBalanceEnough}
          buyValue={buyValue}
          setBuyValue={setBuyValue}
        />
        <ViewDPLockedDpsDialog lockedViewList={lockedViewList} />
        <ViewDPStakedDpsDialog stakedBalance={stakedBalance} />
      </>
    </div>
  )
}, isEqual)
export default DP
