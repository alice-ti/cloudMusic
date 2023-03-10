import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { userAccount } from '@/service/user'
import type { AccountProfile } from '@/type/api'

// TIPS 如果默认state 为null 那么必须返回新的state
const initialState: AccountProfile | null = null

export const getUserAccount = createAsyncThunk(
  'user/account',
  async (params, { dispatch }): Promise<AccountProfile> => {
    const {
      data: { profile },
    } = await userAccount()
    return profile
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState as AccountProfile | null,
  reducers: {
    increment(state) {
      // 内置immer，可以直接更改状态
    },
    // incrementByAmount(state, action: PayloadAction<number>) {
    //   state.value += action.payload
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserAccount.fulfilled, (state, action) => {
      return action.payload
    })
  },
})

export const { increment } = userSlice.actions

export default userSlice.reducer
