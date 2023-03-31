import type { SongType } from '@type/common'
import { formatTime } from '@utils/time'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import Icon from '@/components/SvgIcon'
import { AppDispatch } from '@/store'
import { switchSongsAsync } from '@/store/features/player'
import { isCanPlayTrack } from '@/utils/common'

interface SongItemPropsType {
  song: SongType
  idx: number
  listId: number
}

const SongItem: React.FC<SongItemPropsType> = (props) => {
  const { song, idx, listId } = props
  const { name, alia, dt, id } = song

  const [showLike, setShowLike] = useState<boolean>(false)

  const dispatch = useDispatch<AppDispatch>()

  const play = (SongId: number): void => {
    void dispatch(switchSongsAsync({ type: 'album', listId, SongId }))
  }

  const handleMouseEnter = (): void => setShowLike(true)
  const handleMouseLeave = (): void => setShowLike(false)

  const result = isCanPlayTrack(song)

  return (
    <>
      <section
        className={`py-4 px-6 flex flex-row items-center box-border hover:rounded-lg hover:bg-gray-200/30 ${
          result?.playable ? '' : 'pointer-events-none text-gray-400/70'
        }`}
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
          <Icon name="play" className="w-4 aspect-square" />
        </div>
        <div className="flex-1 ml-4 font-bold line-clamp-1 cursor-pointer" onClick={() => play(id)}>
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
