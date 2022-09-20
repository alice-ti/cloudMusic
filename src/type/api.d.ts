export interface BannerType {
  banners: any[]
}

export interface RecSongSheetType {
  result: Array<{ id: number; name: string; picUrl: string; [name: string]: any }>
}

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

export interface ToplistType {
  playlists: any[]
  [name: string]: any
}
