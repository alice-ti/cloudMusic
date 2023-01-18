import Icon from '@components/SvgIcon'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Img from '@/components/Img'
import { singerDetail } from '@/service/singer'
import type { ArtistType } from '@/type/common'

// interface IntroduceType {
//   id: number
//   name: string
//   cover: string
//   albumSize: number
//   musicSize: number
//   mvSize: number
//   identifyTag: string[]
//   briefDesc: string
//   [name: string]: any
// }

const Introduce: React.FC = (props) => {
  const [singerInfo, setSingerInfo] = useState<ArtistType | null>(null)
  const [imgUrl, setImgUrl] = useState<string>('')
  const { id } = useParams()
  useEffect(() => {
    const init = async (): Promise<void> => {
      const {
        data: {
          data: { user, artist },
        },
      } = await singerDetail(Number(id))

      if (artist !== null) setSingerInfo(artist)
      setImgUrl(user?.avatarUrl ?? artist?.cover)
    }
    void init()
  }, [id])

  return (
    <>
      <header className="flex my-10">
        <Img src={imgUrl} className="w-60 h-60 text-white rounded-full hover:shadow-lg" />
        <div className="pl-10 flex flex-col justify-between">
          <div className="text-4xl font-bold">{singerInfo?.name}</div>
          <div className="">
            <div className="font-bold">{singerInfo?.identifyTag?.join(',')}</div>
            <div className="mt-2 text-sm w-fit text-gray-700 cursor-pointer">
              {singerInfo?.musicSize}首歌曲 · {singerInfo?.albumSize}张专辑 · {singerInfo?.mvSize}
              个MV
            </div>
          </div>
          <div className="line-clamp-2 text-gray-600">{singerInfo?.briefDesc}</div>
          <div>
            <button className="flex justify-center items-center py-2 px-4 rounded-md bg-purple-200 text-purple-900 hover:scale-105 transition-all ease-linear">
              <Icon name="play" className="mr-2 w-4 h-4" />
              <span className="text-base font-bold">播放</span>
            </button>
          </div>
        </div>
      </header>
    </>
  )
}

export default Introduce
