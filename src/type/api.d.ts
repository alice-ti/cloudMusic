import type { AlbumType, ArtistType, MvType, SongType } from '@type/common'

export declare interface BannerItemType {
  url: string
  imageUrl: string
  [name: string]: unknown
}
/**
 * 轮播
 */
export interface BannerApiType {
  banners: BannerItemType[]
}

/**
 * 推荐歌曲
 */
export interface RecSongType {
  id: number
  name: string
  picUrl: string
  [name: string]: unknown
}

// 推荐歌单
export interface RecSongSheetApiType {
  result: RecSongType[]
}

/**
 * api 歌单分类
 */
export interface PlaylistCateApiType {
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

export interface ToplistType {
  id: number
  coverImgUrl: string
  name: string
  playCount: number
  [name: string]: unknown
}

/**
 * - api 推荐分类
 */
export interface ToplistApiType {
  playlists: ToplistType[]
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

/**
 * api 歌单详情
 */
export interface PlaylistDetailsApiType {
  playlist: PlaylistType
  privileges: unknown[]
}

/**
 * api 所有歌曲
 */
export interface PlaylistAllApiType {
  privileges: SongType[]
  songs: SongType[]
  code: number
}

/**
 * params 所有歌曲参数
 */
export interface PlaylistAllParamsType {
  id: number
  limit?: number
  offset?: number
}

/**
 * params 歌曲url
 */
export interface SongUrlParamsType {
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

/**
 * api 歌曲url
 */
export interface SongUrlApiType {
  data: SongUrlItem[]
}

/**
 * api recommend/songs  推荐歌曲
 */
export interface RecommSongApiType {
  data: {
    dailySongs: SongType[]
    recommendReasons: Array<{
      reason: string
      reasonId: string
      songId: number
      targetUrl: string
    }>
    orderSongs: []
  }
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

/**
 * api 歌词
 */
export interface LyricApiType {
  lrc: {
    lyric: string
    version: number
  }
  [name: string]: any
}

// api 歌手 Singer
export interface SingerInfoType {
  data: {
    user: {
      avatarUrl: string
      backgroundUrl: string
      [name: string]: any
    }
    artist: ArtistType
    videoCount: number
  }
  [name: string]: unknown
}

// api singer
export interface SingerTopPlaylistType {
  songs: SongType[]
  code: number
  more: boolean
}

// api singer singe/album
export interface SingerAlbumType {
  artist: {
    name: string
    [name: string]: any
  }
  hotAlbums: AlbumType[]
  more: boolean
}

// api singer singer/mv
export interface SingerMvType {
  code: number
  time: number
  mvs: MvType[]
  hasMore: boolean
}

/**
 * api /singer/hot
 */
export interface SingerHotApiType {
  code: number
  more: boolean
  artists: ArtistType[]
}

// api singer singer/sim
// export interface SingerSimilarType { }

// api album
export interface AlbumInfoType {
  code: number
  album: AlbumType
  songs: SongType[]
}

// api song song/detail
export interface SongDetailApiType {
  code: number
  privileges: any[]
  songs: SongType[]
}

/**
 * api /user/account
 */
export interface UserAccountApiType {
  code: number
  account: {
    anonimousUser: boolean // 匿名用户
    createTime: number
    id: number
    status: number
    type: number
    userName: string
    vipType: number
    whitelistAuthority: number
  }
  profile: AccountProfile
}

export interface AccountProfile {
  userId: number
  userName: string
  vipType: number
  province: number // 省份
  city: number // 城市
  avatarUrl: string
  avatarImgId: number
  backgroundUrl: string
  backgroundImgId: number
  nickname: string
  gender: number // 性别
  lastLoginIP: string
  lastLoginTime: number
}
