import type { AlbumInfoType } from '@type/api'
import request from '@utils/request'
import { AxiosResponse } from 'axios'

/**
 * @description 获取专辑内容
 * - 说明 : 调用此接口 , 传入专辑 id, 可获得专辑内容
 * @param id 专辑 id
 * @returns
 */
export const albumInfo = async (id: number): Promise<AxiosResponse<AlbumInfoType>> => {
  const albumlist = await request<AlbumInfoType>('/album', 'GET', {
    data: {
      id,
    },
  })

  // TODO 对获取数据二次处理，添加版权相关信息 addPlayableToTrack
  return albumlist
}
