import Album from '@components/Album'
import type { RecSongType } from '@type/api'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getRecSongSheet } from '@/service/songList'

const RecomSongSheet: React.FC = () => {
  const [songList, setSongList] = useState<RecSongType[]>()
  const navigate = useNavigate()

  // to歌单详情
  const goPlaylist = (id: number): void => {
    console.log(id)
    navigate(`/playlist/${id}`)
  }

  useEffect(() => {
    const getList = async (): Promise<void> => {
      const {
        data: { result },
      } = await getRecSongSheet()
      console.log(result)
      setSongList(result)
    }
    void getList()
  }, [])

  return (
    <main className="grid grid-cols-5 gap-x-8 gap-y-8 box-border text-white">
      {songList?.map((ele) => (
        <div className="my-1.5" key={ele.id}>
          <Album src={ele.picUrl} albumClick={() => goPlaylist(ele.id)} />
          <div className="mt-4 text-black/80 font-bold">{ele.name}</div>
        </div>
      ))}
    </main>
  )
}

export default RecomSongSheet
