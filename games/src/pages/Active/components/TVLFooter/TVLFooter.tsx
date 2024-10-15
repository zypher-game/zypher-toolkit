import {
  atom,
  BigNumberJs,
  ChainId,
  CommunityLink,
  defaultActiveChainId,
  divisorBigNumber,
  formatMoney,
  getLinkPre,
  localStorageEffect,
  request,
  TVL_API,
  useActiveWeb3React,
  useIsW768,
  useRecoilState
} from '@ui/src'
import React, { memo, useCallback, useEffect } from 'react'

import css from './TVLFooter.module.styl'

export const tvlState = atom<string | undefined>({
  key: 'tvlState',
  default: undefined
})
const TVLFooter = memo(() => {
  const isW768 = useIsW768()
  const { chainId } = useActiveWeb3React()
  const [tvl, setTvl] = useRecoilState(tvlState)
  const getData = useCallback(async () => {
    let _chainId = chainId
    if (!_chainId) {
      _chainId = defaultActiveChainId as unknown as ChainId
    }
    const linkType = getLinkPre(_chainId)
    const res = await request(`${TVL_API[_chainId]}/api/allStaking`, {
      method: 'GET',
      params: {
        linkType: linkType.key
      },
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (res.data && res.data['total']) {
      setTvl(formatMoney(new BigNumberJs(res.data['total']).dividedBy(divisorBigNumber).toFixed(), 8))
    }
  }, [chainId])
  useEffect(() => {
    getData()
  }, [getData])

  return isW768 ? null : (
    <div className={css.TVLFooter}>
      <CommunityLink className={css.communityLink} />
      {tvl ? <p className={css.text}>TVL | {tvl} ETH</p> : null}
    </div>
  )
})
export default TVLFooter
