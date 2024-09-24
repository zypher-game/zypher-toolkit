import '../Staking/Staking.styl'

import {
  ActivePixelButton,
  ActivePixelButtonColor,
  BigNumberJs,
  ChainId,
  ChainName,
  Currency,
  defaultActiveChainId,
  formatMoney,
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
import { isEqual } from 'lodash'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { zeroAddress } from 'viem'

import SelectChainDialog from '../../dialog/SelectChainDialog/SelectChainDialog'
import SelectTokenDialog from '../../dialog/SelectTokenDialog/SelectTokenDialog'
import { canNext } from '../../hooks/activeHooks'
import { useRedeposit } from '../../hooks/useRedeposit'
import { useTable } from '../../hooks/useStakeHandle'
import { chooseChainState, selectChainDialogState } from '../../state/activeState'
import css from '../Staking/Staking.module.styl'
import TokenWithChain from '../Token/TokenWithChain/TokenWithChain'

const Redeposit = memo(() => {
  const isW768 = useIsW768()
  const chooseChain = useRecoilValue(chooseChainState)
  const [chainIdLocal, setChainIdLocal] = useState<ChainId>()
  const setIsSelectChainModalOpen = useSetRecoilState(selectChainDialogState)
  const {
    selectLen,
    Increment,
    Lock,
    account,
    chainId: chainIdFromStake,
    tvlStakingData,
    redepositCurrency,
    changeRedepositCurrencyHandle,
    isRedepositLoading,
    isApproveLoading,
    isDataLoading,
    week,
    handleWeekChange,
    redepositValue,
    maxHandle,
    redepositInputHandle,
    isIncrementLoading,
    revisedUnLockTimeStr
  } = useRedeposit()
  const { native, erc20 } = useTable()
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
        if (redepositCurrency) {
          res = tvlStakingData[chainIdLocal!][redepositCurrency]
        } else {
          res = tvlStakingData[chainIdLocal!][Currency[chainIdLocal!]]
        }
      }
      return res
    } catch {
      return undefined
    }
  }, [JSON.stringify(tvlStakingData), chainIdLocal, redepositCurrency])
  const hasLock = useMemo(() => {
    try {
      if (chooseValue) {
        if (chooseValue.extendAmount !== '0') {
          return true
        }
      }
      return false
    } catch (e) {
      return false
    }
  }, [JSON.stringify(chooseValue)])
  const { btnLabel } = useMemo(() => {
    const decimal = chooseValue?.decimal ?? 18
    const obj = {
      isApprove: false,
      isBalanceEnough: true,
      btnLabel: 'Confirm'
    }
    if (chainIdFromStake) {
      if (canNext(account, chainIdFromStake)) {
        if (chainIdFromStake !== chooseChain) {
          obj.btnLabel = 'Switch Networks'
        } else {
          if (!isDataLoading) {
            const tokenAmount = new BigNumberJs(redepositValue).times(new BigNumberJs('10').exponentiatedBy(decimal)).toFixed()
            if (chooseValue?.balance !== '0' && new BigNumberJs(chooseValue?.balance ?? '0').gte(tokenAmount)) {
              obj.isBalanceEnough = true
              obj.btnLabel = 'Confirm'
              if (!isRedepositLoading && chooseValue?.address !== zeroAddress && new BigNumberJs(chooseValue?.allowance ?? '0').lt(tokenAmount)) {
                obj.isApprove = false
                obj.btnLabel = 'Approve'
              } else {
                if (hasLock) {
                  obj.btnLabel = 'Submit'
                } else {
                  obj.btnLabel = 'Increment'
                }
              }
            } else {
              if (redepositValue !== '') {
                obj.isBalanceEnough = false
                obj.btnLabel = 'No Balance'
              } else {
                obj.btnLabel = 'Confirm'
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
  }, [JSON.stringify(chooseValue), hasLock, isRedepositLoading, isDataLoading, redepositValue, chainIdFromStake, chooseChain])

  const changeChainHandle = useCallback(() => {
    setIsSelectChainModalOpen(true)
  }, [])

  const { totalDeposit } = useMemo(() => {
    const obj = {
      totalDeposit: ''
    }
    try {
      if (chooseValue?.chainId) {
        if (!isDataLoading) {
          if (redepositValue) {
            const decimal = chooseValue?.decimal ?? 18
            const preStakingBig = hasLock
              ? new BigNumberJs(chooseValue && chooseValue.extendAmount === '' ? '0' : chooseValue?.extendAmount ?? '')
              : new BigNumberJs(chooseValue && chooseValue.withdrawAmount === '' ? '0' : chooseValue?.withdrawAmount ?? '')
            const _totalStaked = new BigNumberJs(redepositValue).plus(
              new BigNumberJs(preStakingBig).dividedBy(new BigNumberJs('10').exponentiatedBy(decimal))
            )
            return {
              totalDepositNumber: _totalStaked.toString(),
              totalDeposit: formatMoney(_totalStaked.toFixed(), 8)
            }
          }
        }
      }
      return obj
    } catch {
      return obj
    }
  }, [JSON.stringify(chooseValue), hasLock, isDataLoading, redepositValue, JSON.stringify(native), JSON.stringify(erc20)])
  return (
    <PixelBorderCard width={isW768 ? '100%' : '505px'} className={`staking_staking ${css.staking}`} pixel_height={9} backgroundColor="#1D263B">
      <h3 className={css.title}>Deposit</h3>
      {TVLStakingSupportedChainId.length < 2 ? null : (
        <PixelBorderCardButton className="staking_switch" height={isW768 ? '32px' : '36px'} width="100%" pixel_height={6} onClick={changeChainHandle}>
          <p>Current network: {ChainName[chainIdFromStake]}</p>
          <SvgComponent src={preStaticUrl + '/img/icon/pixel_switch.svg'} />
        </PixelBorderCardButton>
      )}
      <div className={css.staking_token_detail}>
        <p className={css.staking_token_detail_fl}>You can Deposit</p>
        <div className={css.staking_token_detail_fr}>
          <p className={css.balance}>
            Balance: {chooseValue?.balanceStr}
            {chooseValue?.balanceStr === '' ? <LoadingButton isLoading={isDataLoading} /> : <></>}
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
        <input onChange={redepositInputHandle} type="text" value={redepositValue} />
        <ActivePixelButton
          className={`staking_input_btn ${css.staking_input_btn}`}
          backgroundColor="#1649FF"
          pixel_height={6}
          onClick={changeRedepositCurrencyHandle}
        >
          {chooseValue ? <TokenWithChain chainId={chainIdLocal} token={chooseValue} width={22} /> : null}
          <p>{chooseValue?.symbol}</p>
          <SvgComponent src={preStaticUrl + '/img/icon/pixel_arrow_down.svg'} />
        </ActivePixelButton>
      </PixelBorderCard>
      {hasLock ? (
        <ul className={css.text_li}>
          <li>
            <p>Total Deposit</p>
            <div className={css.fr}>
              <p>{totalDeposit}</p>
              <LoadingButton isLoading={isDataLoading} />
            </div>
          </li>
          <li>
            <p>Unlock Time</p>
            <div className={css.fr}>
              <p>{chooseValue?.unlockTimeStr}</p>
              <LoadingButton isLoading={isDataLoading} />
            </div>
          </li>
        </ul>
      ) : (
        <>
          <ul className={`${css.text_li} ${css.text_li_margin20}`}>
            <li>
              <p>Unwithdraw</p>
              <div className={css.fr}>
                <p>{chooseValue?.withdrawAmountStr}</p>
                <LoadingButton isLoading={isDataLoading} />
              </div>
            </li>
            <li>
              <p>Total Deposit</p>
              <div className={css.fr}>
                <p>{totalDeposit}</p>
                <LoadingButton isLoading={isDataLoading} />
              </div>
            </li>
            <li>
              <p>Revised Unlock Time</p>
              <div className={css.fr}>
                <p>{revisedUnLockTimeStr}</p>
                <LoadingButton isLoading={isDataLoading} />
              </div>
            </li>
          </ul>
          <PixelBorderCard
            className="staking_input staking_week"
            width="100%"
            height={isW768 ? '44px' : '58px'}
            pixel_height={6}
            backgroundColor="#343C4F"
            borderColor="#484F60"
          >
            <select className={css.select} value={week} onChange={handleWeekChange}>
              {selectLen.map(v => (
                <option key={v} value={v}>
                  {v} week
                </option>
              ))}
            </select>
          </PixelBorderCard>
        </>
      )}
      {hasLock ? (
        <ActivePixelButtonColor
          className={`staking_confirm ${hasLock ? '' : 'staking_confirm_top'}`}
          width="100%"
          height={isW768 ? '48px' : '54px'}
          pixel_height={5}
          onClick={() => Increment(hasLock)}
          disable={isRedepositLoading || isIncrementLoading || isApproveLoading || isDataLoading}
          themeType="brightBlue"
        >
          <p>{btnLabel}</p>
          <LoadingButton isLoading={isRedepositLoading || isIncrementLoading || isApproveLoading} />
        </ActivePixelButtonColor>
      ) : (
        <>
          <div className={css.btn}>
            <ActivePixelButtonColor
              className="staking_confirm"
              width="100%"
              height={isW768 ? '48px' : '54px'}
              pixel_height={5}
              onClick={() => Increment(hasLock)}
              disable={isIncrementLoading || isApproveLoading || isDataLoading}
              themeType="brightBlue"
            >
              <p>{btnLabel}</p>
              <LoadingButton isLoading={isIncrementLoading || isApproveLoading} />
            </ActivePixelButtonColor>
            <ActivePixelButtonColor
              className="staking_confirm"
              width="100%"
              height={isW768 ? '48px' : '54px'}
              pixel_height={5}
              onClick={() => Lock(hasLock)}
              disable={isRedepositLoading || hasLock || isDataLoading || !chooseValue?.withdrawAmount || chooseValue?.withdrawAmount === '0'}
              themeType="brightBlue"
            >
              <p>Lock</p>
              <LoadingButton isLoading={isRedepositLoading} />
            </ActivePixelButtonColor>
          </div>
        </>
      )}
      <SelectTokenDialog />
      <SelectChainDialog />
    </PixelBorderCard>
  )
}, isEqual)
export default Redeposit
