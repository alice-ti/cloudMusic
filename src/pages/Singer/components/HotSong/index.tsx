import { singerTopSong } from '@service/singer'
import type { SongType } from '@type/common'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import HotSongItem from './song'

const HotSong: React.FC = (props) => {
  const [songList, setSongList] = useState<SongType[]>([])
  const { id } = useParams()

  useEffect(() => {
    const init = async (): Promise<void> => {
      const songId = Number(id)
      const {
        data: { songs },
      } = await singerTopSong(songId)
      setSongList(songs.slice(0, 12))
    }
    void init()
  }, [id])

  return (
    <>
      <div className="grid grid-cols-4 gap-y-6 gap-x-4">
        {songList.map((ele, idx) => {
          return <HotSongItem {...ele} key={idx} />
        })}
      </div>
    </>
  )
}

export default HotSong
