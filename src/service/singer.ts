import type {
  SingerAlbumType,
  SingerHotApiType,
  SingerInfoType,
  SingerMvType,
  SingerTopPlaylistType,
} from '@type/api'
import request from '@utils/request'
import { AxiosResponse } from 'axios'

/**
 * @description 获取歌手详情
 * - 说明 : 调用此接口 , 传入歌手 id, 可获得获取歌手详情
 * @param id 歌手 id
 * @returns
 */
export const singerDetail = async (id: number): Promise<AxiosResponse<SingerInfoType>> => {
  return await request<SingerInfoType>('/artist/detail', 'GET', {
    data: {
      id,
    },
  })
}

/**
 * @description 歌手热门 50 首歌曲
 * - 说明 : 调用此接口,可获取歌手热门 50 首歌曲
 * @param id 歌手 id
 * @returns
 */
export const singerTopSong = async (id: number): Promise<AxiosResponse<SingerTopPlaylistType>> => {
  return await request<SingerTopPlaylistType>('/artist/top/song', 'GET', {
    data: {
      id,
    },
  })
}

/**
 * @description 获取歌手专辑
 * - 说明 : 调用此接口 , 传入歌手 id, 可获得歌手专辑内容
 * - id: 歌手 id
 * - limit: 取出数量 , 默认为 50
 * - offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认为 0
 * @param {Object} params
 * @returns
 */
export const singerAlbum = async (params: {
  id: number
  limit?: number
  offset?: number
}): Promise<AxiosResponse<SingerAlbumType>> => {
  const { id, limit = 50, offset = 0 } = params
  return await request<SingerAlbumType>('/artist/album', 'GET', {
    data: {
      id,
      limit,
      offset,
    },
  })
}

/**
 * @description 获取歌手 mv
 * - 说明 : 调用此接口 , 传入歌手 id, 可获得歌手 mv 信息 , 具体 mv 播放地址可调用/mv传入此接口获得的 mvid 来拿到 , 如 : /artist/mv?id=6452,/mv?mvid=5461064
 * @param id 歌手 id, 可由搜索接口获得
 * @returns
 */
export const singerMv = async (id: number): Promise<AxiosResponse<SingerMvType>> => {
  return await request<SingerMvType>('/artist/mv', 'GET', {
    data: {
      id,
    },
  })
}

/**
 * @description 获取相似歌手
 *- 说明 : 调用此接口 , 传入歌手 id, 可获得相似歌手
 * @param id 歌手id
 * @returns
 */
export const singerSimilar = async (id: number): Promise<AxiosResponse<any>> => {
  return await request('/simi/artist', 'GET', {
    data: {
      id,
    },
  })
}

/**
 * @description 热门歌手
 * @param params 可选参数
 * - limit: 取出数量 , 默认为 50
 * - offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
 * @returns
 */
export const singerHot = async (params: {
  limit?: number
  offset?: number
}): Promise<AxiosResponse<SingerHotApiType>> => {
  const { limit = 50, offset = 0 } = params
  return await request<SingerHotApiType>('/top/artists', 'GET', {
    data: {
      limit,
      offset,
    },
  })
}
