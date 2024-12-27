import {
  ActivePixelButton,
  ActivePixelButtonColor,
  BigNumberJs,
  ChainId,
  ChainName,
  Currency,
  defaultActiveChainId,
  formatMoney,
  hideTVLStakingSupportedChainId,
  LoadingButton,
  PixelBorderCard,
  PixelBorderCardButton,
  PixelCube2,
  preStaticUrl,
  SvgComponent,
  TokenWithChain,
  TVLChainId,
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
import { ChainGrowthCoefficient } from '../Staking/Staking'

const Redeposit = memo(({ isModal }: { isModal: boolean }) => {
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
  const { canOnlyLock, canIncrease, canOnlyIncrease } = useMemo(() => {
    const obj = {
      canOnlyLock: false,
      canOnlyIncrease: false,
      canIncrease: true
    }
    try {
      if (chooseValue) {
        // 到期了
        if (chooseValue.withdrawAmount !== '0') {
          obj.canIncrease = false
          obj.canOnlyLock = true
        }
        // 有锁期 还没到期
        if (chooseValue.extendAmount !== '0') {
          obj.canOnlyIncrease = true
        }
      }
    } catch (e) {}
    return obj
  }, [JSON.stringify(chooseValue)])
  const { btnLabel, canIncreaseClick } = useMemo(() => {
    const decimal = chooseValue?.decimal ?? 18
    const obj = {
      isApprove: false,
      isBalanceEnough: true,
      btnLabel: 'Increased',
      canIncreaseClick: true,
      canOnlyLockClick: false
    }

    if (chainIdFromStake) {
      if (canNext(account, chainIdFromStake)) {
        if (chainIdFromStake !== chooseChain) {
          obj.btnLabel = 'Switch Networks'
        } else {
          if (!isDataLoading) {
            if (!redepositValue || redepositValue === '') {
            } else {
              const tokenAmount = new BigNumberJs(redepositValue).times(new BigNumberJs('10').exponentiatedBy(decimal)).toFixed()
              if (chooseValue?.balance !== '0' && new BigNumberJs(chooseValue?.balance ?? '0').gte(tokenAmount)) {
                obj.isBalanceEnough = true
                if (!isRedepositLoading && chooseValue?.address !== zeroAddress && new BigNumberJs(chooseValue?.allowance ?? '0').lt(tokenAmount)) {
                  obj.isApprove = false
                  obj.btnLabel = 'Approve'
                } else {
                  obj.btnLabel = 'Increment'
                }
              } else {
                if (redepositValue !== '') {
                  obj.isBalanceEnough = false
                  obj.btnLabel = 'No Balance'
                } else {
                  obj.btnLabel = 'Increment'
                  obj.isBalanceEnough = false
                }
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
    if (obj.btnLabel === 'No Balance' || isIncrementLoading || isApproveLoading || isDataLoading) {
      obj.canIncreaseClick = false
    }
    if (canOnlyLock) {
      obj.canIncreaseClick = false
    }
    return obj
  }, [
    canOnlyLock,
    JSON.stringify(chooseValue),
    canIncrease,
    isRedepositLoading,
    isDataLoading,
    isIncrementLoading,
    isApproveLoading,
    redepositValue,
    chainIdFromStake,
    chooseChain
  ])
  const changeChainHandle = useCallback(() => {
    setIsSelectChainModalOpen(true)
  }, [])

  const { totalDeposit, currency, stakingLabel, earnPoints } = useMemo(() => {
    const obj = {
      totalDepositNumber: '',
      totalDeposit: '',
      earnPoints: '',
      currency: '',
      stakingLabel: ''
    }
    try {
      if (chooseValue?.chainId) {
        const isNative = chooseValue?.symbol === Currency[chooseValue.chainId] || chooseValue?.symbol === 'W' + Currency[chooseValue.chainId]
        if (!isDataLoading) {
          if (redepositValue) {
            const decimal = chooseValue?.decimal ?? 18
            const value =
              chooseValue && (chooseValue.extendAmount === '' || chooseValue.extendAmount === '0')
                ? chooseValue?.withdrawAmount
                : chooseValue.extendAmount
            const preStakingBig = new BigNumberJs(value)
            const _totalStaked = new BigNumberJs(redepositValue).plus(
              new BigNumberJs(preStakingBig).dividedBy(new BigNumberJs('10').exponentiatedBy(decimal))
            )

            obj.totalDepositNumber = _totalStaked.toString()
            obj.totalDeposit = formatMoney(_totalStaked.toFixed(), 8)

            let X
            const _chainId = chooseValue?.chainId as unknown as TVLChainId
            const CeilAmountPre = Math.ceil(new BigNumberJs(_totalStaked).toNumber())
            const CeilAmount = CeilAmountPre > 5 ? 5 : CeilAmountPre
            if (isNative) {
              X = new BigNumberJs(CeilAmount).times(ChainGrowthCoefficient[_chainId]['native']) // _totalStaked 的值向上取整就是其系数
            } else {
              X = new BigNumberJs(CeilAmount).times(ChainGrowthCoefficient[_chainId]['erc20']) // _totalStaked 的值向上取整就是其系数
            }
            const _earnPoints = X.times(new BigNumberJs(_totalStaked)) // 系数值 + 输入值
            obj.earnPoints = formatMoney(_earnPoints.toFixed(), 8)
          }
          obj.currency = chooseValue.symbol
          obj.stakingLabel = isNative ? 'Staking' : 'Restaking'
        }
      }
      return obj
    } catch {
      return obj
    }
  }, [JSON.stringify(chooseValue), canIncrease, isDataLoading, redepositValue, JSON.stringify(native), JSON.stringify(erc20)])
  const [showChoseWeek, setShowChoseWeek] = useState(false)
  const useShowChoseWeek = useCallback((e: any) => {
    e.stopPropagation()
    setShowChoseWeek(true)
  }, [])
  const stopPropagation = useCallback((e: any) => {
    e.stopPropagation()
  }, [])
  const borderHandle = useCallback(() => {
    setIsSelectChainModalOpen(false)
    setShowChoseWeek(false)
  }, [])
  const _handleWeekChange = useCallback(
    (e: any, v: number) => {
      setShowChoseWeek(false)
      handleWeekChange(v)
    },
    [handleWeekChange]
  )
  return (
    <PixelBorderCard
      width={isW768 ? '100%' : '505px'}
      className="W_staking_staking S_staking"
      pixel_height={9}
      backgroundColor="#1D263B"
      onClick={borderHandle}
    >
      <h3 className={'S_title'}>Stake</h3>
      {hideTVLStakingSupportedChainId ? null : (
        <PixelBorderCardButton
          className="W_staking_switch"
          height={isW768 ? '32px' : '36px'}
          width="100%"
          pixel_height={6}
          onClick={changeChainHandle}
        >
          <p>Current network: {ChainName[chainIdFromStake]}</p>
          <SvgComponent src={preStaticUrl + '/img/icon/pixel_switch.svg'} />
        </PixelBorderCardButton>
      )}
      <div className={'S_staking_token_detail'}>
        <p className={'S_staking_token_detail_fl'}>You can Deposit</p>
        <div className={'S_staking_token_detail_fr'}>
          <p className={'S_balance'}>
            Balance: {chooseValue?.balanceStr}
            {chooseValue?.balanceStr === '' ? <LoadingButton isLoading={isDataLoading} /> : <></>}
          </p>
          {chooseValue ? <TokenWithChain chainId={chainIdLocal} token={chooseValue} /> : null}
          {canOnlyLock ? null : (
            <ActivePixelButton className={'S_staking_max'} width="40px" height="20px" backgroundColor="#661AFF" pixel_height={2} onClick={maxHandle}>
              <p>MAX</p>
            </ActivePixelButton>
          )}
        </div>
      </div>
      <PixelBorderCard
        className="W_staking_input"
        width="100%"
        height={isW768 ? '44px' : '58px'}
        pixel_height={6}
        backgroundColor="#343C4F"
        borderColor="#484F60"
      >
        <input onChange={redepositInputHandle} type="text" disabled={canOnlyLock} value={canOnlyLock ? '0' : redepositValue} />
        <ActivePixelButton className="W_staking_input_btn" backgroundColor="#1649FF" pixel_height={6} onClick={changeRedepositCurrencyHandle}>
          {chooseValue ? <TokenWithChain chainId={chainIdLocal} token={chooseValue} width={22} /> : null}
          <p>{chooseValue?.symbol}</p>
          <SvgComponent src={preStaticUrl + '/img/icon/pixel_arrow_down.svg'} />
        </ActivePixelButton>
      </PixelBorderCard>

      {canIncrease ? (
        <ul className="S_text_li">
          <li>
            <p>Locked Amount</p>
            <div className="S_fr">
              <p>{totalDeposit}</p>
              <LoadingButton isLoading={isDataLoading} />
            </div>
          </li>
          <li>
            <p>Increased Amount</p>
            <div className="S_fr">
              <p>{redepositValue}</p>
            </div>
          </li>
          <li>
            <p>
              Earn Points Per Day By Staking LRT Tokens
              {/* Earn Points Per Day By {stakingLabel} {currency} */}
            </p>
            <div className="S_fr">
              <p>{earnPoints}</p>
            </div>
          </li>
          {canOnlyIncrease ? (
            <li>
              <p>Unlock Time</p>
              <div className="S_fr">
                <p>{chooseValue?.unlockTimeStr}</p>
                <LoadingButton isLoading={isDataLoading} />
              </div>
            </li>
          ) : null}
        </ul>
      ) : (
        <>
          <div className="S_staking_week">
            <PixelBorderCard
              className="W_staking_input W_staking_week"
              width="100%"
              height={isW768 ? '44px' : '58px'}
              pixel_height={6}
              backgroundColor="#343C4F"
              borderColor="#484F60"
              onClick={useShowChoseWeek}
            >
              <p className="W_text_week">{week} week</p>
              <img src={preStaticUrl + '/img/icon/pixel_arrow_down.svg'} />
            </PixelBorderCard>

            {showChoseWeek ? (
              <div onClick={stopPropagation}>
                <PixelBorderCard
                  className={'S_week_border'}
                  width="160px"
                  height="280px"
                  pixel_height={6}
                  borderColor="#3A4254"
                  backgroundColor="#1D263B"
                >
                  {selectLen.map(v => (
                    <PixelCube2
                      key={v}
                      borderColor="#1649FF"
                      pixel_height={3}
                      width="120px"
                      height="34px"
                      className={`S_weekItem ${v === week ? 'S_on' : ''}`}
                      onClick={(e: any) => _handleWeekChange(e, v)}
                    >
                      <p>{v} week</p>
                    </PixelCube2>
                  ))}
                </PixelBorderCard>
              </div>
            ) : null}
          </div>
          <ul className="S_text_li S_text_li_margin20">
            <li>
              <p>Unlocked Amount</p>
              <div className="S_fr">
                <p>{chooseValue?.withdrawAmountStr}</p>
                <LoadingButton isLoading={isDataLoading} />
              </div>
            </li>
            {!isModal ? null : (
              <li>
                <p>Unlock Time</p>
                <div className="S_fr">
                  <p>{chooseValue?.unlockTimeStr}</p>
                  <LoadingButton isLoading={isDataLoading} />
                </div>
              </li>
            )}
            <li>
              <p>Revised Unlock Time</p>
              <div className="S_fr">
                <p>{revisedUnLockTimeStr}</p>
                <LoadingButton isLoading={isDataLoading} />
              </div>
            </li>
          </ul>
          <div className="S_warn_icon">
            <img src={preStaticUrl + '/img/icon/pixel_warn_02.svg'} alt="warn" />
            <p>You have unlocked tokens. Please lock them first and then increase and lock them again.</p>
          </div>
        </>
      )}
      {canOnlyIncrease ? (
        <ActivePixelButtonColor
          className="W_staking_confirm W_staking_confirm_top"
          width="100%"
          height={isW768 ? '48px' : '54px'}
          pixel_height={5}
          onClick={() => Increment({ hasLock: canIncrease, canClick: canIncreaseClick, canOnlyIncrease: canOnlyIncrease })}
          disable={!(canOnlyIncrease || canIncreaseClick)}
          themeType="brightBlue"
        >
          <p>{btnLabel}</p>
          <LoadingButton isLoading={isRedepositLoading || isIncrementLoading || isApproveLoading} />
        </ActivePixelButtonColor>
      ) : (
        <div className="S_btn">
          <ActivePixelButtonColor
            className="W_staking_confirm"
            width="100%"
            height={isW768 ? '48px' : '54px'}
            pixel_height={5}
            onClick={() => Increment({ hasLock: canIncrease, canClick: canIncreaseClick, canOnlyIncrease: canOnlyIncrease })}
            disable={!canIncreaseClick}
            themeType="brightBlue"
          >
            <p>1-{btnLabel}</p>
            <LoadingButton isLoading={isIncrementLoading || isApproveLoading} />
          </ActivePixelButtonColor>
          <ActivePixelButtonColor
            className="W_staking_confirm W_staking_confirm_yellow"
            width="100%"
            height={isW768 ? '48px' : '54px'}
            pixel_height={5}
            onClick={() => Lock({ hasLock: canIncrease, canOnlyIncrease: canOnlyIncrease })}
            disable={!canOnlyLock}
            themeType="yellow"
          >
            <p>2-Lock</p>
            <LoadingButton isLoading={isRedepositLoading} />
          </ActivePixelButtonColor>
        </div>
      )}
      <SelectTokenDialog />
      <SelectChainDialog />
    </PixelBorderCard>
  )
}, isEqual)
export default Redeposit
