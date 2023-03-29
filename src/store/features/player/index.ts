import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import player from '@/application/player'
import type { SongType } from '@/type/common'

interface PlayerStateType {
  songInfo: SongType | null
  playMode: number
}

interface SwitchSongsAsyncParamsType {
  SongId: number
  listId: number
  type: 'playlist' | 'album' | 'search'
  [name: string]: unknown
}

const initialState: PlayerStateType = {
  songInfo: null, // 当前歌曲播放信息
  playMode: 0, // 当前播放模式
}

export const switchSongsAsync = createAsyncThunk(
  'player/switchSongs',
  async (params: SwitchSongsAsyncParamsType, { dispatch }) => {
    const { SongId, listId, type } = params
    await player.replacePlaylist(type, listId)
    await player.replaceCurrentTrack(SongId)
    dispatch(switchSongs())
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
    switchPlayMode(state, action: PayloadAction<number>) {
      const { payload } = action
      state.playMode = payload
      player.playMode = payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(switchSongsAsync.fulfilled, (state) => {
      state.songInfo = player.currentTrack
    })
  },
})

export const { switchSongs, switchPlayMode } = playerSlice.actions

export default playerSlice.reducer
