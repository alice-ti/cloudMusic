import type { AxiosResponse } from 'axios'

import type { BannerType, RecSongSheetType } from '@/type/api'
import request from '@/utils/request'

/**
 * @description 获取轮播图
 */
export const getBanner = async (): Promise<AxiosResponse<BannerType>> => {
  return await request<BannerType>('/banner', 'GET')
}

/**
 * @description 推荐歌单
 * @param limit
 * @returns
 */
export const getRecSongSheet = async (
  limit: number = 10
): Promise<AxiosResponse<RecSongSheetType>> => {
  return await request<RecSongSheetType>('/personalized', 'GET', {
    data: {
      limit,
    },
  })
}
