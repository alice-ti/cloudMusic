import type { AxiosResponse } from 'axios'

import type {
  PlaylistAllApiType,
  PlaylistAllParamsType,
  PlaylistCateApiType,
  PlaylistDetailsApiType,
  RecSongSheetApiType,
  ToplistApiType,
} from '@/type/api'
import request from '@/utils/request'

/**
 * @description 推荐歌单
 * @param limit
 */
export const getRecSongSheet = async (
  limit: number = 10
): Promise<AxiosResponse<RecSongSheetApiType>> => {
  return await request<RecSongSheetApiType>('/personalized', 'GET', {
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
export const topPlaylist = async (params = {}): Promise<AxiosResponse<ToplistApiType>> => {
  return await request<ToplistApiType>('/top/playlist', 'GET', {
    data: params,
  })
}

/**
 * @description 歌单分类
 * @ 说明 : 调用此接口,可获取歌单分类,包含 category 信息
 */
export const playlistCatlist = async (): Promise<AxiosResponse<PlaylistCateApiType>> => {
  return await request<PlaylistCateApiType>('/playlist/catlist', 'GET')
}

/**
 * @description 歌单详情
 * 说明 : 歌单能看到歌单名字, 但看不到具体歌单内容 , 调用此接口 , 传入歌单 id, 可以获取对应歌单内的所有的音乐(未登录状态只能获取不完整的歌单,登录后是完整的)，
 * 但是返回的trackIds是完整的，tracks 则是不完整的，可拿全部 trackIds 请求一次 song/detail 接口
 * 获取所有歌曲的详情 (https://github.com/Binaryify/NeteaseCloudMusicApi/issues/452)
 * - id : 歌单 id
 * - s : 歌单最近的 s 个收藏者, 默认为8
 * @param id 歌单id
 */
export const getPlaylistDetails = async (
  id: number
): Promise<AxiosResponse<PlaylistDetailsApiType>> => {
  return await request<PlaylistDetailsApiType>('/playlist/detail', 'GET', {
    data: {
      id,
    },
  })
}

/**
 * @description 获取歌单所有歌曲
 * @param param0
 * - 传入对应的歌单id，即可获得对应的所有歌曲
 * - 必选参数 : id : 歌单 id
 * - 可选参数 : limit : 限制获取歌曲的数量，默认值为当前歌单的歌曲数量
 * - 可选参数 : offset : 默认值为0
 */
export const getPlaylistAll = async (
  params: PlaylistAllParamsType
): Promise<AxiosResponse<PlaylistAllApiType>> => {
  const { id, offset, limit } = params
  return await request<PlaylistAllApiType>('/playlist/track/all', 'GET', {
    data: {
      id,
      offset,
      limit,
    },
  })
}
