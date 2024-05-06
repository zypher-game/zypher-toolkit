import { useRecoilValue } from '@ui/src'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { NavKey } from '@/components/Layout/Navigation'
import BigNumberJs from '@/utils/BigNumberJs'

import { activeDataState, IActiveData, tvlPathState } from '../state/activeState'
import { airdropPathname, getAirdropPathname, preAirdropPathname, tvlPath, TVLTabList } from './activeHooks'

export const useActiveRouter = () => {
  const activeData = useRecoilValue(activeDataState)
  const navigate = useNavigate()
  const tvlPathLink = useRecoilValue(tvlPathState)
  const location = useLocation()
  console.log({ activeData })
  useEffect(() => {
    if (activeData.isInitLoading) {
      return
    }
    const pathnameArr = location.pathname.split('/')
    if ((pathnameArr[2] ?? '').toLowerCase() === TVLTabList[2].path.toLowerCase()) {
      return
    }
    // 需要跳转路由
    const { isRegistered, airdropPoints, airdropPointsDetail, userStakedAmount, tvlHero }: IActiveData = activeData
    if (isRegistered) {
      navigate(tvlPath[tvlPathLink])
      return
    }
    // 获得的积分已经被计算过了
    console.log('airdropPoints', airdropPoints, airdropPoints !== '')
    if (airdropPoints !== '') {
      // 已经获得了额外的奖励

      // 用户有没有质押 0.1 个eth
      if (userStakedAmount !== '' && new BigNumberJs(userStakedAmount).gte(0.1)) {
        // 有质押，看看有没有英雄
        if (!tvlHero) {
          navigate(`/${preAirdropPathname}/${airdropPathname.chooseHunter}`)
          return
        }
        navigate(tvlPath[tvlPathLink])
        return
      }

      // 没有空投积分 媒体账号和钱包地址都不活跃
      if (airdropPointsDetail.byTwitterMore === '0') {
        navigate(`/${preAirdropPathname}/${airdropPathname.staking}`)
        return
      }
      // 没有空投积分 媒体账号和钱包地址都不活跃
      if (new BigNumberJs(airdropPoints).eq(0) && airdropPointsDetail.byTwitterMore !== '0') {
        navigate(`/${preAirdropPathname}/${airdropPathname.getAirdrop}/${getAirdropPathname.NoActive}`)
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
          return
        } else {
          // 钱包活跃，媒体账号不活跃
          // 直接去 tvl
          navigate(`/${preAirdropPathname}/${airdropPathname.getAirdrop}/${getAirdropPathname.MoreActiveNormal}`)
          return
        }
      }
      // 钱包不活跃  媒体活跃
      navigate(`/${preAirdropPathname}/${airdropPathname.getAirdrop}/${getAirdropPathname.NormalActive}`)
      return
    }
    // navigate(`/${NavKey[0][0]}`)
    return
  }, [JSON.stringify(activeData), tvlPathLink])
}
