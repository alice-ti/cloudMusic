import { singerDetail } from '@service/singer'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Introduce, { IntroduceType } from './components/Introduce'
import TopSong from './components/TopSong'

const Singer: React.FC = () => {
  const [singerInfo, setSingerInfo] = useState<IntroduceType | null>(null)
  const [imgUrl, setImgUrl] = useState<string>('')
  const { id } = useParams()
  useEffect(() => {
    const init = async (): Promise<void> => {
      const {
        data: {
          data: {
            user: { avatarUrl },
            artist,
          },
        },
      } = await singerDetail(Number(id))

      if (artist !== null) setSingerInfo(artist)
      setImgUrl(avatarUrl)
    }
    void init()
  }, [id])

  return (
    <main className="flex-1 overflow-y-auto px-8 box-border">
      <div>{singerInfo !== null && <Introduce singerInfo={singerInfo} coverImgUrl={imgUrl} />}</div>

      <div className="">
        <div className="text-xl font-bold">热门歌曲</div>
        <TopSong />
      </div>
    </main>
  )
}

export default Singer
