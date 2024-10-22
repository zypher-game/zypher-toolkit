import {
  ChainId,
  defaultActiveChainId,
  ITvlHero,
  minStakingValue,
  NavKey,
  pathnameState,
  TVLChainId,
  useActiveWeb3React,
  useRecoilState,
  useRecoilValue
} from '@ui/src'
import { BigNumberJs } from '@ui/src'
import { useCallback, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useIsGetActiveData } from '@/hooks/useInit'

import { chooseChainState, IActiveData, tvlPathState } from '../state/activeState'
import { getHrefCode } from '../utils/getHrefParams'
import { rewardPathname, canNext, getRewardPathname, preRewardPathname, tvlPath, TVLTabList } from './activeHooks'
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
    rewardPoints,
    twitter: { nickname: twitterNickname },
    // discord: { nickname: discordNickname },
    rewardPointsDetail,
    userStakedAmount,
    tvlHero
  }: IActiveData = activeData
  const { isActiveRouter } = useIsGetActiveData()
  const getActiveRouterFn = useCallback((): string | undefined => {
    if (isActiveRouter) {
      const pathnameArr = location.pathname.split('/')
      if ((pathnameArr[2] ?? '').toLowerCase() === TVLTabList[2].path.toLowerCase()) {
        console.log(1)
        return
      }
      const _code = getHrefCode()
      if (rewardPoints === '' && _code && (_code.startsWith('L') || _code.startsWith('B'))) {
        console.log(1)
        return
      }
      // 需要跳转路由
      if (!id && isInitLoading) {
        return `/${NavKey[0][1]}/${NavKey[0][2]}`
      }

      if (!id || id === '' || !twitterNickname || twitterNickname === '' || !canNext(account, chainId)) {
        console.log(1, id)
        return `/${NavKey[0][0]}`
      }
      if (isRegistered) {
        if (!tvlHero) {
          console.log(1)
          return `/${preRewardPathname}/${rewardPathname.chooseHunter}`
        } else {
          console.log(1, tvlPath[tvlPathLink])
          return tvlPath[tvlPathLink]
        }
      }
      console.log({ rewardPoints, userStakedAmount, cc: minStakingValue[chainId as unknown as TVLChainId] })
      // 获得的积分已经被计算过了
      if (rewardPoints !== '') {
        // 已经获得了额外的奖励
        // 用户有没有质押 0.1 个eth
        if (userStakedAmount !== '' && new BigNumberJs(userStakedAmount).gte(minStakingValue[chainId as unknown as TVLChainId])) {
          // 有质押，看看有没有英雄
          if (!tvlHero) {
            console.log(1)
            return `/${preRewardPathname}/${rewardPathname.chooseHunter}`
          }
          console.log(1)
          return tvlPath[tvlPathLink]
        }

        // 没有空投积分 媒体账号和钱包地址都不活跃
        if (rewardPointsDetail.byTwitterMore === '0') {
          console.log(1)
          return `/${preRewardPathname}/${rewardPathname.staking}`
        }
        // 没有空投积分 媒体账号和钱包地址都不活跃
        if (new BigNumberJs(rewardPoints).eq(0) && rewardPointsDetail.byTwitterMore !== '0') {
          console.log(1)
          return `/${preRewardPathname}/${rewardPathname.getReward}/${getRewardPathname.NoActive}`
        }
        // 推特粉丝数量	gas 消耗（ETH）	钱包余额（ETH）	初始积分
        // 100	50	50
        // 钱包活跃
        if (new BigNumberJs(rewardPointsDetail.byGas).gte(50) || new BigNumberJs(rewardPointsDetail.byBalance).gte(50)) {
          // 钱包活跃，媒体活跃
          if (new BigNumberJs(rewardPointsDetail.byTwitter).gte(50)) {
            // 媒体账号活跃
            console.log(1)
            return `/${preRewardPathname}/${rewardPathname.getReward}/${getRewardPathname.MoreActive}`
          } else {
            // 钱包活跃，媒体账号不活跃
            // 直接去 tvl
            console.log(1)
            return `/${preRewardPathname}/${rewardPathname.getReward}/${getRewardPathname.MoreActiveNormal}`
          }
        }
        // 钱包不活跃  媒体活跃
        console.log(1)
        return `/${preRewardPathname}/${rewardPathname.getReward}/${getRewardPathname.NormalActive}`
      }
    } else {
      console.log(1)
      // return `/${preRewardPathname}`
    }
  }, [
    isActiveRouter,
    isInitLoading,
    id,
    isRegistered,
    rewardPoints,
    JSON.stringify(rewardPointsDetail),
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
export const useChainIdLocal = () => {
  const [chainIdLocal, setChainIdLocal] = useRecoilState(chooseChainState)
  const { account, chainId } = useActiveWeb3React()
  useEffect(() => {
    const can = canNext(account, chainId)
    if (can) {
      setChainIdLocal(chainId)
    } else {
      setChainIdLocal(defaultActiveChainId as unknown as ChainId)
    }
  }, [chainId])
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
