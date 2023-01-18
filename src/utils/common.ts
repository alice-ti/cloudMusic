import type { SingerType } from '@type/common'
import ColorThief from 'colorthief'

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

/**
 * @description 获取图片颜色
 * @param imgUrl 图片链接
 * @param paletteCount 调色板颜色个数
 * @returns 主导色 & 颜色面板
 */
export const getColor = async (
  imgUrl: string,
  paletteCount = 5
): Promise<[[number, number, number], Array<[number, number, number]>]> => {
  const img = new Image()
  img.src = imgUrl
  img.crossOrigin = 'Anonymous' // 允许跨域

  return await new Promise((resolve, reject) => {
    img.onload = (e) => {
      const colorThief = new ColorThief()
      const primaryColor = colorThief.getColor(img)
      const paletteColor = colorThief.getPalette(img, paletteCount)

      resolve([primaryColor, paletteColor])
    }
  })
}
