import Button from '@components/Button'
import TrackItem from '@components/TrackItem'
import useLoading from '@hooks/useLoading'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { getPlaylistAll, getPlaylistDetails } from '@/service/songList'
import type { PlaylistAllParamsType, PlaylistType } from '@/type/api'
import type { SongType } from '@/type/common'

import Introduce from './components/Introduce'

let isInit = false

const Songsheet: React.FC = () => {
  const [listDetail, setListDetail] = useState<PlaylistType>()
  const [playList, setPlayList] = useState<SongType[]>([])
  const { id } = useParams()
  const loading = useLoading()

  useEffect(() => {
    const init = async (): Promise<void> => {
      isInit = true
      const {
        data: { playlist },
      } = await getPlaylistDetails(Number(id))
      console.log('playlist', playlist)
      setListDetail(playlist)
      setPlayList(playlist.tracks.filter((ele, idx) => idx < 10))
    }
    if (!isInit) void init()

    return () => {
      isInit = false
    }
  }, [])

  // 加载全部
  const loadAll = (): void => {
    const params: PlaylistAllParamsType = {
      id: Number(id),
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

  return (
    <>
      <main className="flex-1 overflow-y-auto px-14 box-border">
        {listDetail != null && <Introduce playDetails={listDetail} />}
        {/* todo 使用虚拟列表替换 */}
        <div>
          {playList?.map((ele, idx) => (
            <TrackItem songProps={ele} key={idx} playlistId={Number(id)} />
          ))}
        </div>
        <Button text="加载全部" className="mx-auto mt-6" onClick={loadAll} />
      </main>
    </>
  )
}

export default Songsheet
