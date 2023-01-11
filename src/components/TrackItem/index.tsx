import Img from '@components/Img'
import React, { CSSProperties, useState } from 'react'
import { useDispatch } from 'react-redux'

import { AppDispatch } from '@/store'
import { switchSongsAsync } from '@/store/features/player'
import type { SongType } from '@/type/common'
import { formatSingerName } from '@/utils/common'
import { formatTime } from '@/utils/time'
interface TrackItemType {
  songProps: SongType
  playlistId: number
  style?: CSSProperties
}

const TrackItem: React.FC<TrackItemType> = (props) => {
  const [showLike, setShowLike] = useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>()
  const {
    style,
    playlistId,
    songProps: {
      name,
      dt,
      id: SongId,
      ar,
      al: { name: AlbumName, picUrl },
    },
  } = props

  const handleMouseEnter = (): void => setShowLike(true)
  const handleMouseLeave = (): void => setShowLike(false)

  const selectSong = (): void => {
    void dispatch(switchSongsAsync({ SongId, playlistId }))
  }

  return (
    <>
      <div
        style={style}
        className="flex w-full items-center p-3 rounded-xl hover:bg-gray-200"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Img src={picUrl} className="w-12 h-12 mr-4 rounded-md select-none" />
        <div className="flex-1 flex flex-col min-w-1/4">
          <div className="font-bold truncate">{name}</div>
          <div className="text-gray-600 cursor-pointer hover:underline">{formatSingerName(ar)}</div>
        </div>
        <div className="flex-1 flex cursor-pointer hover:underline">{AlbumName}</div>
        <button className={showLike ? 'mx-10' : 'mx-10 invisible'} onClick={selectSong}>
          T^T
        </button>
        <div className="mr-4">{formatTime(dt)}</div>
      </div>
    </>
  )
}

export default TrackItem
