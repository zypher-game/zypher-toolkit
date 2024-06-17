import './Staking.styl'

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
  TVLChainId,
  useIsW768,
  useRecoilValue,
  useSetRecoilState
} from '@ui/src'
import { BigNumberJs } from '@ui/src'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'

import { calculateSumByNumber } from '@/utils/calculateSum'

import SelectChainDialog from '../../dialog/SelectChainDialog/SelectChainDialog'
import SelectTokenDialog from '../../dialog/SelectTokenDialog/SelectTokenDialog'
import { canNext } from '../../hooks/activeHooks'
import { useStakeHandle, useTable } from '../../hooks/useStakeHandle'
import { chooseChainState, restakingDataState, selectChainDialogState } from '../../state/activeState'
import TokenWithChain from '../Token/TokenWithChain/TokenWithChain'
import css from './Staking.module.styl'
const ChainGrowthCoefficient: Record<TVLChainId, { native: string; erc20: string }> = {
  [TVLChainId.B2]: {
    native: '200',
    erc20: '100'
  },
  [TVLChainId.B2Testnet]: {
    native: '200',
    erc20: '100'
  },
  [TVLChainId.LineaMainnet]: {
    native: '10',
    erc20: '5'
  },
  [TVLChainId.LineaTestnet]: {
    native: '10',
    erc20: '5'
  }
}
const Staking = memo(() => {
  const isW768 = useIsW768()
  const chooseChain = useRecoilValue(chooseChainState)
  const [chainIdLocal, setChainIdLocal] = useState<ChainId>()
  const setIsSelectChainModalOpen = useSetRecoilState(selectChainDialogState)
  const restakingData = useRecoilValue(restakingDataState)
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
  const { native, erc20 } = useTable()
  console.log({ depositCurrency })
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
        if (depositCurrency) {
          res = tvlStakingData[chainIdLocal!][depositCurrency]
        } else {
          res = tvlStakingData[chainIdLocal!][Currency[chainIdLocal!]]
        }
      }
      return res
    } catch {
      return undefined
    }
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
            if (chooseValue?.balance !== '0' && new BigNumberJs(chooseValue?.balance ?? '0').gte(tokenAmount)) {
              obj.isBalanceEnough = true
              obj.btnLabel = 'Confirm'
              if (!isDepositLoading && chooseValue?.address !== AddressZero && new BigNumberJs(chooseValue?.allowance ?? '0').lt(tokenAmount)) {
                obj.isApprove = false
                obj.btnLabel = 'Approve'
              }
            } else {
              if (depositValue !== '') {
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
  }, [JSON.stringify(chooseValue), isDepositLoading, isDataLoading, depositValue, chainIdFromStake, chooseChain])

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
      if (chooseValue?.chainId) {
        const isNative = chooseValue?.symbol === Currency[chooseValue.chainId] || chooseValue?.symbol === 'W' + Currency[chooseValue.chainId]
        let stakingAirdrop
        let restakingAirdrop
        if (chooseValue?.chainId && restakingData[chooseValue?.chainId]) {
          const statistics = restakingData[chooseValue?.chainId].statistics
          stakingAirdrop = statistics.stakingAirdrop
          restakingAirdrop = statistics.restakingAirdrop
        }
        if (!isDataLoading) {
          if (depositValue) {
            const decimal = chooseValue?.decimal ?? 18
            let preStakingBig = new BigNumberJs(0)
            if (isNative) {
              preStakingBig = new BigNumberJs(native[0] && native[0].userStakedAmount === '' ? '0' : native[0]?.userStakedAmount ?? '')
            } else {
              preStakingBig = new BigNumberJs(calculateSumByNumber(erc20.map(({ userStakedAmount: user }) => (user === '' ? '0' : user))))
            }

            const _totalStaked = new BigNumberJs(depositValue).plus(
              new BigNumberJs(preStakingBig).dividedBy(new BigNumberJs('10').exponentiatedBy(decimal))
            )
            let X
            let growthCoefficient = '0'
            const _chainId = chooseValue?.chainId as unknown as TVLChainId
            const CeilAmountPre = Math.ceil(new BigNumberJs(_totalStaked).toNumber())
            const CeilAmount = CeilAmountPre > 5 ? 5 : CeilAmountPre
            if (isNative) {
              X = new BigNumberJs(CeilAmount).times(ChainGrowthCoefficient[_chainId]['native']) // _totalStaked 的值向上取整就是其系数
              growthCoefficient = stakingAirdrop ?? '0'
            } else {
              X = new BigNumberJs(CeilAmount).times(ChainGrowthCoefficient[_chainId]['erc20']) // _totalStaked 的值向上取整就是其系数
              growthCoefficient = restakingAirdrop ?? '0'
            }

            const END_TIME = +(chooseValue?.END_TIME ?? '0') // 从合约获取的时间
            const nowTimestamp = Date.now() / 1000 // 当前时间
            const END_TIMEDate = new Date(END_TIME * 1000)
            const currentDate = new Date(nowTimestamp * 1000)
            const differenceInMilliseconds = END_TIMEDate.getTime() - currentDate.getTime() // 计算两者之间的时间差（毫秒），一共还剩多少
            const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24)) // 转换为天数

            const _earnPoints = X.times(new BigNumberJs(_totalStaked)) // 系数值 + 输入值
            const _finalPoints = new BigNumberJs(differenceInDays).times(_earnPoints).plus(growthCoefficient) // 还剩多少天 乘 _earnPoints
            // console.log({
            //   isNative,
            //   depositValue,
            //   userStakedAmount: chooseValue ? chooseValue.userStakedAmount : 'ssss',
            //   X: X.toFixed(),
            //   END_TIME,
            //   differenceInDays,
            //   _totalStaked: _totalStaked.toFixed(),
            //   _earnPoints: _earnPoints.toFixed(2),
            //   _finalPoints: _finalPoints.toFixed(2),
            //   growthCoefficient
            // })
            return {
              totalStaked: _totalStaked.toFormat(2),
              earnPoints: _earnPoints.toFormat(2),
              finalPoints: _finalPoints.toFormat(2)
            }
          }
        }
      }
      return obj
    } catch {
      return obj
    }
  }, [JSON.stringify(restakingData), JSON.stringify(chooseValue), isDataLoading, depositValue, JSON.stringify(native), JSON.stringify(erc20)])
  return (
    <PixelBorderCard width={isW768 ? '100%' : '505px'} className={`staking_staking ${css.staking}`} pixel_height={9} backgroundColor="#1D263B">
      <h3 className={css.title}>Staking</h3>
      <PixelBorderCardButton className="staking_switch" height={isW768 ? '32px' : '36px'} width="100%" pixel_height={6} onClick={changeChainHandle}>
        <p>Current network: {ChainName[chainIdFromStake]}</p>
        <SvgComponent src={preStaticUrl + '/img/icon/pixel_switch.svg'} />
      </PixelBorderCardButton>
      <div className={css.staking_token_detail}>
        <p className={css.staking_token_detail_fl}>You can restake</p>
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
        <input onChange={depositInputHandle} type="text" value={depositValue} />
        <ActivePixelButton
          className={`staking_input_btn ${css.staking_input_btn}`}
          backgroundColor="#1649FF"
          pixel_height={6}
          onClick={changeDepositCurrencyHandle}
        >
          {chooseValue ? <TokenWithChain chainId={chainIdLocal} token={chooseValue} width={22} /> : null}
          <p>{chooseValue?.symbol}</p>
          <SvgComponent src={preStaticUrl + '/img/icon/pixel_arrow_down.svg'} />
        </ActivePixelButton>
      </PixelBorderCard>
      <ul className={css.text_li}>
        <li>
          <p>Total Staked</p>
          <div className={css.fr}>
            <p>{totalStaked}</p>
            <LoadingButton isLoading={isDataLoading} />
          </div>
        </li>
        <li>
          <p>Earn Points Per Day</p>
          <div className={css.fr}>
            <p>{earnPoints}</p>
            <LoadingButton isLoading={isDataLoading} />
          </div>
        </li>
        <li>
          <p>Estimated final points based on duration</p>
          <div className={css.fr}>
            <p>{finalPoints}</p>
            <LoadingButton isLoading={isDataLoading} />
          </div>
        </li>
        <li>
          <p>$GP earned</p>
          <div className={css.fr}>
            <p>Released every week</p>
          </div>
        </li>
      </ul>
      <ActivePixelButtonColor
        className="staking_confirm"
        width="100%"
        height={isW768 ? '48px' : '54px'}
        pixel_height={5}
        onClick={deposit}
        disable={isDepositLoading || isApproveLoading || isDataLoading}
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
