import Img from '@components/Img'
import FormatSingerName from '@features/FormatSingerName'
import type { SongType } from '@type/common'
import { isCanPlayTrack } from '@utils/common'
import React from 'react'
import { useDispatch } from 'react-redux'

import { AppDispatch } from '@/store'
import { switchSongsAsync } from '@/store/features/player'

const HotSongItem: React.FC<SongType> = (props) => {
  const { al, ar, name, alia, id } = props

  const dispatch = useDispatch<AppDispatch>()

  const play = (): void => {
    void dispatch(switchSongsAsync({ listId: al?.id, type: 'album', SongId: id }))
  }

  const result = isCanPlayTrack(props)
  return (
    <section
      className={`p-2 box-border flex flex-row hover:bg-gray-300/50 hover:rounded-md hover:cursor-pointer ${
        result.playable ? '' : 'opacity-40 grayscale'
      }`}
    >
      <Img
        src={al.picUrl}
        className="w-14 aspect-square rounded-md mr-4 select-none"
        onClick={play}
      />
      <div className="flex flex-col justify-between">
        <div className="line-clamp-1 cursor-pointer hover:underline">
          {name}
          <span className="text-gray-600/70">{alia.length > 0 && ` (${alia.join(',')}) `}</span>
        </div>
        <div className="line-clamp-1 mt-2 cursor-pointer hover:underline">
          <FormatSingerName ar={ar} />
        </div>
      </div>
    </section>
  )
}
export default HotSongItem
