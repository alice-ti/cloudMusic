import type { AxiosResponse } from 'axios'

import type { PlaylistCateType, RecSongSheetType, ToplistType } from '@/type/api'
import request from '@/utils/request'

/**
 * @description 推荐歌单
 * @param limit
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

/**
 * @description 歌单 ( 网友精选碟 )
 * @ 说明 : 调用此接口 , 可获取网友精选碟歌单
 * - order: 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'
 * - cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)
 * - limit: 取出歌单数量 , 默认为 50
 */
export const topPlaylist = async (params = {}): Promise<AxiosResponse<ToplistType>> => {
  return await request<ToplistType>('/top/playlist', 'GET', {
    data: params,
  })
}

/**
 * @description 歌单分类
 * @ 说明 : 调用此接口,可获取歌单分类,包含 category 信息
 */
export const playlistCatlist = async (): Promise<AxiosResponse<PlaylistCateType>> => {
  return await request<PlaylistCateType>('/playlist/catlist', 'GET')
}
