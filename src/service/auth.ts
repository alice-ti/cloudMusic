import { AxiosResponse } from 'axios'

import request from '@/utils/request'

/**
 * @description 二维码key生成接口
 * @returns
 */
export const loginQrCodeKey = async (): Promise<
  AxiosResponse<{ code: number; data: { code: number; unikey: string } }>
> => {
  return await request('/login/qr/key', 'GET', {
    data: { timestamp: new Date().getTime() },
  })
}

/**
 * @description 二维码生成接口
 * - 说明: 调用此接口传入上一个接口生成的key可生成二维码图片的base64和二维码信息,
 * 可使用base64展示图片,或者使用二维码信息内容自行使用第三方二维码生产库渲染二维码
 * @param {Object} params
 * @param {string} params.key
 * @param {string=} params.qrimg 传入后会额外返回二维码图片base64编码
 */
export const loginQrCodeCreate = async (params: {
  key: string
  qrimg?: string
}): Promise<AxiosResponse<any>> => {
  return await request('/login/qr/create', 'GET', {
    data: {
      ...params,
      timestamp: new Date().getTime(),
    },
  })
}

/**
 * @description 二维码检测扫码状态接口
 * - 说明: 轮询此接口可获取二维码扫码状态,800为二维码过期,801为等待扫码,802为待确认,803为授权登录成功(803状态码下会返回cookies)
 * @param {string} key
 */
export const loginQrCodeCheck = async (
  key: string
): Promise<AxiosResponse<{ code: number; cookie: string; message: string }>> => {
  return await request('/login/qr/check', 'GET', {
    data: {
      key,
      timestamp: new Date().getTime(),
    },
  })
}

/**
 * @description 游客（匿名）登录
 * @returns
 */
export const anonymousLogin = async (): Promise<AxiosResponse<any>> => {
  return await request('/register/anonimous', 'GET', {})
}
