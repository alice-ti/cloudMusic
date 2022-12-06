import Img from '@components/Img'
import type { SongType } from '@type/api'
import React from 'react'

import { formatSingerName } from '@/utils/common'

const TopSongItem: React.FC<SongType> = (props) => {
  const { al, ar, name } = props
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
