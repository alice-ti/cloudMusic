import { AxiosResponse } from 'axios'

import type { SearchType } from '@/type/api.d'
import request from '@/utils/request'

// export type TypeOfSearch = 1 | 10 | 100 | 1000 | 1002 | 1004 | 1006 | 1009 | 1014 | 1018 | 2000
export enum TypeOfSearch {
  Song = 1,
  Album = 10,
  Artist = 100,
  Playlist = 1000,
}

interface PagingType {
  limit?: number
  offset?: number
}

type SearchParams<T> = {
  keywords: string
  type?: T
} & PagingType

type CloudSearch = <K extends TypeOfSearch>(
  params: SearchParams<K>
) => Promise<AxiosResponse<SearchType[K]>>

/**
 * @description 搜索
 * @explain 说明 : 调用此接口 , 传入搜索关键词可以搜索该音乐 / 专辑 / 歌手 / 歌单 / 用户 , 关键词可以多个 , 以空格隔开 ,
 * 如 " 周杰伦 搁浅 "( 不需要登录 ), 可通过 **song/url** 接口传入歌曲 id 获取具体的播放链接
 * - 必选参数 :
 * - - keywords : 关键词
 * - 可选参数 :
 * - - limit : 返回数量 , 默认为 30
 * - - offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 * - - type: 搜索类型。默认为 1 即单曲 。
 *  取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音(搜索声音返回字段格式会不一样)
 * @ 接口地址 : /search 或者 /cloudsearch(更全)
 * @example 调用例子 : /search?keywords=海阔天空 /cloudsearch?keywords=海阔天空
 * @returns
 */
export const cloudsearch: CloudSearch = async (params) => {
  const { keywords, limit = 30, offset = 0, type = 1 } = params
  return await request('/cloudsearch', 'GET', {
    data: {
      keywords,
      limit,
      offset,
      type,
    },
  })
}
