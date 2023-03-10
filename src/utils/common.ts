import type { SingerType, SongType } from '@type/common'
import ColorThief from 'colorthief'

/**
 * @deprecated since Pull out components
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

/**
 * @description 歌曲是否可以播放
 * - 0: 免费或无版权
 * - 1: VIP 歌曲
 * - 4: 购买专辑
 * - 8: 非会员可免费播放低音质，会员可播放高音质及下载
 * - fee 为 1 或 8 的歌曲均可单独购买 2 元单曲
 * @param track
 * @returns
 */
export const isCanPlayTrack = (track: SongType): { playable: boolean; reason: string } => {
  const result = {
    playable: true,
    reason: '',
  }

  if (Number(track?.privilege?.pl) > 0) return result

  const fee = track?.fee !== undefined ? track?.fee : track.privilege?.fee
  const st = track?.st
  const noCR = track?.noCopyrightRcmd

  if (fee === 1) {
    // TODO VIP 账户判断
    result.playable = false
  } else if (fee === 4) {
    result.playable = false
    result.reason = '付费专辑'
  } else if (![null, undefined].includes(noCR)) {
    result.playable = false
    result.reason = '无版权'
  } else if (st < 0) {
    // TODO 账户登出
    result.playable = false
    result.reason = '已下架'
  }

  return result
}

/**
 * @description 添加playable
 * @param tracks
 * @param privileges
 * @returns
 */
export const addPlayableToTrack = (tracks: SongType[], privileges: any[]): SingerType[] => {
  if (tracks?.length === undefined) return tracks
  return tracks.map((track) => {
    const privilege = privileges.find((item) => item.id === track.id) ?? {}
    if (track.privilege !== undefined) Object.assign(track.privilege, privilege)
    else track.privilege = privilege

    const result = isCanPlayTrack(track)
    track.playable = result.playable
    track.reason = result.reason
    return track
  })
}
