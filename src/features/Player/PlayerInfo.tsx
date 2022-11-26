import Img from '@components/Img'
import React from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '@/store'

const PlayerInfo: React.FC = () => {
  const songInfo = useSelector((state: RootState) => state.player.songInfo)
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
