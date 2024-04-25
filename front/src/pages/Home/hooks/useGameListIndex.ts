import { ChainId, IGameList, supportedChainIds, useRecentGamesFromGraph, useRecoilState } from '@UI/src/'
import { isEqual } from 'lodash'
import { useEffect, useState } from 'react'

import { env } from '@/utils/config'

import { gameListChainListState, z2048ListChainListState } from '../state/homeState'
import { I2048GameList, useRecentZ2048FromContract, z2048SupportedChainIds } from './useRecentZ2048FromContract'

export const useGameListIndex = () => {
  const { list: bingoMapList, hasError: bingoHasError } = useRecentGamesFromGraph({ env: env })
  const { list: mapListZ2048, hasError: z2048HasError } = useRecentZ2048FromContract({ env })
  const [bingoDataSource, setBingoDataSource] = useRecoilState<IGameList[]>(gameListChainListState)
  const [z2048Source, setZ2048Source] = useRecoilState<I2048GameList[]>(z2048ListChainListState)
  const [bingoDataSourceLoading, setBingoDataSourceLoading] = useState(false)
  const [z2048DataSourceLoading, setZ2048DataSourceLoading] = useState(false)
  useEffect(() => {
    if (bingoMapList && bingoMapList.size) {
      let list: IGameList[] = []
      Array.from(bingoMapList.entries()).forEach(([, gameListArr]) => {
        list = list.concat(gameListArr)
      })
      const _data = list.sort((a, b) => Number(b.startTimeNumber) - Number(a.startTimeNumber))
      if (!bingoDataSource.length) {
        setBingoDataSource(_data)
      } else {
        if (!isEqual(bingoDataSource, _data)) {
          setBingoDataSource(_data)
        }
      }
    }
  }, [bingoMapList?.size])

  useEffect(() => {
    if (mapListZ2048 && mapListZ2048.size) {
      let list: I2048GameList[] = []
      Array.from(mapListZ2048.entries()).forEach(([, gameListArr]) => {
        list = list.concat(gameListArr)
      })
      const _data = list.sort((a, b) => b.beginTime - a.beginTime)
      if (!z2048Source.length) {
        setZ2048Source(_data)
      } else {
        const supported = z2048SupportedChainIds({ env })
        if (mapListZ2048.size === supported.length) {
          if (!isEqual(z2048Source, _data)) {
            setZ2048Source(_data)
          }
        }
      }
    }
  }, [mapListZ2048?.size])
  useEffect(() => {
    if (bingoDataSource.length) {
      setBingoDataSourceLoading(false)
    } else {
      setBingoDataSourceLoading(true)
    }
  }, [bingoDataSource.length])
  useEffect(() => {
    if (z2048Source.length) {
      setZ2048DataSourceLoading(false)
    } else {
      setZ2048DataSourceLoading(true)
    }
  }, [z2048Source.length])
  return {
    bingoHasError,
    bingoDataSource,
    z2048Source,
    z2048HasError,
    bingoDataSourceLoading,
    z2048DataSourceLoading
  }
}
