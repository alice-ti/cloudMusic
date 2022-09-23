import React, { useEffect, useState } from 'react'

import TrackItem from '@/components/TrackItem'
import { getPlaylistDetails } from '@/service/songSheet'
import type { PlaylistType, SongType } from '@/type/api'

import Introduce from './components/Introduce'

let isInit = false

const Songsheet: React.FC = () => {
  const [listDetail, setListDetail] = useState<PlaylistType>()
  const [playList, setPlayList] = useState<SongType[]>([])
  const id = 2671145804

  useEffect(() => {
    const init = async (): Promise<void> => {
      isInit = true
      const {
        data: { playlist },
      } = await getPlaylistDetails(id)
      console.log('playlist', playlist)
      setListDetail(playlist)
      setPlayList(playlist.tracks.filter((ele, idx) => idx < 10))
    }
    if (!isInit) void init()
  }, [])

  return (
    <>
      <main className="flex-1 overflow-y-auto px-14 box-border">
        {listDetail != null && <Introduce playDetails={listDetail} />}
        <div>
          {playList?.map((ele, idx) => (
            <TrackItem songProps={ele} key={idx} />
          ))}
        </div>
      </main>
    </>
  )
}

export default Songsheet
