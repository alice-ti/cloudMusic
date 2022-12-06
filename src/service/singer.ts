import type { SingerInfoType, SingerTopPlaylistType } from '@type/api'
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
  return await request('/artist/top/song', 'GET', {
    data: {
      id,
    },
  })
}
