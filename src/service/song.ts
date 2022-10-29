import type { SongUrlResponse, SongUrlType } from '@type/api'
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
