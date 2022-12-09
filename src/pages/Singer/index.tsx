import Album from '@components/Album'
import { singerAlbum, singerMv } from '@service/singer'
import type { AlbumType, MvType } from '@type/api'
import { formatDate } from '@utils/time'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import HotSong from './components/HotSong'
import Introduce from './components/Introduce'
import Latest from './components/Latest'

const Singer: React.FC = () => {
  const [albumList, setAlbumList] = useState<AlbumType[]>([])
  const [MvList, setMvList] = useState<MvType[]>([])
  const { id } = useParams()
  useEffect(() => {
    const singerId = Number(id)
    const init = async (): Promise<void> => {
      const {
        data: { hotAlbums },
      } = await singerAlbum({ id: singerId })

      const {
        data: { mvs },
      } = await singerMv(singerId)

      // TODO 登录后调此接口
      // const { data } = await singerSimilar(singerId)
      setMvList(mvs)
      setAlbumList(hotAlbums)
    }
    void init()
  }, [id])

  return (
    <main className="flex-1 overflow-y-auto px-8 box-border">
      <Introduce />

      <Latest album={albumList[0]} mv={MvList[0]} />

      <p className="mb-4 text-xl font-bold">热门歌曲</p>
      <HotSong />

      <p className="my-4 text-xl font-bold">专辑</p>
      <div className="text-gray-200 grid gap-x-8 gap-y-8 grid-cols-5 grid-rows-2">
        {albumList?.slice(1, 11).map((ele, idx) => (
          <div className="" key={idx}>
            <Album src={ele.picUrl} albumClick={() => {}} />
            <div className="mt-2 line-clamp-2 text-gray-700 text-md">{ele.name}</div>
            <div className="text-gray-500 text-xs">{formatDate(ele.publishTime)}</div>
          </div>
        ))}
      </div>
    </main>
  )
}

export default Singer
