import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import AlbumSearch from '@/components/Album'
import FormatSingerName from '@/features/FormatSingerName'
import type { AlbumType } from '@/type/common'

interface AlbumProps {
  list: AlbumType[]
}

const SearchAlbum: FC<AlbumProps> = ({ list }) => {
  const navigate = useNavigate()

  return (
    <section className="grid grid-cols-5 gap-x-8 gap-y-8 text-white">
      {list?.map((ele, idx) => (
        <div className="flex flex-col" key={idx}>
          <AlbumSearch src={ele.picUrl} albumClick={() => navigate(`/album/${ele.id}`)} />
          <div className="mt-4 w-full text-gray-500/80 text-sm">
            <div className="mb-2 text-black/80 font-bold">{ele.name}</div>
            <FormatSingerName ar={ele.artists} />
          </div>
        </div>
      ))}
    </section>
  )
}

export default SearchAlbum
