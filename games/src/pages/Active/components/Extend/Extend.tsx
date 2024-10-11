import '../Staking/Staking.styl'

import {
  ActivePixelButton,
  ActivePixelButtonColor,
  ChainId,
  ChainName,
  Currency,
  defaultActiveChainId,
  hideTVLStakingSupportedChainId,
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

import SelectChainDialog from '../../dialog/SelectChainDialog/SelectChainDialog'
import SelectTokenDialog from '../../dialog/SelectTokenDialog/SelectTokenDialog'
import { canNext } from '../../hooks/activeHooks'
import { useExtend } from '../../hooks/useExtend'
import { chooseChainState, selectChainDialogState } from '../../state/activeState'
import css from '../Staking/Staking.module.styl'
import TokenWithChain from '../Token/TokenWithChain/TokenWithChain'

const Extend = memo(() => {
  const isW768 = useIsW768()
  const chooseChain = useRecoilValue(chooseChainState)
  const [chainIdLocal, setChainIdLocal] = useState<ChainId>()
  const setIsSelectChainModalOpen = useSetRecoilState(selectChainDialogState)
  const {
    selectLen,
    extend,
    account,
    chainId: chainIdFromStake,
    tvlStakingData,
    extendCurrency,
    changeExtendCurrencyHandle,
    isExtendLoading,
    isApproveLoading,
    isDataLoading,
    week,
    handleWeekChange,
    revisedUnLockTimeStr
  } = useExtend()
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
        if (extendCurrency) {
          res = tvlStakingData[chainIdLocal!][extendCurrency]
        } else {
          res = tvlStakingData[chainIdLocal!][Currency[chainIdLocal!]]
        }
      }
      return res
    } catch {
      return undefined
    }
  }, [JSON.stringify(tvlStakingData), chainIdLocal, extendCurrency])
  const { btnLabel } = useMemo(() => {
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
            if (chooseValue?.withdrawAmount && chooseValue?.withdrawAmount === '0') {
              obj.isBalanceEnough = false
              obj.btnLabel = 'No Balance'
            } else {
              obj.btnLabel = 'Confirm'
              obj.isBalanceEnough = false
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
  }, [JSON.stringify(chooseValue), isExtendLoading, isDataLoading, chainIdFromStake, chooseChain])

  const changeChainHandle = useCallback(() => {
    // if (openChainModal) {
    //   openChainModal()
    //   setAccountInfoDialogOpen(false)
    // }
    setIsSelectChainModalOpen(true)
  }, [])

  return (
    <PixelBorderCard width={isW768 ? '100%' : '505px'} className={`staking_staking ${css.staking}`} pixel_height={9} backgroundColor="#1D263B">
      <h3 className={css.title}>Extend</h3>
      {hideTVLStakingSupportedChainId ? null : (
        <PixelBorderCardButton className="staking_switch" height={isW768 ? '32px' : '36px'} width="100%" pixel_height={6} onClick={changeChainHandle}>
          <p>Current network: {ChainName[chainIdFromStake]}</p>
          <SvgComponent src={preStaticUrl + '/img/icon/pixel_switch.svg'} />
        </PixelBorderCardButton>
      )}
      <div className={css.staking_token_detail}>
        <p className={css.staking_token_detail_fl}>You can Extend</p>
        <div className={css.staking_token_detail_fr}>
          <p className={css.balance}>
            Balance: {chooseValue?.withdrawAmountStr}
            {chooseValue?.withdrawAmountStr === '' ? <LoadingButton isLoading={isDataLoading} /> : <></>}
          </p>
          {chooseValue ? <TokenWithChain chainId={chainIdLocal} token={chooseValue} /> : null}
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
        <input type="text" disabled={true} value={chooseValue?.withdrawAmountStr} />
        <ActivePixelButton
          className={`staking_input_btn ${css.staking_input_btn}`}
          backgroundColor="#1649FF"
          pixel_height={6}
          onClick={changeExtendCurrencyHandle}
        >
          {chooseValue ? <TokenWithChain chainId={chainIdLocal} token={chooseValue} width={22} /> : null}
          <p>{chooseValue?.symbol}</p>
          <SvgComponent src={preStaticUrl + '/img/icon/pixel_arrow_down.svg'} />
        </ActivePixelButton>
      </PixelBorderCard>
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
      <ul className={`${css.text_li} ${css.text_li_margin20}`}>
        <li>
          <p>Current Unlock Time</p>
          <div className={css.fr}>
            <p>{chooseValue?.unlockTimeStr}</p>
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
      <ActivePixelButtonColor
        className="staking_confirm staking_confirm_top"
        width="100%"
        height={isW768 ? '48px' : '54px'}
        pixel_height={5}
        onClick={extend}
        disable={isExtendLoading || isApproveLoading || isDataLoading || btnLabel === 'No Balance'}
        themeType="brightBlue"
      >
        <p>{btnLabel}</p>
        <LoadingButton isLoading={isExtendLoading || isApproveLoading} />
      </ActivePixelButtonColor>
      <SelectTokenDialog />
      <SelectChainDialog />
    </PixelBorderCard>
  )
}, isEqual)
export default Extend
