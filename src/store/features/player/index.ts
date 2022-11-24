import { createSlice } from '@reduxjs/toolkit'

import player from '@/application/player'

const initialState = {
  songInfo: {}, // 当前歌曲播放信息
  playMode: 0, // 当前播放模式
}

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
})

export default playerSlice.reducer
