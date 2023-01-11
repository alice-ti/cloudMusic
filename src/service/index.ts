import type { AxiosResponse } from 'axios'

import type { BannerApiType } from '@/type/api'
import request from '@/utils/request'

/**
 * @description 获取轮播图
 */
export const getBanner = async (): Promise<AxiosResponse<BannerApiType>> => {
  return await request<BannerApiType>('/banner', 'GET')
}
