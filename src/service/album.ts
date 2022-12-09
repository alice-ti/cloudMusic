import type { AlbumDetailType } from '@type/api'
import request from '@utils/request'
import { AxiosResponse } from 'axios'

/**
 * @description 获取专辑内容
 * - 说明 : 调用此接口 , 传入专辑 id, 可获得专辑内容
 * @param id 专辑 id
 * @returns
 */
export const albumDetail = async (id: number): Promise<AxiosResponse<AlbumDetailType>> => {
  return await request<AlbumDetailType>('/album', 'GET', {
    data: {
      id,
    },
  })
}
