import { FC } from 'react'

import Artist from '@/components/Artist'
import type { ArtistType } from '@/type/common'

interface SingerProps {
  list: ArtistType[]
}
const SearchSinger: FC<SingerProps> = ({ list }) => {
  return (
    <>
      <div className="grid grid-cols-5 gap-x-1 gap-y-4 text-center">
        {list?.map((ele, idx) => (
          <Artist info={ele} key={idx} className="flex flex-col items-center" />
        ))}
      </div>
    </>
  )
}

export default SearchSinger
