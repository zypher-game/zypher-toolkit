import { minStakingValue, NavKey, TVLChainId, useActiveWeb3React, useRecoilValue } from '@ui/src'
import { BigNumberJs } from '@ui/src'
import { pathnameState } from '@ui/src'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { IActiveData, tvlPathState } from '../state/activeState'
import { getHrefCode } from '../utils/getHrefParams'
import { airdropPathname, canNext, getAirdropPathname, preAirdropPathname, tvlPath, TVLTabList } from './activeHooks'
import { useActiveData } from './useActiveData'

export const useActiveRouter = () => {
  const { activeData } = useActiveData()
  const navigate = useNavigate()
  const tvlPathLink = useRecoilValue(tvlPathState)
  const { account, chainId } = useActiveWeb3React()
  const location = useLocation()
  const {
    isInitLoading,
    id,
    isRegistered,
    airdropPoints,
    twitter: { nickname },
    airdropPointsDetail,
    userStakedAmount,
    tvlHero
  }: IActiveData = activeData
  const pathname = useRecoilValue(pathnameState)
  useEffect(() => {
    console.log(1, NavKey[0], pathname)
    if (NavKey[0].includes(pathname[1]) || (pathname[1] ?? '').startsWith('L' || 'B')) {
      const pathnameArr = location.pathname.split('/')
      if ((pathnameArr[2] ?? '').toLowerCase() === TVLTabList[2].path.toLowerCase()) {
        console.log(1)
        return
      }
      const _code = getHrefCode()
      console.log({ id, nickname, airdropPoints })
      if (airdropPoints === '' && _code?.startsWith('L' || 'B')) {
        console.log(1)
        return
      }
      // 需要跳转路由
      if (!id && isInitLoading) {
        navigate(`/${NavKey[0][1]}/${NavKey[0][2]}`)
        console.log(1)
        return
      }

      if (!id || id === '' || !nickname || nickname === '' || !canNext(account, chainId)) {
        navigate(`/${NavKey[0][0]}`)
        console.log(1)
        return
      }
      if (isRegistered) {
        if (!tvlHero) {
          navigate(`/${preAirdropPathname}/${airdropPathname.chooseHunter}`)
          console.log(1)
          return
        } else {
          navigate(tvlPath[tvlPathLink])
          console.log(1)
          return
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
            navigate(`/${preAirdropPathname}/${airdropPathname.chooseHunter}`)
            console.log(1)
            return
          }
          navigate(tvlPath[tvlPathLink])
          console.log(1)
          return
        }

        // 没有空投积分 媒体账号和钱包地址都不活跃
        if (airdropPointsDetail.byTwitterMore === '0') {
          navigate(`/${preAirdropPathname}/${airdropPathname.staking}`)
          console.log(1)
          return
        }
        // 没有空投积分 媒体账号和钱包地址都不活跃
        if (new BigNumberJs(airdropPoints).eq(0) && airdropPointsDetail.byTwitterMore !== '0') {
          navigate(`/${preAirdropPathname}/${airdropPathname.getAirdrop}/${getAirdropPathname.NoActive}`)
          console.log(1)
          return
        }
        // 推特粉丝数量	gas 消耗（ETH）	钱包余额（ETH）	初始积分
        // 100	50	50
        // 钱包活跃
        if (new BigNumberJs(airdropPointsDetail.byGas).gte(50)) {
          // 钱包活跃，媒体活跃
          if (new BigNumberJs(airdropPointsDetail.byBalance).gte(50)) {
            // 媒体账号活跃
            navigate(`/${preAirdropPathname}/${airdropPathname.getAirdrop}/${getAirdropPathname.MoreActive}`)
            console.log(1)
            return
          } else {
            // 钱包活跃，媒体账号不活跃
            // 直接去 tvl
            navigate(`/${preAirdropPathname}/${airdropPathname.getAirdrop}/${getAirdropPathname.MoreActiveNormal}`)
            console.log(1)
            return
          }
        }
        // 钱包不活跃  媒体活跃
        navigate(`/${preAirdropPathname}/${airdropPathname.getAirdrop}/${getAirdropPathname.NormalActive}`)
        console.log(1)
        return
      }
    } else {
      console.log(1)
    }
    // navigate(`/${NavKey[0][0]}`)
  }, [isInitLoading, id, isRegistered, airdropPoints, JSON.stringify(airdropPointsDetail), userStakedAmount, tvlHero, account, chainId, tvlPathLink])
}
