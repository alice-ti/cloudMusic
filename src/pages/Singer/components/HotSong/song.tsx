import Img from '@components/Img'
import type { SongType } from '@type/common'
import React from 'react'

import { formatSingerName } from '@/utils/common'

const HotSongItem: React.FC<SongType> = (props) => {
  const { al, ar, name, alia } = props
  return (
    <section className="p-2 box-border flex flex-row hover:bg-gray-300/50 hover:rounded-md hover:cursor-pointer">
      <Img src={al.picUrl} className="w-14 rounded-md mr-4 select-none" />
      <div className="flex flex-col justify-between">
        <div className="line-clamp-1 cursor-pointer hover:underline">
          {name}
          <span className="text-gray-600/70">{alia.length > 0 && ` (${alia.join(',')}) `}</span>
        </div>
        <div className="line-clamp-1 mt-2 cursor-pointer hover:underline">
          {formatSingerName(ar)}
        </div>
      </div>
    </section>
  )
}
export default HotSongItem
