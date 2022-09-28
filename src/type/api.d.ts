// 轮播
export interface BannerType {
  banners: any[]
}

// 推荐歌曲
export interface RecSongType {
  id: number
  name: string
  picUrl: string
  [name: string]: any
}

// 推荐歌单
export interface RecSongSheetType {
  result: RecSongType[]
}

// 歌单分类
export interface PlaylistCateType {
  categories: {
    [name: number]: string
  }
  sub: Array<{
    activity: boolean
    category: number
    hot: boolean
    name: string
    resourceCount: number
    type: number
    [name: string]: any
  }>
}

// 推荐分类
export interface ToplistType {
  playlists: any[]
  [name: string]: any
}

// 专辑类型
export interface AlbumType {
  picUrl: string
  name: string
  id: number
  [name: string]: any
}

// 歌手类型
export interface SingerType {
  id: number
  name: string
  [name: string]: any
}

// 歌曲类型
export interface SongType {
  name: string
  id: number
  // 歌曲时长
  dt: number
  al: AlbumType
  ar: SingerType[]
  [name: string]: any
}

// 歌单歌曲
export interface PlaylistType {
  id: number
  name: string
  tracks: SongType[]
  creator: {
    nickname: string
  }
  updateTime: number
  trackCount: number
  coverImgUrl: string
  description: string
  [name: string]: any
}

// 歌单详情
export interface PlaylistDetailsType {
  playlist: PlaylistType
  privileges: any[]
}

// api 所有歌曲
export interface PlaylistAllType {
  privileges: SongType[]
  songs: SongType[]
  code: number
}

// 所有歌曲参数
export interface PlaylistAllParamsType {
  id: number
  limit?: number
  offset?: number
}
