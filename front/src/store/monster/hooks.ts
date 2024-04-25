import { ChainId, supportedChainIds, useActiveWeb3React } from '@UI/src/'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { defaultLocalChainId } from '@/constants/constants'
import { env } from '@/utils/config'

import { IState } from '..'
import { useAppDispatch } from '../hooks'
import {
  fetchAccountMonsterAsync,
  fetchAccountMonsterGraphqlAsync,
  fetchAccountMonsterNftAsync,
  fetchMonsterAsync,
  fetchMonsterGraphqlAsync
} from './reducer'

export const useMonsterFetch = (): void => {
  const dispatch = useAppDispatch()
  const { chainId } = useActiveWeb3React()
  const { monsterLoading } = useMonsterState()
  useEffect(() => {
    if (!monsterLoading) {
      let _chainId: ChainId = chainId
      if (!_chainId || !supportedChainIds(env).includes(_chainId)) {
        _chainId = defaultLocalChainId
      }
      dispatch(fetchMonsterAsync({ chainId: _chainId }))
    }
  }, [dispatch, chainId])
}

export const useAccountMonsterFetch = (): void => {
  const dispatch = useAppDispatch()
  const { chainId, account } = useActiveWeb3React()
  const { accountMonsterLoading } = useMonsterState()
  useEffect(() => {
    if (chainId && account && !accountMonsterLoading) {
      dispatch(fetchAccountMonsterAsync({ chainId: chainId, account }))
    }
  }, [dispatch, account, chainId])
}

export const useMonsterGraphqlFetch = (): void => {
  const dispatch = useAppDispatch()
  const { chainId } = useActiveWeb3React()
  useEffect(() => {
    let _chainId: ChainId = chainId
    if (!_chainId || !supportedChainIds(env).includes(_chainId)) {
      _chainId = defaultLocalChainId
    }
    dispatch(fetchMonsterGraphqlAsync({ chainId: _chainId }))
  }, [dispatch, chainId])
}

export const useAccountMonsterGraphqlFetch = (): void => {
  const dispatch = useAppDispatch()
  const { chainId, account } = useActiveWeb3React()
  const { defenceRankData } = useMonsterState()
  useEffect(() => {
    if (chainId && account && defenceRankData && defenceRankData.length) {
      dispatch(fetchAccountMonsterGraphqlAsync({ chainId, account, defenceRankData }))
    }
  }, [dispatch, chainId, account, defenceRankData])
}

export const useAccountMonsterNftFetch = (): void => {
  const dispatch = useAppDispatch()
  const { chainId, account } = useActiveWeb3React()
  useEffect(() => {
    if (chainId && account) {
      dispatch(fetchAccountMonsterNftAsync({ chainId: chainId, account }))
    }
  }, [dispatch, account, chainId])
}

export const useMonsterState = () => {
  return useSelector((state: IState) => {
    return state.monster
  })
}
