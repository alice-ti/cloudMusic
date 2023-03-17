import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import Img from '@/components/Img'
import { RootState } from '@/store'
import { getColor } from '@/utils/common'

const Bg: React.FC = () => {
  const player = useSelector((state: RootState) => state.player)
  const [color, setColor] = useState<number[][]>([])

  useEffect(() => {
    const bgColor = async (): Promise<void> => {
      const [, palette] = await getColor(player.songInfo?.al?.picUrl ?? '', 3)
      setColor(palette)
    }
    void bgColor()
  }, [])

  // 渐变背景
  const bg = (color: number[][]): string => {
    const tag = color.map((ele) => `rgb(${ele.join(',')})`).join(',')
    return `radial-gradient( ${tag} )`
  }

  return (
    <>
      <div className="absolute top-0 w-full h-full -z-10">
        <div className="absolute w-full h-full" style={{ backgroundImage: bg(color) }}></div>
        <Img
          src={player.songInfo?.al?.picUrl ?? ''}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full blur-md opacity-70 grayscale-[25%]"
        />
      </div>
    </>
  )
}

export default Bg
