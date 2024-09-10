import { AddressZero } from '@ethersproject/constants'
import {
  ActivePixelCard,
  activeTokenList,
  BigNumberJs,
  BlockExplorerUrls,
  ChainId,
  ChainName,
  Currency,
  getShortenAddress,
  L3ChainId,
  ListWithMotion,
  motion,
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
import { GlobalVar } from '@ui/src'
import React, { memo, useCallback, useMemo } from 'react'

import copy from '@/utils/copy'
import { setErrorToast } from '@/utils/Error/setErrorToast'

import StakingBtn from '../Active/components/StakingBtn/StakingBtn'
import { StakingTitle } from '../Active/components/Title/Title'
import TVLStakingDialog from '../Active/dialog/StakingDialog/StakingDialog'
import StakingForbidDialog from '../Active/dialog/StakingDialog/StakingForbidDialog'
import { usePreHandleAction } from '../Active/hooks/activeHooks'
import { useChainIndex } from '../Active/hooks/useChainIndex'
import { useStake } from '../Active/hooks/useStakeData'
import { useAirdropPointsTooltip } from '../Active/hooks/useTooltip'
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
  [TVLChainId.LineaSepolia]: 'linea'
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
        title: 'ZytronDEX',
        content:
          'ZytronDEX is the first DEX deployed by on Zytron Linea Layer3. It not only fulfills the essential transaction requirements of Layer 3 users, but also offers unique farming benefits, enhancing your experience in the ecosystem.',
        Rewards: ['<i>2000 ZDX</i> rewards per day'],
        btnText: 'Enjoy And Play',
        link: 'https://zytron-dex.zypher.game/swap'
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
  const preHandleAction = usePreHandleAction()
  const { chainId, account } = useActiveWeb3React()
  const switchChainHandle = useCallback(
    (params: ChainId) => {
      const isOk = preHandleAction()
      if (isOk) {
        if (switchNetwork && params !== chainId) {
          try {
            switchNetwork(parseInt(params, 10))
          } catch (err) {
            setErrorToast(err)
          }
        }
      }
    },
    [switchNetwork, chainId]
  )
  const { getTooltip } = useAirdropPointsTooltip()

  const Widget = useMemo(() => {
    return Object.fromEntries(
      TVLStakingSupportedChainId.map(chainIdParams => {
        const _chainIdParams = chainIdParams as unknown as TVLChainId
        const _themeKey = Theme[_chainIdParams]
        const _theme = getTheme(_themeKey)
        const { bannerBorderColor, text, dapp } = _theme
        const { mintMinimum, mintMinimumStr, sbtAmount, hasSBT: sbtId, accountAddress } = activeDataSource[_chainIdParams] ?? initActiveData
        const hasSbt = sbtAmount === '' || !sbtAmount || sbtAmount === '0' ? false : true
        const stakingData = Object.values(tvlStakingData[chainIdParams]).filter(vs => vs.address !== AddressZero)
        const showSwitch = !L3ChainId[chainIdParams] || L3ChainId[chainIdParams] !== chainId

        const dataMap = stakingData.map(
          v =>
            ({
              stake: accountAddress && accountAddress !== AddressZero ? v.userStakedAmountStr : '',
              mintMinimumStr: accountAddress && accountAddress !== AddressZero ? mintMinimumStr : '',
              currency: `${v.symbol === `W${Currency[chainIdParams]}` ? Currency[chainIdParams] : v.symbol}`,
              isOk: new BigNumberJs(v.userStakedAmount).gte(mintMinimum)
            } as IStakeItem)
        )
        const { SBTTooltip } = getTooltip({ chainId: chainIdLocal, mintMinimum: mintMinimumStr })
        console.log({ stakingData, _chainIdParams, dataMap, accountAddress, activeDataSource })
        return [
          chainIdParams,
          <>
            <div className={css.top}>
              <div className={css.fl}>
                <div className={css.list}>
                  <ActivePixelCard className={css.bannerCard} pixel_height={6} backgroundColor={bannerBorderColor}>
                    <ActivePixelCard className={css.bannerCardInner} pixel_height={6} backgroundColor="#1D263B">
                      <img
                        decoding="async"
                        loading="lazy"
                        className={css.bg}
                        src={`${preStaticUrl}/img/zeroGas/${_themeKey}_bg${isW768 ? '_m' : ''}.png`}
                        alt={_themeKey}
                      />
                      <img
                        decoding="async"
                        loading="lazy"
                        className={css.logo}
                        src={`${preStaticUrl}/img/zeroGas/${_themeKey}_logo.png`}
                        alt={_themeKey}
                      />
                      <div className={css.bannerText}>
                        <div className={css.bannerTitle}>
                          <h2>Zytron Pioneer (on Linea)</h2>
                          {!account || showSwitch ? (
                            <PixelCube3
                              className={css.switchChain}
                              pixel_height={2}
                              backgroundColor="#15161F"
                              borderColor="#fff"
                              onClick={() => switchChainHandle(L3ChainId[chainIdParams])}
                            >
                              {!account ? (
                                <p>Connect Wallet</p>
                              ) : (
                                <>
                                  <SvgComponent src={`${preStaticUrl}/img/icon/pixel_switch.svg`} />
                                  <p>Switch to Layer3</p>
                                </>
                              )}
                            </PixelCube3>
                          ) : null}
                        </div>
                        <p className={css.banner_text}>Zytron Pioneer (on Linea) is a Layer3 blockchain deployed on Linea Layer2.</p>
                      </div>
                    </ActivePixelCard>
                  </ActivePixelCard>
                  {isW768 ? <SBTCard className={css.fr} themeKey={_themeKey} /> : null}
                </div>

                <div className={css.flBanner}>
                  <h3 className={css.title}>Staking for Zero Gas on Zytron Pioneer (on Linea)</h3>
                  <PixelBorderCard className={css.stakingCard} pixel_height={4} backgroundColor="#0d1425" borderColor="#3A4254">
                    <div className={css.stakingTop}>
                      <div className={css.stakingTopFl}>
                        <StakingTitle tooltip={SBTTooltip} />
                        {hasSbt ? (
                          <p className={css.grey}>
                            You got the Zypher SBT{' '}
                            <a
                              href={`${BlockExplorerUrls[chainIdLocal][0]}/address/${activeTokenList[chainIdParams].Soulbound}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              ID: {sbtId}
                            </a>
                          </p>
                        ) : null}
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
            <h3 className={css.title}>Dapp on Zytron Pioneer (on Linea)</h3>
            <ListWithMotion<IDappItem> parentClassName={css.dappList} data={dapp} renderItem={item => <DappItem item={item} />} />
            {/* <div className={css.dappList}>
              {dapp.map((v, index) => (
                <DappItem key={index} item={v} />
              ))}
            </div> */}
          </>
        ]
      })
    )
  }, [JSON.stringify(tvlStakingData), JSON.stringify(activeDataSource), isW768, chainIdLocal, chainId])
  return (
    <div className={css.zeroGas}>
      <Tab chainIdLocal={chainIdLocal} onClick={setChainIndex} />
      <motion.div key={`${chainIdLocal}`} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3 }}>
        {Widget[chainIdLocal]}
      </motion.div>
      <TVLStakingDialog />
      <StakingForbidDialog />
    </div>
  )
})
export default ZeroGas
