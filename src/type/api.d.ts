// 轮播
export declare interface BannerItemType {
  url: string
  imageUrl: string
  [name: string]: unknown
}

export interface BannerType {
  banners: BannerItemType[]
}

// 推荐歌曲
export interface RecSongType {
  id: number
  name: string
  picUrl: string
  [name: string]: unknown
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
    [name: string]: unknown
  }>
}

// 推荐分类
export interface ToplistType {
  playlists: unknown[]
  [name: string]: unknown
}

// 专辑类型
export interface AlbumType {
  picUrl: string
  name: string
  id: number
  [name: string]: unknown
}

// 歌手类型
export interface SingerType {
  id: number
  name: string
  [name: string]: unknown
}

// 歌曲类型
export interface SongType {
  name: string
  id: number
  // 歌曲时长
  dt: number
  al: AlbumType
  ar: SingerType[]
  [name: string]: unknown
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
  [name: string]: unknown
}

// 歌单详情
export interface PlaylistDetailsType {
  playlist: PlaylistType
  privileges: unknown[]
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

// api 歌曲url params
export interface SongUrlType {
  id: number
  level?: 'standard' | 'higher' | 'exhigh' | 'lossless'
}

// api url item
interface SongUrlItem {
  id: number // 歌曲id
  url: string // 歌曲url
  time: number // 歌曲时长
  [name: string]: unknown
}
// api 歌曲url response
export interface SongUrlResponse {
  data: SongUrlItem[]
}

// api recomm song
export interface RecommSongType {
  picUrl: string // 歌曲海报
  id: number // 歌曲id
  playCount: number
  trackCount: number
  trackNumberUpdateTime: number
  [name: string]: unknown
}

// api 私人FM
export interface RecomFMType {
  code: number
  popAdjust: boolean
  data: Array<{
    album: AlbumType
    name: string
    id: number
    [name: string]: unknown
  }>
}
