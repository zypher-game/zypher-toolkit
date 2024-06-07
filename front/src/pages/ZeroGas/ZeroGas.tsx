import { AddressZero } from '@ethersproject/constants'
import {
  ActivePixelCard,
  activeTokenList,
  BigNumberJs,
  ChainId,
  ChainName,
  Currency,
  getShortenAddress,
  L3ChainId,
  PixelBorderCard,
  PixelCube3,
  preStaticUrl,
  SvgComponent,
  TVLChainId,
  TVLStakingSupportedChainId,
  useActiveWeb3React,
  useIsW768,
  useRecoilValue,
  useSwitchNetwork
} from '@ui/src'
import React, { memo, useCallback, useMemo } from 'react'

import { GlobalVar } from '@/constants/constants'
import copy from '@/utils/copy'
import { setErrorToast } from '@/utils/Error/setErrorToast'

import StakingBtn from '../Active/components/StakingBtn/StakingBtn'
import { StakingTitle } from '../Active/components/Title/Title'
import TVLStakingDialog from '../Active/dialog/StakingDialog/StakingDialog'
import { usePreHandleAction } from '../Active/hooks/activeHooks'
import { useChainIndex } from '../Active/hooks/useChainIndex'
import { useStake } from '../Active/hooks/useStakeData'
import { activeDataState, IActiveDataState, initActiveData, ITVLStakingData, tvlStakingDataState } from '../Active/state/activeState'
import DappItem, { IDappItem } from './components/DappItem/DappItem'
import SBTCard from './components/SBTCard/SBTCard'
import StakeItem, { IStakeItem } from './components/StakeItem/StakeItem'
import Tab from './components/Tab/Tab'
import css from './ZeroGas.module.styl'
export type ThemeKey = 'b2' | 'linea'
export const Theme: Record<TVLChainId, ThemeKey> = {
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
        btnText: 'Enjoy And Play'
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
        btnText: 'Enjoy And Play'
      },
      {
        logo: `${preStaticUrl}/img/layout/Candy.png`,
        title: 'Zypher Dex',
        content: 'Zypher Dex is the first ',
        Rewards: ['<i>2000 ZDX</i> rewards per day'],
        btnText: 'Enjoy And Play'
      },
      {
        logo: `${preStaticUrl}/img/layout/Candy.png`,
        title: 'Zypher Dex',
        content: 'Zyts the basic transaction needs of Layer 3 users, but also obtains farm benefits.',
        Rewards: ['<i>2000 ZDX</i> rewards per day'],
        btnText: 'Enjoy And Play'
      },
      {
        logo: `${preStaticUrl}/img/layout/Candy.png`,
        title: 'Zypher Dex',
        content:
          'Zypher Dex is the first Dex deployed by Zypher on Zytron L3, which not only meets the basic transaction needs of Layer 3 users, but also obtains farm benefits.',
        Rewards: ['<i>2000 ZDX</i> rewards per day'],
        btnText: 'Enjoy And Play'
      },
      {
        logo: `${preStaticUrl}/img/layout/Candy.png`,
        title: 'Zypher Dex',
        content:
          'Zypher Dex is the first Dex deployed by Zypher on Zytron L3, which not only meets the basic transaction needs of Layer 3 users, but also obtains farm benefits.',
        Rewards: ['<i>2000 ZDX</i> rewards per day'],
        btnText: 'Enjoy And Play'
      }
    ]
  }
}
const getTheme = (themeKey: ThemeKey): IThemeItem => {
  return theme[themeKey]
}
const ZeroGas = memo(() => {
  useStake()
  const isW768 = useIsW768()
  const activeDataSource = useRecoilValue<IActiveDataState>(activeDataState)
  const tvlStakingData = useRecoilValue<Record<TVLChainId | ChainId, Record<string, ITVLStakingData>>>(tvlStakingDataState)
  const { setChainIndex, chainIdLocal } = useChainIndex()
  const { switchNetwork } = useSwitchNetwork()
  const { chainId } = useActiveWeb3React()
  const preHandleAction = usePreHandleAction()
  const switchChainHandle = useCallback(
    (params: ChainId) => {
      const isOk = preHandleAction()
      if (isOk && switchNetwork && params !== chainId) {
        try {
          switchNetwork(params)
        } catch (err) {
          setErrorToast(GlobalVar.dispatch, err)
        }
      }
    },
    [switchNetwork, chainId]
  )
  const Widget = useMemo(() => {
    return Object.fromEntries(
      TVLStakingSupportedChainId.map(chainIdParams => {
        const _chainIdParams = chainIdParams as unknown as TVLChainId
        const _themeKey = Theme[_chainIdParams]
        const _theme = getTheme(_themeKey)
        const { bannerBorderColor, text, dapp } = _theme
        const { mintMinimum, mintMinimumStr, sbtAmount } = activeDataSource[_chainIdParams] ?? initActiveData
        const hasSbt = sbtAmount === '' || !sbtAmount || sbtAmount === '0' ? false : true
        const stakingData = Object.values(tvlStakingData[chainIdParams]).filter(vs => vs.address !== AddressZero)
        const showSwitch = !L3ChainId[chainIdParams] || L3ChainId[chainIdParams] !== chainId
        const dataMap = stakingData.map(
          v =>
            ({
              stake: !chainId ? '-' : v.userStakedAmountStr,
              mintMinimumStr: !chainId ? '-' : mintMinimumStr,
              currency: `${v.symbol === `W${Currency[chainIdParams]}` ? Currency[chainIdParams] : v.symbol}`,
              isOk: new BigNumberJs(v.userStakedAmount).gte(mintMinimum)
            } as IStakeItem)
        )

        return [
          chainIdParams,
          <>
            <div className={css.top}>
              <div className={css.fl}>
                <div className={css.list}>
                  <ActivePixelCard className={css.bannerCard} pixel_height={6} backgroundColor={bannerBorderColor}>
                    <ActivePixelCard className={css.bannerCardInner} pixel_height={6} backgroundColor="#1D263B">
                      <img className={css.bg} src={`${preStaticUrl}/img/zeroGas/${_themeKey}_bg${isW768 ? '_m' : ''}.png`} alt={_themeKey} />
                      <img className={css.logo} src={`${preStaticUrl}/img/zeroGas/${_themeKey}_logo.png`} alt={_themeKey} />
                      <div className={css.bannerText}>
                        <div className={css.bannerTitle}>
                          <h2>{text} Zytron L3</h2>
                          {!chainId || showSwitch ? (
                            <PixelCube3
                              className={css.switchChain}
                              pixel_height={2}
                              backgroundColor="#15161F"
                              borderColor="#fff"
                              onClick={() => switchChainHandle(L3ChainId[chainIdParams])}
                            >
                              {!chainId ? (
                                <p>Connect Wallet</p>
                              ) : (
                                <>
                                  <SvgComponent src={`${preStaticUrl}/img/icon/pixel_switch.svg`} />
                                  <p>Switch Chain</p>
                                </>
                              )}
                            </PixelCube3>
                          ) : null}
                        </div>
                        <p className={css.banner_text}>Zytron is deployed on Layer3 of {text}</p>
                      </div>
                    </ActivePixelCard>
                  </ActivePixelCard>
                  {isW768 ? <SBTCard className={css.fr} themeKey={_themeKey} /> : null}
                </div>

                <div className={css.flBanner}>
                  <h3 className={css.title}>Staking for Zero Gas on {text} Zytron L3</h3>
                  <PixelBorderCard className={css.stakingCard} pixel_height={4} backgroundColor="#0d1425" borderColor="#3A4254">
                    <div className={css.stakingTop}>
                      <div className={css.stakingTopFl}>
                        <StakingTitle />
                        {hasSbt ? <p className={css.grey}>You got the Zypher SBT</p> : null}
                      </div>
                      <StakingBtn chainId={chainIdLocal} />
                    </div>
                    <div className={css.stakingBottom}>
                      {dataMap.map(v => (
                        <StakeItem key={v.currency} item={v} />
                      ))}
                    </div>
                    <PixelBorderCard className={css.sbtAddressCard} pixel_height={4} backgroundColor="#242c3e" borderColor="#3A4254" width="100%">
                      <p>
                        {ChainName[chainIdParams]} SBT:{' '}
                        {isW768 ? getShortenAddress(activeTokenList[chainIdParams].Soulbound, 5, 10) : activeTokenList[chainIdParams].Soulbound}
                      </p>
                      <span onClick={() => copy(activeTokenList[chainIdParams].Soulbound)}>
                        <SvgComponent src={preStaticUrl + '/img/icon/copy.svg'} />
                      </span>
                    </PixelBorderCard>
                  </PixelBorderCard>
                </div>
              </div>
              {isW768 ? null : <SBTCard className={css.fr} themeKey={_themeKey} />}
            </div>
            <h3 className={css.title}>Dapp on Linea Zytron L3</h3>
            <div className={css.dappList}>
              {dapp.map((v, index) => (
                <DappItem key={index} item={v} />
              ))}
            </div>
          </>
        ]
      })
    )
  }, [JSON.stringify(tvlStakingData), JSON.stringify(activeDataSource), isW768, chainIdLocal, chainId])
  return (
    <div className={css.zeroGas}>
      <Tab chainIdLocal={chainIdLocal} onClick={setChainIndex} />
      {Widget[chainIdLocal]}
      <TVLStakingDialog />
    </div>
  )
})
export default ZeroGas
