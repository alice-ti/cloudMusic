import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import player from '@/application/player'
import type { SongType } from '@/type/store'

interface PlayerStateType {
  songInfo: SongType
  playMode: number
}

const initialState: PlayerStateType = {
  songInfo: {
    name: '',
    id: -1,
    al: {
      picUrl: '',
    },
  }, // 当前歌曲播放信息
  playMode: 0, // 当前播放模式
}

export const switchSongsAsync = createAsyncThunk(
  'player/switchSongs',
  async (params: any, { dispatch }) => {
    const { SongId, playlistId } = params
    await player.replacePlaylist(playlistId)
    await player._replaceCurrentTrack(SongId)
  }
)

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    switchSongs(state) {
      // const { playlistId, SongId } = action.payload
      state.songInfo = player.currentTrack
    },
  },
  extraReducers: (builder) => {
    builder.addCase(switchSongsAsync.fulfilled, (state) => {
      state.songInfo = player.currentTrack
    })
  },
})

export const { switchSongs } = playerSlice.actions

export default playerSlice.reducer
