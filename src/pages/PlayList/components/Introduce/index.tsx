import React from 'react'

import Cover from '@/components/Cover'
import Icon from '@/components/SvgIcon'
import { PlaylistType } from '@/type/api'

interface IntroduceType {
  playDetails: PlaylistType
}

const Introduce: React.FC<IntroduceType> = (props) => {
  const {
    playDetails: { coverImgUrl, name, description, creator },
  } = props
  return (
    <header className="flex">
      <Cover src={coverImgUrl} className="w-60 h-60" />
      <div className="pl-10 flex flex-col justify-between">
        <div className="text-4xl">{name}</div>
        <div>{creator.nickname}</div>
        <div className="line-clamp-3">{description}</div>
        <div>
          <button className="flex justify-center items-center py-2 px-4 rounded-md bg-purple-200 text-purple-900 hover:scale-105 transition-all ease-linear">
            <Icon name="play" className="mr-2" />
            <span className="text-base">播放</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Introduce
