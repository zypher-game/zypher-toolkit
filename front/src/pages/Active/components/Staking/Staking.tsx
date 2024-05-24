import './Staking.styl'

import { AddressZero } from '@ethersproject/constants'
import {
  ActivePixelButton,
  ActivePixelButtonColor,
  ChainId,
  ChainName,
  Currency,
  LoadingButton,
  PixelBorderCard,
  PixelBorderCardButton,
  preStaticUrl,
  SvgComponent,
  useRecoilValue,
  useSetRecoilState
} from '@ui/src'
import { BigNumberJs } from '@ui/src'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'

import { defaultActiveChainId } from '../../constants/activeConstants'
import SelectChainDialog from '../../dialog/SelectChainDialog/SelectChainDialog'
import SelectTokenDialog from '../../dialog/SelectTokenDialog/SelectTokenDialog'
import { canNext } from '../../hooks/activeHooks'
import { useStakeHandle } from '../../hooks/useStakeHandle'
import { chooseChainState, selectChainDialogState } from '../../state/activeState'
import TokenWithChain from '../Token/TokenWithChain/TokenWithChain'
import css from './Staking.module.styl'
const Staking = memo(() => {
  const chooseChain = useRecoilValue(chooseChainState)
  const [chainIdLocal, setChainIdLocal] = useState<ChainId>()
  const setIsSelectChainModalOpen = useSetRecoilState(selectChainDialogState)
  const {
    deposit,
    account,
    chainId: chainIdFromStake,
    depositInputHandle,
    tvlStakingData,
    depositValue,
    depositCurrency,
    changeDepositCurrencyHandle,
    maxHandle,
    isDepositLoading,
    isApproveLoading,
    isDataLoading
  } = useStakeHandle()
  useEffect(() => {
    if (chooseChain) {
      setChainIdLocal(chooseChain)
    } else {
      setChainIdLocal(chainIdFromStake)
    }
  }, [chainIdFromStake, chooseChain])
  const chooseValue = useMemo(() => {
    const can = canNext(account, chainIdLocal)
    if (can && depositCurrency) {
      return tvlStakingData[chainIdLocal!][depositCurrency]
    }
    if (can) {
      return tvlStakingData[chainIdLocal!][Currency[chainIdLocal!]]
    }
    return tvlStakingData[defaultActiveChainId][Currency[defaultActiveChainId]]
  }, [JSON.stringify(tvlStakingData), chainIdLocal, depositCurrency])
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
            const tokenAmount = new BigNumberJs(depositValue).times(new BigNumberJs('10').exponentiatedBy(decimal)).toFixed()
            if (chooseValue.balance !== '0' && new BigNumberJs(chooseValue.balance).gte(tokenAmount)) {
              obj.isBalanceEnough = true
              obj.btnLabel = 'Confirm'
              if (chooseValue.address !== AddressZero && new BigNumberJs(chooseValue.allowance).lt(tokenAmount)) {
                obj.isApprove = false
                obj.btnLabel = 'Approve'
              }
            } else {
              obj.isBalanceEnough = false
              obj.btnLabel = 'No Balance'
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
  }, [JSON.stringify(chooseValue), isDataLoading, depositValue, chainIdFromStake, chooseChain])

  const changeChainHandle = useCallback(() => {
    // if (openChainModal) {
    //   openChainModal()
    //   setAccountInfoDialogOpen(false)
    // }
    setIsSelectChainModalOpen(true)
  }, [])
  const { totalStaked, earnPoints, finalPoints } = useMemo(() => {
    const obj = {
      totalStaked: '',
      earnPoints: '',
      finalPoints: ''
    }
    try {
      if (!isDataLoading) {
        if (depositValue) {
          const decimal = chooseValue?.decimal ?? 18
          const _totalStaked = new BigNumberJs(depositValue).plus(
            new BigNumberJs(chooseValue.userStakedAmount === '' ? '0' : chooseValue.userStakedAmount).dividedBy(
              new BigNumberJs('10').exponentiatedBy(decimal)
            )
          )
          const X = new BigNumberJs(Math.ceil(new BigNumberJs(_totalStaked).toNumber())).times(10) // _totalStaked 的值向上取整就是其系数

          const END_TIME = +(chooseValue.END_TIME ?? '0') // 从合约获取的时间
          const nowTimestamp = Date.now() / 1000 // 当前时间
          const END_TIMEDate = new Date(END_TIME * 1000)
          const currentDate = new Date(nowTimestamp * 1000)
          const differenceInMilliseconds = END_TIMEDate.getTime() - currentDate.getTime() // 计算两者之间的时间差（毫秒），一共还剩多少
          const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24)) // 转换为天数

          const _earnPoints = X.plus(new BigNumberJs(depositValue)) // 系数值 + 输入值
          const _finalPoints = new BigNumberJs(differenceInDays).times(_earnPoints) // 还剩多少天 乘 _earnPoints
          console.log({
            depositValue,
            X: X.toFixed(),
            END_TIME,
            differenceInDays,
            _earnPoints: _earnPoints.toFixed(2),
            _finalPoints: _finalPoints.toFixed(2)
          })
          return {
            totalStaked: _totalStaked.toFormat(2),
            earnPoints: _earnPoints.toFormat(2),
            finalPoints: _finalPoints.toFormat(2)
          }
        }
      }
      return obj
    } catch {
      return obj
    }
  }, [JSON.stringify(chooseValue), isDataLoading, depositValue])
  return (
    <PixelBorderCard width="505px" className={`staking_staking ${css.staking}`} pixel_height={9} backgroundColor="#1D263B">
      <h3 className={css.title}>Staking</h3>
      <PixelBorderCardButton className="staking_switch" height="36px" width="100%" pixel_height={6} onClick={changeChainHandle}>
        <p>Current network: {ChainName[chainIdFromStake]}</p>
        <SvgComponent src={preStaticUrl + '/img/icon/pixel_switch.svg'} />
      </PixelBorderCardButton>
      <div className={css.staking_token_detail}>
        <p className={css.staking_token_detail_fl}>You can restake</p>
        <div className={css.staking_token_detail_fr}>
          <p className={css.balance}>
            Balance: {chooseValue.balanceStr}
            {chooseValue.balanceStr === '' ? <LoadingButton isLoading={isDataLoading} /> : <></>}
          </p>
          <TokenWithChain chainId={chainIdLocal} token={chooseValue} />
          <ActivePixelButton className={css.staking_max} width="40px" height="20px" backgroundColor="#661AFF" pixel_height={2} onClick={maxHandle}>
            <p>MAX</p>
          </ActivePixelButton>
        </div>
      </div>
      <PixelBorderCard className="staking_input" width="100%" height="58px" pixel_height={6} backgroundColor="#343C4F" borderColor="#484F60">
        <input onChange={depositInputHandle} type="text" value={depositValue} />
        <ActivePixelButton
          className={`staking_input_btn ${css.staking_input_btn}`}
          backgroundColor="#1649FF"
          pixel_height={6}
          onClick={changeDepositCurrencyHandle}
        >
          <TokenWithChain chainId={chainIdLocal} token={chooseValue} width={22} />
          <p>{chooseValue.symbol}</p>
          <SvgComponent src={preStaticUrl + '/img/icon/pixel_arrow_down.svg'} />
        </ActivePixelButton>
      </PixelBorderCard>
      <ul className={css.text_li}>
        <li>
          <p>Total Staked</p>
          <p>{totalStaked}</p>
        </li>
        <li>
          <p>Earn Points</p>
          <p>{earnPoints}</p>
        </li>
        <li>
          <p>Estimated final points based on duration</p>
          <p>{finalPoints}</p>
        </li>
        <li>
          <p>$GP earned</p>
          <p>Released every week</p>
        </li>
      </ul>
      <ActivePixelButtonColor
        className="staking_confirm"
        width="100%"
        height="52px"
        pixel_height={5}
        onClick={deposit}
        disable={isDepositLoading || isApproveLoading}
        themeType="brightBlue"
      >
        <p>{btnLabel}</p>
        <LoadingButton isLoading={isDepositLoading || isApproveLoading} />
      </ActivePixelButtonColor>
      <SelectTokenDialog />
      <SelectChainDialog />
    </PixelBorderCard>
  )
})
export default Staking
