import type { SongType } from '@type/common'
import { formatTime } from '@utils/time'
import React, { useState } from 'react'

import Icon from '@/components/SvgIcon'

interface SongItemPropsType {
  song: SongType
  idx: number
}

const SongItem: React.FC<SongItemPropsType> = (props) => {
  const {
    song: { name, alia, dt },
    idx,
  } = props
  const [showLike, setShowLike] = useState<boolean>(false)

  const handleMouseEnter = (): void => setShowLike(true)
  const handleMouseLeave = (): void => setShowLike(false)
  return (
    <>
      <section
        className="py-4 px-6 flex flex-row items-center box-border hover:rounded-lg hover:bg-gray-200/30"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={`w-10 text-gray-400 text-center ${showLike ? 'hidden' : ''}`}>
          {idx.toString().padStart(2, '0')}
        </div>
        <div
          className={`w-10 text-purple-900 flex flex-row justify-center ${
            showLike ? '' : 'hidden'
          }`}
        >
          <Icon name="play" />
        </div>
        <div className="flex-1 ml-4 font-bold line-clamp-1 cursor-pointer">
          {name}
          <span className="text-gray-600/70">{alia.length > 0 && ` (${alia.join(',')}) `}</span>
        </div>
        <button className={showLike ? 'mx-10' : 'mx-10 invisible'}>T^T</button>
        <div className="mr-4">{formatTime(dt)}</div>
      </section>
    </>
  )
}

export default SongItem
