import { createSlice } from '@reduxjs/toolkit'
import { ChainId } from '@zypher-game/toolkit/ui'
import { shallowEqual } from 'react-redux'

export interface IWallet {
  walletType: string
  account: string
}

interface IWalletState {
  connectedWallets: IWallet[]
  switchingChain: ChainId | false
}

const initialState: IWalletState = {
  connectedWallets: [],
  switchingChain: false
}

const walletsSlice = createSlice({
  name: 'wallets',
  initialState,
  reducers: {
    addConnectedWallet(state, { payload }) {
      if (state.connectedWallets.some(wallet => shallowEqual(payload, wallet))) {
        return
      }
      state.connectedWallets = [...state.connectedWallets, payload]
    },
    startSwitchingChain(state, { payload }) {
      state.switchingChain = payload
    },
    endSwitchingChain(state) {
      state.switchingChain = false
    }
  }
})

export const { addConnectedWallet, startSwitchingChain, endSwitchingChain } = walletsSlice.actions
export default walletsSlice.reducer
