import { useCallback } from 'react'

import { useAppDispatch, useAppSelector } from '../hooks'
import { addConnectedWallet, IWallet } from './reducer'

export function useConnectedWallets(): [IWallet[], (wallet: IWallet) => void] {
  const dispatch = useAppDispatch()
  const connectedWallets = useAppSelector(state => state.wallets.connectedWallets)
  const addWallet = useCallback(
    (wallet: IWallet) => {
      dispatch(addConnectedWallet(wallet))
    },
    [dispatch]
  )
  return [connectedWallets, addWallet]
}
