import { AxiosResponse } from 'axios'

import type { UserAccountApiType, UserPlaylistType } from '@/type/api'
import request from '@/utils/request'

/**
 * @description 获取账号信息
 * - 说明 : 登录后调用此接口 ,可获取用户账号信息
 * @returns
 */
export const userAccount = async (): Promise<AxiosResponse<UserAccountApiType>> => {
  return await request<UserAccountApiType>('/user/account', 'GET')
}

/**
 * @description 获取用户信息 , 歌单，收藏，mv, dj 数量
 * - 说明 : 登录后调用此接口 , 可以获取用户信息
 * @returns
 */
export const userSubcount = async (): Promise<AxiosResponse<any>> => {
  return await request('/user/subcount', 'GET')
}

/**
 * @description 获取用户歌单
 * - 说明 : 登录后调用此接口 , 传入用户 id, 可以获取用户歌单
 * - 必选参数 :
 * - - uid : 用户 id
 * - 可选参数 :
 * - - limit : 返回数量 , 默认为 30
 * - - offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 * @param uid
 * @returns
 */
export const userPlaylist = async ({
  uid,
  limit = 30,
  offset = 0,
}: {
  uid: number
  limit?: number
  offset?: number
}): Promise<AxiosResponse<UserPlaylistType>> => {
  return await request<UserPlaylistType>('/user/playlist', 'GET', {
    data: {
      uid,
      limit,
      offset,
    },
  })
}
