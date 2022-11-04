import Album from '@components/Album'
import { getRecSongSheet } from '@service/songSheet'
import type { RecSongType } from '@type/api'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
    <main className="grid grid-cols-5 gap-x-4 gap-y-1.5 px-8 box-border text-white">
      {songList?.map((ele) => (
        <div className="my-1.5" key={ele.id}>
          <Album src={ele.picUrl} albumClick={() => goPlaylist(ele.id)} />
        </div>
      ))}
    </main>
  )
}

export default RecomSongSheet
