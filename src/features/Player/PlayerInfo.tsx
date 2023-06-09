import Img from '@components/Img'
import FormatSingerName from '@features/FormatSingerName'
import { switchSongs } from '@store/features/player'
import type { AppDispatch, RootState } from '@store/index'
import React, { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { events } from '@/application/Pubsub'

const PlayerInfo: React.FC = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const songInfo = useSelector((state: RootState) => state.player.songInfo)
  const [id, setId] = useState<number>(songInfo?.id ?? -1)

  useEffect(() => {
    console.log(111)
    events.subscribe('track', (id: number) => {
      console.log('sub', id)
      setId(id)
    })
  }, [])

  useEffect(() => {
    dispatch(switchSongs())
  }, [id])

  return (
    <section className="w-1/4 flex flex-row">
      <Img
        src={songInfo?.al?.picUrl ?? ''}
        className="w-14 aspect-square rounded-md mr-4 select-none"
        onClick={() => navigate(`song`)}
      />
      <div className="flex flex-col justify-between select-none">
        <div className="line-clamp-1">{songInfo?.name}</div>
        <div className="line-clamp-1 mt-2">
          <FormatSingerName ar={songInfo?.ar} />
        </div>
      </div>
    </section>
  )
}

export default memo(PlayerInfo)
