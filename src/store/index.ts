import { configureStore } from '@reduxjs/toolkit'

import playerReducer from './features/player'
import userReducer from './features/user'

export const store = configureStore({
  // Root Reducer或者RTK的Slice Reducer组成的Map
  reducer: {
    // TODO
    user: userReducer,
    player: playerReducer,
  },
  // middleware: [],
  // 启用Redux DevTools，默认true
  // devTools: true,
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
