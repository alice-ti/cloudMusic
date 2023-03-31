import { FC } from 'react'

import TrackItem from '@/components/TrackItem'
import type { SongType } from '@/type/common'

interface TrackProps {
  list: SongType[]
}
const SearchTrack: FC<TrackProps> = ({ list }) => {
  return (
    <>
      <div>
        {list?.map((ele, idx) => (
          <TrackItem songProps={ele} playlistId={ele?.al?.id} type="search" key={idx} />
        ))}
      </div>
    </>
  )
}

export default SearchTrack
