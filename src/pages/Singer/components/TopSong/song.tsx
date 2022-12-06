import Img from '@components/Img'
import type { SingerType, SongType } from '@type/api'
import React from 'react'

const TopSongItem: React.FC<SongType> = (props) => {
  const { al, ar, name } = props
  const formatSingerName = (arr: SingerType[]): string => {
    let re = ''
    arr.forEach((ele, idx) => (re += `${idx !== 0 ? ',' : ''}${ele.name}`))
    return re
  }
  return (
    <section className="flex flex-row">
      <Img src={al.picUrl} className="w-14 rounded-md mr-4 select-none" />
      <div className="flex flex-col justify-between select-none">
        <div className="line-clamp-1 cursor-pointer hover:underline">{name}</div>
        <div className="line-clamp-1 mt-2 cursor-pointer hover:underline">
          {formatSingerName(ar)}
        </div>
      </div>
    </section>
  )
}
export default TopSongItem
