import { singerAlbum, singerMv } from '@service/singer'
import type { AlbumType, MvType } from '@type/common'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import SingerAlbum from './components/Album'
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
    <main className="xl:px-30 flex-1 overflow-y-auto px-20 box-border">
      <Introduce />

      <Latest album={albumList[0]} mv={MvList[0]} />

      <p className="mb-4 text-xl font-bold">热门歌曲</p>
      <HotSong />

      <p className="my-4 text-xl font-bold">专辑</p>
      <SingerAlbum list={albumList} />
    </main>
  )
}

export default Singer
