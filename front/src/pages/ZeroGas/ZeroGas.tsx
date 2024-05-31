import { AddressZero } from '@ethersproject/constants'
import {
  ActivePixelButtonColor,
  ActivePixelCard,
  activeTokenList,
  BigNumberJs,
  ChainId,
  Currency,
  PixelBorderCard,
  preStaticUrl,
  SvgComponent,
  TVLChainId,
  TVLStakingSupportedChainId,
  useRecoilValue
} from '@ui/src'
import React, { memo, useCallback, useMemo } from 'react'

import copy from '@/utils/copy'

import { StakingTitle } from '../Active/components/Title/Title'
import { useChainIndex } from '../Active/hooks/useChainIndex'
import { useStake } from '../Active/hooks/useStakeData'
import { useTvlStakingDialogState } from '../Active/hooks/useTvlStakingDialogState'
import { activeDataState, IActiveDataState, initActiveData, ITVLStakingData, tvlStakingDataState } from '../Active/state/activeState'
import DappItem, { IDappItem } from './components/DappItem/DappItem'
import StakeItem, { IStakeItem } from './components/StakeItem/StakeItem'
import Tab from './components/Tab/Tab'
import css from './ZeroGas.module.styl'
type ThemeKey = 'b2' | 'linea'
const Theme: Record<TVLChainId, ThemeKey> = {
  [TVLChainId.B2]: 'b2',
  [TVLChainId.B2Testnet]: 'b2',
  [TVLChainId.LineaMainnet]: 'linea',
  [TVLChainId.LineaTestnet]: 'linea'
}

type IThemeItem = {
  bannerBorderColor: string
  text: string
  dapp: IDappItem[]
}
type ITheme = Record<ThemeKey, IThemeItem>
const theme: ITheme = {
  b2: {
    bannerBorderColor: '#FFB852',
    text: 'B²',
    dapp: [
      {
        logo: `${preStaticUrl}/img/layout/Candy.png`,
        title: 'Zypher Dex',
        content:
          'Zypher Dex is the first Dex deployed by Zypher on Zytron L3, which not only meets the basic transaction needs of Layer 3 users, but also obtains farm benefits.',
        Rewards: ['<i>2000 ZDX</i> rewards per day'],
        btnText: 'Join Now'
      }
    ]
  },
  linea: {
    bannerBorderColor: '#60DFFF',
    text: 'Linea',
    dapp: [
      {
        logo: `${preStaticUrl}/img/layout/Candy.png`,
        title: 'Zypher Dex',
        content:
          'Zypher Dex is the first Dex deployed by Zypher on Zytron L3, which not only meets the basic transaction needs of Layer 3 users, but also obtains farm benefits.',
        Rewards: ['<i>2000 ZDX</i> rewards per day'],
        btnText: 'Join Now'
      },
      {
        logo: `${preStaticUrl}/img/layout/Candy.png`,
        title: 'Zypher Dex',
        content:
          'Zypher Dex is the first Dex deployed by Zypher on Zytron L3, which not only meets the basic transaction needs of Layer 3 users, but also obtains farm benefits.',
        Rewards: ['<i>2000 ZDX</i> rewards per day'],
        btnText: 'Join Now'
      },
      {
        logo: `${preStaticUrl}/img/layout/Candy.png`,
        title: 'Zypher Dex',
        content:
          'Zypher Dex is the first Dex deployed by Zypher on Zytron L3, which not only meets the basic transaction needs of Layer 3 users, but also obtains farm benefits.',
        Rewards: ['<i>2000 ZDX</i> rewards per day'],
        btnText: 'Join Now'
      },
      {
        logo: `${preStaticUrl}/img/layout/Candy.png`,
        title: 'Zypher Dex',
        content:
          'Zypher Dex is the first Dex deployed by Zypher on Zytron L3, which not only meets the basic transaction needs of Layer 3 users, but also obtains farm benefits.',
        Rewards: ['<i>2000 ZDX</i> rewards per day'],
        btnText: 'Join Now'
      }
    ]
  }
}
const getTheme = (themeKey: ThemeKey): IThemeItem => {
  return theme[themeKey]
}
const ZeroGas = memo(() => {
  useStake()
  const activeDataSource = useRecoilValue<IActiveDataState>(activeDataState)
  const tvlStakingData = useRecoilValue<Record<TVLChainId | ChainId, Record<string, ITVLStakingData>>>(tvlStakingDataState)
  const { chainIndex, setChainIndex, chainIdLocal } = useChainIndex()
  const setTvlStakingDialog = useTvlStakingDialogState()

  const showStakingHandle = useCallback(() => {
    setTvlStakingDialog(chainIdLocal, true)
  }, [chainIdLocal])

  const Widget = useMemo(() => {
    return Object.fromEntries(
      TVLStakingSupportedChainId.map(chainIdParams => {
        const _chainIdParams = chainIdParams as unknown as TVLChainId
        const _themeKey = Theme[_chainIdParams]
        const _theme = getTheme(_themeKey)
        const { bannerBorderColor, text, dapp } = _theme
        const { mintMinimum } = activeDataSource[_chainIdParams] ?? initActiveData
        const stakingData = Object.values(tvlStakingData[chainIdParams]).filter(vs => vs.address !== AddressZero)
        const dataMap = stakingData.map(
          v =>
            ({
              stake: v.userStakedAmountStr,
              mintMinimum: mintMinimum,
              currency: `${v.symbol === `W${Currency[chainIdParams]}` ? Currency[chainIdParams] : v.symbol}`,
              isOk: new BigNumberJs(v.userStakedAmount).gte(mintMinimum)
            } as IStakeItem)
        )

        return [
          chainIdParams,
          <>
            <div className={css.top}>
              <div className={css.fl}>
                <ActivePixelCard className={css.bannerCard} pixel_height={6} backgroundColor={bannerBorderColor}>
                  <ActivePixelCard className={css.bannerCardInner} pixel_height={6} backgroundColor="#1D263B">
                    <img className={css.bg} src={`${preStaticUrl}/img/zeroGas/${_themeKey}_bg.png`} alt={_themeKey} />
                    <img className={css.logo} src={`${preStaticUrl}/img/zeroGas/${_themeKey}_logo.png`} alt={_themeKey} />
                    <div className={css.bannerText}>
                      <h2>{text} Zytron L3</h2>
                      <p>Zytron is deployed on Layer3 of {text}</p>
                    </div>
                  </ActivePixelCard>
                </ActivePixelCard>
                <div className={css.flBanner}>
                  <h3>Staking for Zero Gas on {text} Zytron L3</h3>
                  <PixelBorderCard className={css.stakingCard} pixel_height={4} backgroundColor="#0d1425" borderColor="#3A4254">
                    <div className={css.stakingTop}>
                      <div className={css.stakingTopFl}>
                        <StakingTitle />
                        <p className={css.grey}>You got the Zypher SBT</p>
                      </div>
                      <ActivePixelButtonColor
                        themeType="yellow"
                        className={css.staking}
                        width="110px"
                        height="32px"
                        pixel_height={2}
                        onClick={showStakingHandle}
                      >
                        <p>Stake</p>
                      </ActivePixelButtonColor>
                    </div>
                    <div className={css.stakingBottom}>
                      {dataMap.map(v => (
                        <StakeItem key={v.currency} item={v} />
                      ))}
                    </div>
                    <PixelBorderCard backgroundColor="#343C4F" borderColor="#3A4254" height="40px" width="100%">
                      <p>
                        {text} SBT: {activeTokenList[chainIdParams].Soulbound}
                      </p>
                      <span onClick={() => copy(activeTokenList[chainIdParams].Soulbound)}>
                        <SvgComponent src={preStaticUrl + '/img/icon/copy.svg'} />
                      </span>
                    </PixelBorderCard>
                  </PixelBorderCard>
                </div>
              </div>
              <div className={css.fr}>
                <img src={`${preStaticUrl}/img/zeroGas/SBT.png`} alt="SBT" className={css.SBT} />
                <img src={`${preStaticUrl}/img/zeroGas/${_themeKey}_logo_small.png`} alt="SBT" className={css.smallLogo} />
              </div>
            </div>
            <div className={css.dappList}>
              {dapp.map((v, index) => (
                <DappItem key={index} item={v} />
              ))}
            </div>
          </>
        ]
      })
    )
  }, [])
  return (
    <div className={css.zeroGas}>
      <Tab chainIdLocal={chainIdLocal} onClick={setChainIndex} />
      {Widget[chainIdLocal]}
    </div>
  )
})
export default ZeroGas
