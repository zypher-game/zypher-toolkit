import { ChainId, txStatus, useActiveWeb3React, useRecoilValue, useSetRecoilState } from '@ui/src'
// import { env } from '@/utils/config'
import { formatMoney, request } from '@ui/src'
import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import { isEqual } from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import useInfiniteScroll from 'react-infinite-scroll-hook'

import { defaultLocalChainId } from '@/constants/constants'
import { useAppSelector } from '@/store/hooks'

import { apiUrl, CurrentPage, defaultChainId, PageSize } from '../config/config'
// import Data1 from '../mook/userAddressmulti1.json'
// import Data2 from '../mook/userAddressmulti2.json'
import {
  AccountInfo,
  accountInfoInit,
  accountInfoState,
  accountListInfoState,
  IInvitationAddress,
  invitationAddressState
} from '../state/invitationState'
// 获取单个用户信息
export const useGetAccountInfo = (): void => {
  const { chainId, account } = useActiveWeb3React()
  const accountInfo = useRecoilValue<AccountInfo>(accountInfoState)
  const setAccountInfoState = useSetRecoilState<AccountInfo>(accountInfoState)
  const getAccountInfo = useCallback(async () => {
    const params = {
      user_addr: account
      // chain_id: `${chainId}`
    }
    const res = await request(apiUrl.accountInfo, {
      method: 'POST',
      data: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (res.data && res.data['code'] == 200) {
      const _nextData = getInfo(res.data.data)
      if (!isEqual(accountInfo, _nextData)) {
        setAccountInfoState(_nextData)
      }
      setAccountInfoState(getInfo(res.data.data))
    } else {
      setAccountInfoState(getInfo(accountInfoInit))
    }
  }, [account, chainId])
  useEffect(() => {
    if (account && chainId) {
      getAccountInfo()
    }
  }, [account, chainId])
}

// 获取排名列表
export const useGetAccountListInfo = (): any => {
  const data = useRecoilValue<AccountInfo[]>(accountListInfoState)
  const setAccountListInfoState = useSetRecoilState<AccountInfo[]>(accountListInfoState)
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(CurrentPage)
  const [hasMore, setHasMore] = useState(true)
  const selectedChainId = useAppSelector(state => state.user.selectedChainId)
  const { chainId = selectedChainId ?? defaultLocalChainId } = useActiveWeb3React()
  const loadData = useCallback(async () => {
    if (loading || !chainId) {
      return
    }
    setLoading(true)
    const { data: newData, totalPage } = await fetchAddressmulti(currentPage, chainId)
    // const _nextData = data.concat(newData)
    if (!isEqual(data, newData)) {
      // 过滤重复信息
      // const dataCopy = data.slice()
      // for (let index = 0; index < newData.length; index++) {
      //   const arrFilter = dataCopy.filter(v => isEqual(v.user_addr + v.total, newData[index].user_addr + newData[index].total))
      //   if ((arrFilter ?? []).length === 0) {
      //     dataCopy.push(newData[index])
      //   }
      // }
      newData.sort((a, b) => {
        const totalA = new BigNumber(a.total)
        const totalB = new BigNumber(b.total)
        return totalB.minus(totalA).toNumber() // 降序排列，若要升序排列则改为 totalA - totalB
      })
      const resultData = newData.map((v, index) => ({ ...v, rank: `${index + 1}` }))
      setAccountListInfoState(resultData)
    }
    setLoading(false)
    if (totalPage <= currentPage) {
      setHasMore(false)
    } else {
      setCurrentPage(currentPage + 1)
    }
  }, [data, chainId, currentPage])

  const [sentryRef, { rootRef }] = useInfiniteScroll({
    loading,
    hasNextPage: hasMore,
    onLoadMore: loadData
  })
  useEffect(() => {
    if (chainId) {
      loadData()
    }
    // setTimeout(() => {
    //   loadData(1)
    // }, 2000)
  }, [chainId])
  return {
    sentryRef,
    rootRef,
    loading,
    currentPage,
    hasMore
  }
}
const fetchAddressmulti = async (
  currentPage: number,
  chainId: number | undefined,
  pageSize = PageSize
): Promise<{ data: AccountInfo[]; totalPage: number }> => {
  const arr: AccountInfo[] = []
  const params = {
    limit: `${pageSize}`,
    page: `${currentPage}`
    // chain_id: `${chainId}`
  }
  const res = await request(apiUrl.accountListInfo, {
    method: 'POST',
    data: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  // const res = currentPage === 0 ? Data1 : Data2
  if (res.data && res.data['code'] == 200) {
    if (res.data.data.result && res.data.data.result.length > 0) {
      const resultList = res.data.data.result
      for (let i = 0; i < resultList.length; i++) {
        arr.push(getInfo(resultList[i]))
      }
    }
  }
  return {
    data: arr,
    totalPage: res.data.data['total']
  }
}

function getInfo(obj: Record<string, string | number>): AccountInfo {
  const user_addr = obj['user_addr']
  const user_cnt = obj['user_cnt'] || 0
  const share_cnt = obj['share_cnt'] || obj['shared_cnt'] || 0
  const rank = obj['rank'] ? new BigNumber(obj['rank']).plus(1).toNumber().toLocaleString('en-US', { maximumFractionDigits: 0 }) : 0

  const _user_cnt_points = formatMoney(new BigNumber(`${user_cnt}`).toNumber(), 0)
  const _share_cnt_points = formatMoney(new BigNumber(`${share_cnt}`).multipliedBy(5).toNumber(), 0)
  const _total = formatMoney(new BigNumber(_user_cnt_points).plus(_share_cnt_points).toNumber(), 0)

  return {
    user_addr: `${user_addr}`,
    user_cnt: `${user_cnt}`,
    user_cnt_points: _user_cnt_points,
    share_cnt: `${share_cnt}`,
    share_cnt_points: _share_cnt_points,
    rank: `${rank}`,
    total: _total
  }
}

export const useGetInvitationAddress = (): void => {
  // Games can start with as few as two players. You are free to start as soon as you have a single other player matched. Please do not quit during the matchmaking process.
  // (This step requires a gas fee)
  // /play/21/gameRoom
  // 0x9c6f0de000000000000000000000000000000000000000000000000000000000000000150000000000000000000000000000000000000000000000000000000000000022
  // 解析URL
  const setInvitationAddressState = useSetRecoilState<IInvitationAddress | undefined>(invitationAddressState)
  useEffect(() => {
    const urlObj = new URL(window.location.href)
    // 获取参数值
    const shareParam = urlObj.searchParams.get('share')
    const chain_id = urlObj.searchParams.get('chain_id')
    if (shareParam?.startsWith('0x')) {
      const isValidAddress = ethers.utils.isAddress(shareParam)
      if (isValidAddress) {
        setInvitationAddressState({
          address: shareParam,
          chainId: Number(chain_id) as ChainId
        })
      }
    }
  }, [])
}
