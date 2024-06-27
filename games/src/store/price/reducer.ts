import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { fetchMultiTokenPrice } from './fetchMultiTokenPrice'

type ITokenSymbol = string
export type IPriceType = Record<ITokenSymbol, string>
export type IPrice = {
  tokenPrice: IPriceType
}

const initialState: IPrice = {
  tokenPrice: {}
}
export const fetchPriceAsync = createAsyncThunk('price/fetchPriceAsync', async () => {
  const price02 = await fetchMultiTokenPrice()
  return price02
})
const priceSlice = createSlice({
  name: 'price',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchPriceAsync.fulfilled, (state, action) => {
      if (action.payload) {
        state.tokenPrice = action.payload
      }
    })
  }
})

export default priceSlice.reducer
