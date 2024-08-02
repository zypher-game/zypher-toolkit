import { ChainId, ITvlHero, minStakingValue, NavKey, pathnameState, TVLChainId, useActiveWeb3React, useRecoilValue } from '@ui/src'
import { BigNumberJs } from '@ui/src'
import { useCallback, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useIsGetActiveData } from '@/hooks/useInit'

import { IActiveData, tvlPathState } from '../state/activeState'
import { getHrefCode } from '../utils/getHrefParams'
import { airdropPathname, canNext, getAirdropPathname, preAirdropPathname, tvlPath, TVLTabList } from './activeHooks'
import { useActiveData } from './useActiveData'
export const useGetActiveRouterFn = () => {
  const { activeData } = useActiveData()
  const tvlPathLink = useRecoilValue(tvlPathState)
  const { account, chainId } = useActiveWeb3React()
  const location = useLocation()
  const {
    isInitLoading,
    id,
    isRegistered,
    airdropPoints,
    twitter: { nickname: twitterNickname },
    // discord: { nickname: discordNickname },
    airdropPointsDetail,
    userStakedAmount,
    tvlHero
  }: IActiveData = activeData
  const { isActiveRouter } = useIsGetActiveData()
  console.log({ id })
  const getActiveRouterFn = useCallback((): string | undefined => {
    if (isActiveRouter) {
      const pathnameArr = location.pathname.split('/')
      if ((pathnameArr[2] ?? '').toLowerCase() === TVLTabList[2].path.toLowerCase()) {
        console.log(1)
        return
      }
      const _code = getHrefCode()
      console.log({ id, twitterNickname, airdropPoints })
      if (airdropPoints === '' && _code?.startsWith('L' || 'B')) {
        console.log(1)
        return
      }
      // 需要跳转路由
      if (!id && isInitLoading) {
        return `/${NavKey[0][1]}/${NavKey[0][2]}`
        console.log(1)
        return
      }

      if (!id || id === '' || !twitterNickname || twitterNickname === '' || !canNext(account, chainId)) {
        console.log(1, id)
        return `/${NavKey[0][0]}`
      }
      if (isRegistered) {
        if (!tvlHero) {
          console.log(1)
          return `/${preAirdropPathname}/${airdropPathname.chooseHunter}`
        } else {
          console.log(1, tvlPath[tvlPathLink])
          return tvlPath[tvlPathLink]
        }
      }
      console.log({ airdropPoints, userStakedAmount, cc: minStakingValue[chainId as unknown as TVLChainId] })
      // 获得的积分已经被计算过了
      if (airdropPoints !== '') {
        // 已经获得了额外的奖励
        // 用户有没有质押 0.1 个eth
        if (userStakedAmount !== '' && new BigNumberJs(userStakedAmount).gte(minStakingValue[chainId as unknown as TVLChainId])) {
          // 有质押，看看有没有英雄
          if (!tvlHero) {
            console.log(1)
            return `/${preAirdropPathname}/${airdropPathname.chooseHunter}`
          }
          console.log(1)
          return tvlPath[tvlPathLink]
        }

        // 没有空投积分 媒体账号和钱包地址都不活跃
        if (airdropPointsDetail.byTwitterMore === '0') {
          console.log(1)
          return `/${preAirdropPathname}/${airdropPathname.staking}`
        }
        // 没有空投积分 媒体账号和钱包地址都不活跃
        if (new BigNumberJs(airdropPoints).eq(0) && airdropPointsDetail.byTwitterMore !== '0') {
          console.log(1)
          return `/${preAirdropPathname}/${airdropPathname.getAirdrop}/${getAirdropPathname.NoActive}`
        }
        // 推特粉丝数量	gas 消耗（ETH）	钱包余额（ETH）	初始积分
        // 100	50	50
        // 钱包活跃
        if (new BigNumberJs(airdropPointsDetail.byGas).gte(50) || new BigNumberJs(airdropPointsDetail.byBalance).gte(50)) {
          // 钱包活跃，媒体活跃
          if (new BigNumberJs(airdropPointsDetail.byTwitter).gte(50)) {
            // 媒体账号活跃
            console.log(1)
            return `/${preAirdropPathname}/${airdropPathname.getAirdrop}/${getAirdropPathname.MoreActive}`
          } else {
            // 钱包活跃，媒体账号不活跃
            // 直接去 tvl
            console.log(1)
            return `/${preAirdropPathname}/${airdropPathname.getAirdrop}/${getAirdropPathname.MoreActiveNormal}`
          }
        }
        // 钱包不活跃  媒体活跃
        console.log(1)
        return `/${preAirdropPathname}/${airdropPathname.getAirdrop}/${getAirdropPathname.NormalActive}`
      }
    } else {
      console.log(1)
    }
  }, [
    isActiveRouter,
    isInitLoading,
    id,
    isRegistered,
    airdropPoints,
    JSON.stringify(airdropPointsDetail),
    userStakedAmount,
    tvlHero,
    account,
    chainId,
    tvlPathLink
  ])
  return { getActiveRouterFn }
}
export const useActiveRouter = () => {
  const navigate = useNavigate()
  const { getActiveRouterFn } = useGetActiveRouterFn()
  useEffect(() => {
    const link = getActiveRouterFn()
    if (link) {
      navigate(link)
    }
  }, [getActiveRouterFn])
}

export const useActiveRouterV2 = () => {
  const navigate = useNavigate()
  const { getActiveRouterFn } = useGetActiveRouterFn()
  useEffect(() => {
    const link = getActiveRouterFn()
    if (link && link.length > 2 && link !== window.location.pathname) {
      navigate(link)
    }
  }, [getActiveRouterFn])
}
