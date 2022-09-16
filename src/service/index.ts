import type { AxiosResponse } from 'axios'

import type { BannerType } from '@/type/api'
import request from '@/utils/request'

/**
 * @description 获取轮播图
 */
export const getBanner = async (): Promise<AxiosResponse<BannerType>> => {
  return await request<BannerType>('/banner', 'GET')
}
