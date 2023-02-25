import type { AlbumType, SongType } from '@type/common'
import { formatDate } from '@utils/time'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import SongItem from '@/components/SongItem'
import { albumInfo as albumDetail } from '@/service/album'

import Introduce from './components/Introduce'

const Album: React.FC = () => {
  const [albumInfo, setAlbumInfo] = useState<AlbumType | null>(null)
  const [songList, setSongList] = useState<SongType[]>([])
  const { id } = useParams()

  useEffect(() => {
    const init = async (): Promise<void> => {
      const albumId = Number(id)
      const {
        data: { album, songs },
      } = await albumDetail(albumId)

      setSongList(songs)
      setAlbumInfo(album)
    }
    void init()
  }, [])

  return (
    <main className="flex-1 overflow-y-auto px-10 box-border">
      {albumInfo !== null && <Introduce {...albumInfo} />}
      {songList?.map((ele, idx) => (
        <SongItem song={ele} idx={idx + 1} key={idx} listId={Number(id)} />
      ))}

      <section className="my-4 text-gray-400 text-sm">
        <hr />
        <div className="mt-6">发行于 · {formatDate(albumInfo?.publishTime ?? '')}</div>
        <div>&copy;{albumInfo?.company}</div>
      </section>
    </main>
  )
}

export default Album
