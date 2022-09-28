import React from 'react'

import Cover from '@/components/Cover'
import Icon from '@/components/SvgIcon'
import { PlaylistType } from '@/type/api'
import { formatDate } from '@/utils/time'

interface IntroduceType {
  playDetails: PlaylistType
}

const Introduce: React.FC<IntroduceType> = (props) => {
  const {
    playDetails: { coverImgUrl, name, description, creator, updateTime, trackCount },
  } = props
  return (
    <header className="flex my-10">
      <Cover src={coverImgUrl} className="w-60 h-60 text-white" />
      <div className="pl-10 flex flex-col justify-between">
        <div className="text-4xl font-bold">{name}</div>
        <div className="">
          <div className="w-fit cursor-pointer hover:underline">{creator.nickname}</div>
          <div className="text-gray-500 text-sm">
            最新更新时间{formatDate(updateTime)} · {trackCount}首歌
          </div>
        </div>
        <div className="line-clamp-3 text-gray-600">{description}</div>
        <div>
          <button className="flex justify-center items-center py-2 px-4 rounded-md bg-purple-200 text-purple-900 hover:scale-105 transition-all ease-linear">
            <Icon name="play" className="mr-2 w-4 h-4" />
            <span className="text-base font-bold">播放</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Introduce
