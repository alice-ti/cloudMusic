/* eslint-disable no-useless-escape */
import { getLyric } from '@/service/song'

interface FlagTagsType {
  [name: string]: any
}

interface TimeTagsType {
  [name: string]: any
}

class Lrc {
  timeTags: TimeTagsType = {}
  canPlay = 0 // 当前状态 0 未加载 1 获取失败 2 解析失败 3 解析成功
  canPlayInf = ['外星人正在搜寻歌词,请稍后', '外星人未找到歌词', '歌词外星人无法解析'] // 与canPlay 对应提示 除3之外
  lastWord = '' // 上一次歌词

  constructor() {
    this.init()
  }

  init(): void {}

  async getLrc(songId: number): Promise<void> {
    // 异步获取歌词
    this.canPlay = 0
    const {
      data: {
        lrc: { lyric },
      },
    } = await getLyric(songId)

    this.timeTags = this.getTimeTags(lyric)
    // 判断是否成功解析,不为空.
    this.canPlay = Object.keys(this.timeTags).length === 0 ? 2 : 3 // 设置当前状态
  }

  getTimeTags(text: string): any {
    const res: any = {} // 结果
    if (typeof text !== 'string') return res
    const textArray = text.split('\n') // 歌词拆分
    const timeRule = [60000, 1000, 1] // 对应位数的毫秒数
    let addTime = 0 // 时间补偿
    for (const val of textArray) {
      const textArrayItem = val
      if (textArrayItem.match(/(?:\[\d+\:\d+(?:[.:]\d+)?\])+.*/) != null) {
        // 判断是否符合歌词的规则
        const findWord = textArrayItem.replace(/(?:\[\d+\:\d+(?:[.:]\d+)?\])+/g, '').trim() // 歌去除时间保留歌词,并去除两端多余空格
        if (findWord !== '') {
          // 去除歌词为空的项
          const findTime = textArrayItem.match(/(?:\[\d+\:\d+(?:[.:]\d+)?\])/g) // 匹配多个时间 例如 [1:2.3][4:2.4]hello world
          for (const findTimeKey in findTime) {
            const findTimeItem = findTime[Number(findTimeKey)].match(/\d+/g) // 切割每一个时间的m s ms部分
            let nowTime = addTime // 初始为偏移时间 解决[offset:-232]操作

            findTimeItem?.forEach((ele, idx: number) => {
              nowTime += parseInt(findTimeItem[idx]) * timeRule[idx] // 分钟,秒,毫秒转换为转毫秒之后累加
            })

            res[nowTime > 0 ? nowTime : 0] = findWord // 限制下线时间 0
          }
        }
      } else if (textArrayItem.match(/^\[offset\:\-?[1-9]\d+\]$/) != null) {
        // 匹配偏移时间 解决[offset:-232]操作
        // [offset:-232]正值表示整体提前，负值相反
        addTime -= parseInt(
          textArrayItem.substring(textArrayItem.indexOf(':') + 1, textArrayItem.length)
        )
      }
    }
    return res
  }

  getWord(time: number, fuzzy: null | number = null): any {
    // 获取解析歌词 time: 毫秒 flag:是否模糊匹配 若为 false 且找不到时返回 ''
    // timeDeviation:模糊时间 (time - timeDeviation< time < time + timeDeviation),flag 为true 时生效
    // 解析成功
    const timeDeviation = fuzzy === null ? 50 : fuzzy
    if (fuzzy !== null) {
      // 模糊匹配
      for (const key in this.timeTags) {
        // 获取大概区间的第一个歌词
        if (Number(key) >= time - timeDeviation && Number(key) <= time + timeDeviation) {
          this.lastWord = this.timeTags[key]
          return this.timeTags[key]
        } else if (Number(key) > time + timeDeviation) {
          // 未找到返回上一次的歌词
          return this.lastWord
        }
      }
    }
    // 精确匹配
    else return this.timeTags[time]
  }
}

const lrc = new Lrc()

export default lrc
