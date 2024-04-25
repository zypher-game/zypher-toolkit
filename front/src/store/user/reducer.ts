import { createSlice } from '@reduxjs/toolkit'
import { ChainId } from '@UI/src/'
export interface IUserState {
  selectedChainId?: ChainId
  error?: {
    name?: string
    message?: string
  }
  success?: {
    name?: string
    message?: string
  }
}
const initialState = {
  success: undefined,
  error: undefined,
  selectedChainId: undefined
}

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    changeUserStateValue: (state, action) => {
      const key = action.payload.key
      const value = action.payload.value
      state[key] = value
    }
  }
})
export const { changeUserStateValue } = userSlice.actions
export default userSlice.reducer
