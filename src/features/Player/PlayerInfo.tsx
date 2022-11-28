import Img from '@components/Img'
import type { AppDispatch, RootState } from '@store/index'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { events } from '@/application/Pubsub'
import { switchSongs } from '@/store/features/player'

const PlayerInfo: React.FC = (props) => {
  const dispatch = useDispatch<AppDispatch>()
  const songInfo = useSelector((state: RootState) => state.player.songInfo)
  const [id, setId] = useState<number>(songInfo.id)

  useEffect(() => {
    events.subscribe('track', (id: number) => {
      console.log('sub', id)
      setId(id)
    })
  }, [])

  useEffect(() => {
    dispatch(switchSongs())
  }, [id])

  return (
    <>
      <Img src={songInfo?.al.picUrl} className="w-14 rounded-md mr-4 select-none" />
      <div className="flex flex-col justify-between select-none">
        <div>{songInfo.name}</div>
        <div className="mt-2">作者</div>
      </div>
    </>
  )
}

export default PlayerInfo
