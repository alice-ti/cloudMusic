import type { RecommSongType, SongUrlResponse, SongUrlType } from '@type/api'
import request from '@utils/request'
import { AxiosResponse } from 'axios'

/**
 * @description 调用此接口, 传入的音乐 id( 可多个 , 用逗号隔开 ), 可以获取对应的音乐的 url,未登录状态或者非会员返回试听片段(返回字段包含被截取的正常歌曲的开始时间和结束时间)
 * @param params id : 音乐 id standard => 标准,higher => 较高, exhigh=>极高, lossless=>无损, hires=>Hi-Res
 * @returns
 */
export const SongUrl = async (params: SongUrlType): Promise<AxiosResponse<SongUrlResponse>> => {
  const { id, level } = params
  return await request<SongUrlResponse>('/song/url', 'GET', {
    data: {
      id,
      level,
    },
  })
}

/**
 * @description 调用此接口 , 传入音乐 id(支持多个 id, 用 , 隔开), 可获得歌曲详情(dt为歌曲时长)
 * @param params 必选参数: ids: 音乐 id, 如 ids=347230  ids=347230,347231
 * @returns
 */
export const SongDetail = async (params: any): Promise<AxiosResponse<any>> => {
  const { ids } = params
  return await request('/song/detail', 'GET', {
    data: {
      ids,
    },
  })
}

/**
 * @description 每日推荐歌曲
 * - 说明 : 调用此接口 , 可获得每日推荐歌曲 ( 需要登录 )
 * @returns
 */
export const dailyRecommendTracks = async (): Promise<AxiosResponse<RecommSongType[]>> => {
  return await request<RecommSongType[]>('/recommend/songs', 'GET', {
    data: {
      timestamp: Date.now(),
    },
  })
}
