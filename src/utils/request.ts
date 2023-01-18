import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'

const BASE_URL = '/api'

interface OptionType {
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
  async (error) => {
    // 当请求异常时做一些处理
    return await Promise.reject(error)
  }
)

// 响应拦截
axios.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    return await Promise.reject(error)
  }
)

/**
 * @description 请求
 * @param url   请求url
 * @param method   请求类型
 * @param options   请求参数
 */
const request = async <T>(
  url: string,
  method: string,
  options: OptionType = {}
): Promise<AxiosResponse<T>> => {
  const params = method === 'GET' ? { params: options?.data ?? {} } : { data: options?.data ?? {} }

  const config: AxiosRequestConfig<OptionType> = {
    url,
    method,
    baseURL: BASE_URL,
    ...params,
  }

  if (options?.headers != null) config.headers = options?.headers

  return await new Promise((resolve) => {
    axios(config)
      .then((response: AxiosResponse<T>) => {
        // console.log(response)
        resolve(response)
      })
      .catch((error) => {
        console.log('_Axios_EOR_', error)
      })
  })
}

export default request
