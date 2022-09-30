import React, { useEffect, useState } from 'react'

import useLoading from '@/components/Loading/useLoading'
import message from '@/components/Message'
import TrackItem from '@/components/TrackItem'
import LayoutFooter from '@/features/LayoutFooter'
import LayoutHeader from '@/features/LayoutHeader'
import { getPlaylistAll } from '@/service/songSheet'
import { PlaylistAllParamsType, SongType } from '@/type/api'

const Mine: React.FC = () => {
  const loading = useLoading()

  const [playList, setPlayList] = useState<SongType[]>([])
  useEffect(() => {}, [])

  const msg = (): void => {
    message.info({ content: 'So what ?' })
  }

  // t
  const loadAll = (): void => {
    const params: PlaylistAllParamsType = {
      id: Number(2260474995),
    }

    void (async () => {
      loading.show()
      const {
        data: { songs },
      } = await getPlaylistAll(params)
      console.log(songs)
      setPlayList(songs)
      loading.hide()
    })()
  }

  // t
  return (
    <div className="flex flex-col h-screen">
      <LayoutHeader />
      <button onClick={loadAll}>Load</button>
      {playList?.map((ele, idx) => (
        <TrackItem songProps={ele} key={idx} />
      ))}
      <LayoutFooter />
    </div>
  )
}

export default Mine
