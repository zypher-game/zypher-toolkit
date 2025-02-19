import { AnyAction, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { load, save } from 'redux-localstorage-simple'

import price, { IPrice } from './price/reducer'
import user, { IUserState } from './user/reducer'
import wallets, { IWallet } from './wallets/reducer'
const PERSISTED_KEYS: string[] = ['user', 'price', 'wallets']

const version = 'v0.01'
export const store = configureStore({
  reducer: {
    user: user,
    wallets: wallets,
    price: price
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ thunk: true }).concat(save({ states: PERSISTED_KEYS, namespace: version })),
  preloadedState: load({ states: PERSISTED_KEYS, namespace: version })
})
export interface IState {
  user: IUserState
  wallets: IWallet
  price: IPrice
}
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, IState, unknown, AnyAction>
export type AppState = ReturnType<typeof store.getState>
export default store
