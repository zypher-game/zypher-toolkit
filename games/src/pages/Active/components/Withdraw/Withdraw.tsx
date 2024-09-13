import '../Staking/Staking.styl'

// 质押 满足条件
// withdraw
// 会不会小于金额   =>
// 有没有SBT
// 授权合约
// Rewithdraw  rewithdraw
import { AddressZero } from '@ethersproject/constants'
import {
  ActivePixelButton,
  ActivePixelButtonColor,
  ChainId,
  ChainName,
  Currency,
  defaultActiveChainId,
  LoadingButton,
  PixelBorderCard,
  PixelBorderCardButton,
  preStaticUrl,
  SvgComponent,
  TVLStakingSupportedChainId,
  useIsW768,
  useRecoilValue,
  useSetRecoilState
} from '@ui/src'
import { BigNumberJs } from '@ui/src'
import { isEqual } from 'lodash'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { zeroAddress } from 'viem'

import SelectChainDialog from '../../dialog/SelectChainDialog/SelectChainDialog'
import SelectTokenDialog from '../../dialog/SelectTokenDialog/SelectTokenDialog'
import { canNext } from '../../hooks/activeHooks'
import { useWithdrawHandle } from '../../hooks/useWithdrawHandle'
import { activeDataState, chooseChainState, IActiveDataState, selectChainDialogState, tvlStakingDataState } from '../../state/activeState'
import css from '../Staking/Staking.module.styl'
import TokenWithChain from '../Token/TokenWithChain/TokenWithChain'

const Withdraw = memo(() => {
  const isW768 = useIsW768()
  const chooseChain = useRecoilValue(chooseChainState)
  const [chainIdLocal, setChainIdLocal] = useState<ChainId>()
  const setIsSelectChainModalOpen = useSetRecoilState(selectChainDialogState)
  const {
    withdraw,
    account,
    chainId: chainIdFromStake,
    withdrawInputHandle,
    tvlStakingData,
    withdrawValue,
    withdrawCurrency,
    changeWithdrawCurrencyHandle,
    maxHandle,
    isWithdrawLoading,
    isApproveLoading,
    isDataLoading
  } = useWithdrawHandle()
  useEffect(() => {
    if (chooseChain) {
      setChainIdLocal(chooseChain)
    } else {
      setChainIdLocal(chainIdFromStake)
    }
  }, [chainIdFromStake, chooseChain])
  const chooseValue = useMemo(() => {
    try {
      let res = tvlStakingData[defaultActiveChainId][Currency[defaultActiveChainId]]
      const can = canNext(account, chainIdLocal)
      if (can) {
        if (withdrawCurrency) {
          res = tvlStakingData[chainIdLocal!][withdrawCurrency]
        } else {
          res = tvlStakingData[chainIdLocal!][Currency[chainIdLocal!]]
        }
      }
      return res
    } catch {
      return undefined
    }
  }, [JSON.stringify(tvlStakingData), chainIdLocal, withdrawCurrency])

  const changeChainHandle = useCallback(() => {
    // if (openChainModal) {
    //   openChainModal()
    //   setAccountInfoDialogOpen(false)
    // }
    setIsSelectChainModalOpen(true)
  }, [])
  const { btnLabel, isBalanceEnough } = useMemo(() => {
    const decimal = chooseValue?.decimal ?? 18
    const obj = {
      isApprove: false,
      isBalanceEnough: true,
      btnLabel: '1Confirm'
    }
    if (chainIdFromStake) {
      if (canNext(account, chainIdFromStake)) {
        if (chainIdFromStake !== chooseChain) {
          obj.btnLabel = 'Switch Networks'
        } else {
          // unlocktime
          // 0
          if (!isDataLoading) {
            const tokenAmount = new BigNumberJs(withdrawValue).times(new BigNumberJs('10').exponentiatedBy(decimal)).toFixed()
            if (chooseValue?.withdrawAmount !== '0' && new BigNumberJs(chooseValue?.withdrawAmount ?? '0').gte(tokenAmount)) {
              obj.isBalanceEnough = true
              obj.btnLabel = 'Confirm'
              if (chooseValue?.sbtId && chooseValue?.sbtId !== '0') {
                if (!isWithdrawLoading && chooseValue?.address !== AddressZero && !chooseValue?.allowance) {
                  obj.isApprove = false
                  obj.btnLabel = 'Approve And Destroy SBT'
                } else {
                  obj.isApprove = true
                  obj.btnLabel = 'Destroy SBT'
                }
              }
            } else {
              if (withdrawValue !== '') {
                obj.isBalanceEnough = false
                obj.btnLabel = 'No Enough'
              } else {
                obj.btnLabel = '3Confirm'
                obj.isBalanceEnough = false
              }
            }
          }
        }
      } else {
        obj.btnLabel = 'Switch Networks'
      }
    } else {
      obj.btnLabel = 'Connect Wallet'
    }
    return obj
  }, [JSON.stringify(chooseValue), isWithdrawLoading, isDataLoading, withdrawValue, chainIdFromStake, chooseChain])

  return (
    <PixelBorderCard width={isW768 ? '100%' : '505px'} className={`staking_staking ${css.staking}`} pixel_height={9} backgroundColor="#1D263B">
      <h3 className={css.title}>Withdraw</h3>
      {TVLStakingSupportedChainId.length < 2 ? null : (
        <PixelBorderCardButton className="staking_switch" height={isW768 ? '32px' : '36px'} width="100%" pixel_height={6} onClick={changeChainHandle}>
          <p>Current network: {ChainName[chainIdFromStake]}</p>
          <SvgComponent src={preStaticUrl + '/img/icon/pixel_switch.svg'} />
        </PixelBorderCardButton>
      )}
      <div className={css.staking_token_detail}>
        <p className={css.staking_token_detail_fl}>You can Withdraw</p>
        <div className={css.staking_token_detail_fr}>
          <p className={css.balance}>
            Balance: {chooseValue?.withdrawAmountStr}
            {chooseValue?.withdrawAmountStr === '' ? <LoadingButton isLoading={isDataLoading} /> : <></>}
          </p>
          {chooseValue ? <TokenWithChain chainId={chainIdLocal} token={chooseValue} /> : null}
          <ActivePixelButton className={css.staking_max} width="40px" height="20px" backgroundColor="#661AFF" pixel_height={2} onClick={maxHandle}>
            <p>MAX</p>
          </ActivePixelButton>
        </div>
      </div>
      <PixelBorderCard
        className="staking_input"
        width="100%"
        height={isW768 ? '44px' : '58px'}
        pixel_height={6}
        backgroundColor="#343C4F"
        borderColor="#484F60"
      >
        <input onChange={withdrawInputHandle} type="text" value={withdrawValue} />
        <ActivePixelButton
          className={`staking_input_btn ${css.staking_input_btn}`}
          backgroundColor="#1649FF"
          pixel_height={6}
          onClick={changeWithdrawCurrencyHandle}
        >
          {chooseValue ? <TokenWithChain chainId={chainIdLocal} token={chooseValue} width={22} /> : null}
          <p>{chooseValue?.symbol}</p>
          <SvgComponent src={preStaticUrl + '/img/icon/pixel_arrow_down.svg'} />
        </ActivePixelButton>
      </PixelBorderCard>
      <HasSbt chainIdLocal={chainIdLocal} />
      <ActivePixelButtonColor
        className="staking_confirm staking_confirm_top"
        width="100%"
        height={isW768 ? '48px' : '54px'}
        pixel_height={5}
        onClick={withdraw}
        disable={isWithdrawLoading || isApproveLoading || isDataLoading || !isBalanceEnough}
        themeType="brightBlue"
      >
        <p>{btnLabel}</p>
        <LoadingButton isLoading={isWithdrawLoading || isApproveLoading} />
      </ActivePixelButtonColor>
      <SelectTokenDialog />
      <SelectChainDialog />
    </PixelBorderCard>
  )
}, isEqual)
const HasSbt = memo(({ chainIdLocal }: { chainIdLocal?: ChainId }) => {
  const tvlStakingData = useRecoilValue(tvlStakingDataState)
  const activeDataSource = useRecoilValue<IActiveDataState>(activeDataState)
  const label = useMemo(() => {
    if (chainIdLocal) {
      const hasList = Object.values(tvlStakingData[chainIdLocal]).filter(v => v.address !== zeroAddress && v.sbtId && v.sbtId !== '0')
      if (hasList && hasList.length) {
        const mintMinimumStr = activeDataSource[chainIdLocal]?.mintMinimumStr
        return `SBT - ${hasList.map(v => `${mintMinimumStr}${v.symbol}`).join(' / ')}`
      }
    }
  }, [chainIdLocal, JSON.stringify(activeDataSource), JSON.stringify(tvlStakingData)])
  if (label && label !== '0') {
    return (
      <div className={css.label}>
        <p className={css.sbt}>{label}</p>
        <p className={css.warn}>
          ⚠️ If you do not meet the conditions for using SBT after withdrawing, we will ask you to authorize the destruction of SBT before withdrawing
          your balance.
        </p>
      </div>
    )
  }
  return null
}, isEqual)
export default Withdraw
