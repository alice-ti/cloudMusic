import type { RecomFMType } from '@type/api'
import request from '@utils/request'
import type { AxiosResponse } from 'axios'

/**
 * @description 私人 FM( 需要登录 )
 * @returns
 */
export const personalFM = async (): Promise<AxiosResponse<RecomFMType>> => {
  return await request<RecomFMType>('/personal_fm', 'GET', {
    data: {
      timestamp: Date.now(),
    },
  })
}
