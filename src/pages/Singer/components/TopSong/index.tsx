import { singerTopSong } from '@service/singer'
import { SongType } from '@type/api'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import TopSongItem from './song'

const TopSong: React.FC = (props) => {
  const [songList, setSongList] = useState<SongType[]>([])
  const { id } = useParams()

  useEffect(() => {
    const init = async (): Promise<void> => {
      const {
        data: { songs },
      } = await singerTopSong(Number(id))
      setSongList(songs)
    }
    void init()
  }, [id])

  return (
    <>
      <div className="grid grid-cols-4 gap-y-6">
        {songList.map((ele, idx) => {
          return <TopSongItem {...ele} key={idx} />
        })}
      </div>
    </>
  )
}

export default TopSong
