import Img from '@components/Img'
import React, { CSSProperties, useState } from 'react'

import { SingerType, SongType } from '@/type/api'
import { formatTime } from '@/utils/time'
interface TrackItemType {
  songProps: SongType
  style?: CSSProperties
}

const TrackItem: React.FC<TrackItemType> = (props) => {
  const [showLike, setShowLike] = useState<boolean>(false)
  const {
    style,
    songProps: {
      name,
      dt,
      ar,
      al: { name: AlbumName, picUrl },
    },
  } = props
  const formatSingerName = (arr: SingerType[]): string => {
    let re = ''
    arr.forEach((ele, idx) => (re += `${idx !== 0 ? ',' : ''}${ele.name}`))
    return re
  }

  const handleMouseEnter = (): void => setShowLike(true)
  const handleMouseLeave = (): void => setShowLike(false)

  return (
    <>
      <div
        style={style}
        className="flex w-full items-center p-3 rounded-xl hover:bg-gray-200"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Img src={picUrl} className="w-12 h-12 mr-4 rounded-md" />
        <div className="flex-1 flex flex-col min-w-1/4">
          <div className="font-bold truncate">{name}</div>
          <div className="text-gray-600 cursor-pointer hover:underline">{formatSingerName(ar)}</div>
        </div>
        <div className="flex-1 flex cursor-pointer hover:underline">{AlbumName}</div>
        <button className={showLike ? 'mx-10' : 'mx-10 invisible'}>T^T</button>
        <div className="mr-4">{formatTime(dt)}</div>
      </div>
    </>
  )
}

export default TrackItem
