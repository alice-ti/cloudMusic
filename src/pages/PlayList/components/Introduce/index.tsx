import React from 'react'

import Button from '@/components/Button'
import Img from '@/components/Img'
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
      <Img src={coverImgUrl} className="w-60 h-60 rounded-2xl text-white" />
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
          <Button
            icon="play"
            text="播放"
            className="py-2 px-4 hover:scale-105 transition-all ease-linear"
          />
        </div>
      </div>
    </header>
  )
}

export default Introduce
