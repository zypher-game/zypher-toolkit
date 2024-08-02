import { createSlice } from '@reduxjs/toolkit'
import produce from 'immer'

export type ITelegram = {
  isTelegram: boolean
}
const initialState: ITelegram = {
  isTelegram: window.IS_TELEGRAM
}
const telegramSlice = createSlice({
  name: 'telegram',
  initialState,
  reducers: {
    updateTelegram: produce((state, action) => {
      const key = action.payload.key
      const value = action.payload.value
      state[key] = value
    })
  }
})
export const { updateTelegram } = telegramSlice.actions

export default telegramSlice.reducer
