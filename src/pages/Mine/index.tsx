import useLoading from '@hooks/useLoading'
import type { PlaylistAllParamsType } from '@type/api'
import type { SongType } from '@type/common'
import React, { useEffect, useRef, useState } from 'react'

import TrackItem from '@/components/TrackItem'
import VirtualList from '@/components/VirtualList'
import LayoutFooter from '@/features/LayoutFooter'
import LayoutHeader from '@/features/LayoutHeader'
import { getPlaylistAll } from '@/service/songList'
import { userPlaylist } from '@/service/user'

const Mine: React.FC = () => {
  const loading = useLoading()

  const virRef = useRef()
  const [playlistId, setPlaylistId] = useState<number>(-1)
  const [songList, setSongList] = useState<SongType[]>([])

  useEffect(() => {
    void load()
  }, [])

  const load = async (): Promise<void> => {
    loading.show()

    const {
      data: { playlist },
    } = await userPlaylist({ uid: 1598064266 })

    const id = playlist[0].id
    setPlaylistId(id)

    const {
      data: { songs },
    } = await getPlaylistAll({ id })

    setSongList(songs)

    loading.hide()
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
      setSongList(songs)

      loading.hide()
    })()
  }

  // t
  return (
    <div className="flex flex-col h-screen">
      <LayoutHeader />
      <button onClick={loadAll}>Load</button>
      {songList.length > 0 && (
        <VirtualList itemCount={songList.length} getItemHeight={() => 72} ref={virRef}>
          {songList?.map((ele, idx) => (
            <TrackItem songProps={ele} key={idx} playlistId={playlistId} />
          ))}
        </VirtualList>
      )}
      <LayoutFooter />
    </div>
  )
}

export default Mine
