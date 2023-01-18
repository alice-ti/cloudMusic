import type { RootState } from '@store/index'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import lrc from '@/application/Lyric'
import player from '@/application/player'

const Lyric: React.FC = () => {
  // const [progress, setProgress] = useState(0)
  const [lyricList, setLyricList] = useState<string[]>([])
  const Song = useSelector((state: RootState) => state.player.songInfo)

  const lyricInterval = useRef(0)
  const currLine = useRef<HTMLElement | null>(null)

  let timeList: unknown[] = []

  useEffect(() => {
    const init = async (): Promise<void> => {
      await lrc.getLrc(Song.id)
      timeList = Object.keys(lrc?.timeTags)
      const lrcList = Object.values(lrc?.timeTags)
      setLyricList(lrcList)

      update()
    }
    if (Song.id !== -1) void init()

    return () => clearInterval(lyricInterval.current)
  }, [Song.id])

  useEffect(() => {}, [])

  const scroll = (time: number, prev: number): number => {
    const currIndex = timeList.findIndex((ele, idx, _arr) => {
      const curr = Number(ele)
      const next = idx + 1 === _arr.length ? Infinity : Number(_arr[idx + 1])
      return curr <= time && next > time
    })
    if (currIndex === prev) return currIndex

    currLine.current?.classList.remove('text-red-600')
    currLine.current = document.querySelector(`#line-${currIndex}`)
    currLine.current?.classList.add('text-red-600')
    // TODO 歌词滚动待处理
    // currLine.current?.scrollIntoView({
    //   behavior: 'smooth', // 平滑过渡
    //   block: 'start', // 上边框与视窗顶部平齐
    // })

    return currIndex
  }

  const update = (): void => {
    let prev = -1
    lyricInterval.current = setInterval(() => {
      const timev = player?.progress ?? 0
      prev = scroll(timev * 1000, prev)
    }, 1000)
  }

  return (
    <div className="h-full">
      <ul className="h-full">
        {lyricList?.map((ele, idx) => (
          <li className="h-16 font-bold text-center" id={`line-${idx}`} key={idx}>
            {ele}
          </li>
        ))}
      </ul>
      <div></div>
    </div>
  )
}

export default Lyric
