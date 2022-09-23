import React from 'react'

import { SingerType, SongType } from '@/type/api'
import { formatTime } from '@/utils/time'
interface TrackItemType {
  songProps: SongType
}

const TrackItem: React.FC<TrackItemType> = (props) => {
  const {
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
  return (
    <>
      <div className="flex items-center p-3 rounded-xl hover:bg-gray-200">
        <div className="flex items-center min-w-1/4">
          <img src={picUrl} className="w-12 h-12 mr-4 rounded-md" />
          <div className="flex flex-col min-w-1/2">
            <div>{name}</div>
            <div className="text-gray-600 cursor-pointer hover:underline">
              {formatSingerName(ar)}
            </div>
          </div>
        </div>
        <div className="flex-1 flex justify-center cursor-pointer hover:underline">{AlbumName}</div>
        <div>{formatTime(dt)}</div>
      </div>
    </>
  )
}

export default TrackItem
