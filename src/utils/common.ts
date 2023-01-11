import type { SingerType } from '@type/common'

/**
 * @description 格式化歌手数据
 * @param arr
 * @returns
 */
export const formatSingerName = (arr: SingerType[]): string => {
  let re = ''
  if (Array.isArray(arr) && arr.length > 0) {
    arr.forEach((ele, idx) => (re += `${idx !== 0 ? ',' : ''}${ele.name}`))
  }
  return re
}
