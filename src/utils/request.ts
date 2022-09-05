import axios from 'axios'
import type { AxiosResponse, AxiosRequestConfig } from 'axios'

const BASE_URL = 'api/'

type OptionType = {
  data?: unknown
  headers?: {
    [name: string]: string | number | boolean
  }
}

// 请求拦截
axios.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    // 当请求异常时做一些处理
    return Promise.reject(error)
  }
)

// 响应拦截
axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * @description 请求
 * @param url   请求url
 * @param method   请求类型
 * @param options   请求参数
 * @returns {Promise<AxiosResponse>}
 */
const request = (url: string, method: string, options: OptionType = {}): Promise<AxiosResponse> => {
  const params = method === 'GET' ? { params: options?.data ?? {} } : { data: options?.data ?? {} }

  const config: AxiosRequestConfig<OptionType> = {
    url,
    method,
    ...params,
  }

  if (options?.headers) config.headers = options?.headers

  return new Promise((resolve) => {
    axios(config)
      .then((response) => {
        console.log(response)
        resolve(response.data)
      })
      .catch((error) => {
        console.log('_Axios_EOR_', error)
      })
  })
}

export default request
