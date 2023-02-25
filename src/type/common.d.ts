// 歌手类型 -- 简易
export interface SingerType {
  id: number
  name: string
  [name: string]: unknown
}

/**
 * base 歌曲类型
 */
// 0: 免费或无版权
// 1: VIP 歌曲
// 4: 购买专辑
// 8: 非会员可免费播放低音质，会员可播放高音质及下载
// fee 为 1 或 8 的歌曲均可单独购买 2 元单曲
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
  fee?: 0 | 1 | 4 | 8
  privilege: {
    pl: number
    fee: 0 | 1 | 4 | 8
    [name: string]: unknown
  } // 是否特权
  st: number // 是否下架 小于 0 为已下架
  noCopyrightRcmd: any // 版权 非空为无版权
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
