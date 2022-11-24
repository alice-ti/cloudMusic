import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  value: number
  name: string
}

const initialState: CounterState = {
  value: 0,
  name: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment(state) {
      // 内置immer，可以直接更改状态
      state.value += 1
    },
    incrementByAmount(state, action: PayloadAction<number>) {
      state.value += action.payload
    },
  },
})

export const { increment, incrementByAmount } = userSlice.actions

export default userSlice.reducer
