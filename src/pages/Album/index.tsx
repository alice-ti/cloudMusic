import { AlbumType } from '@type/api'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { albumDetail } from '@/service/album'

import Introduce from './components/Introduce'

const Album: React.FC = () => {
  const [albumInfo, setAlbumInfo] = useState<AlbumType | null>(null)
  const { id } = useParams()
  useEffect(() => {
    const init = async (): Promise<void> => {
      const albumId = Number(id)
      const {
        data: { album, songs },
      } = await albumDetail(albumId)

      setAlbumInfo(album)
      console.log(album)
    }
    void init()
  }, [])
  return (
    <main className="flex-1 overflow-y-auto px-10 box-border">
      {albumInfo !== null && <Introduce {...albumInfo} />}
      <div></div>
    </main>
  )
}

export default Album
