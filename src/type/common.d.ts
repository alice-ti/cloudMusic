// 歌手类型 -- 简易
export interface SingerType {
  id: number
  name: string
  [name: string]: unknown
}

/**
 * base 歌曲类型
 */
export interface SongType {
  name: string
  id: number
  alia: string[]
  dt: number // 歌曲时长
  al: {
    id: number
    name: string
    picUrl: string
    [name: string]: unknown
  } // 专辑信息
  ar: SingerType[] // 歌手
  [name: string]: unknown
}

/**
 * base 专辑类型
 */
export interface AlbumType {
  picUrl: string
  name: string
  type: string
  id: number
  size: number
  description: string
  publishTime: number
  company: string
  [name: string]: unknown
}

/**
 * base Mv类型
 */
export interface MvType {
  artistName: string
  artist: SingerType
  imgurl: string
  imgurl16v9: number
  name: string
  publishTime: string
  status: number
  playCount: number
  duration: number
}

/**
 * base- artist 类型
 */

export interface ArtistType {
  id: number
  name: string
  cover: string
  albumSize: number
  musicSize: number
  mvSize: number
  identifyTag: string[]
  briefDesc: string
  picUrl?: string
  [name: string]: any
}
