import { useNavigate } from 'react-router-dom'

import Album from '@/components/Album'
import type { AlbumType } from '@/type/common'
import { formatDate } from '@/utils/time'

interface SingerAlbumProps {
  list: AlbumType[]
}

const SingerAlbum: React.FC<SingerAlbumProps> = (props: SingerAlbumProps) => {
  const { list } = props
  const navigate = useNavigate()

  return (
    <div className="text-gray-200 grid gap-x-10 gap-y-10 grid-cols-5 grid-rows-2">
      {list?.map((ele, idx) => (
        <div className="" key={idx}>
          <Album src={ele.picUrl} albumClick={() => navigate(`/album/${ele?.id}`)} />
          <div className="mt-2 line-clamp-2 text-gray-700 text-md">{ele.name}</div>
          <div className="text-gray-500 text-xs">{formatDate(ele.publishTime)}</div>
        </div>
      ))}
    </div>
  )
}

export default SingerAlbum
