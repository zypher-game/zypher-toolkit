import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { IState } from '..'
import { useAppDispatch } from '../hooks'
import { fetchPriceAsync } from './reducer'

export const usePollPrice = (): void => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchPriceAsync())
  }, [dispatch])
}

export const usePrice = () => {
  return useSelector((state: IState) => state.price.tokenPrice)
}
