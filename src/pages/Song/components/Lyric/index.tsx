import { useEffect, useRef, useState } from 'react'

import lrc from '@/application/Lyric'
import player from '@/application/player'

const Lyric: React.FC = () => {
  const [progress, setProgress] = useState(0)
  const [lyricList, setLyricList] = useState<string[]>([])

  const lyricInterval = useRef(0)
  const currLine = useRef<HTMLElement | null>(null)

  let timeList: unknown[] = []

  useEffect(() => {
    const init = async (): Promise<void> => {
      await lrc.getLrc(33894312)
      console.log(lrc, player)
      timeList = Object.keys(lrc?.timeTags)
      const lrcList = Object.values(lrc?.timeTags)
      setLyricList(lrcList)

      update()
    }
    void init()
  }, [])

  useEffect(() => {}, [])

  const scroll = (time: number): void => {
    const currIndex = timeList.findIndex((ele, idx, _arr) => {
      const curr = Number(ele)
      const next = idx + 1 === _arr.length ? Infinity : Number(_arr[idx + 1])
      return curr <= time && next > time
    })
    // console.log(time, currIndex, timeList[currIndex])
    currLine.current = document.querySelector(`#line-${currIndex}`)
    currLine.current?.classList.add('text-red-600')
    currLine.current?.scrollIntoView({
      behavior: 'smooth', // 平滑过渡
      block: 'center', // 上边框与视窗顶部平齐
    })
  }

  const update = (): void => {
    lyricInterval.current = setInterval(() => {
      console.log(player?._howler?.seek())
      const timev = player?.progress ?? 0
      scroll(timev * 1000)
    }, 1000)
  }

  return (
    <div className="h-screen">
      <button onClick={() => player.togglePlayStatus()}>Btn</button>
      <ul className="h-full">
        {lyricList?.map((ele, idx) => {
          return (
            <li className="h-16 font-bold text-center" id={`line-${idx}`} key={idx}>
              {ele}
            </li>
          )
        })}
      </ul>
      <div></div>
    </div>
  )
}

export default Lyric
