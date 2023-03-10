import { AxiosResponse } from 'axios'

import type { UserAccountApiType } from '@/type/api'
import request from '@/utils/request'

/**
 * @description 获取账号信息
 * - 说明 : 登录后调用此接口 ,可获取用户账号信息
 * @returns
 */
export const userAccount = async (): Promise<AxiosResponse<UserAccountApiType>> => {
  return await request<UserAccountApiType>('/user/account', 'GET')
}
