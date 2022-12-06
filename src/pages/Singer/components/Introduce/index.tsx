import Icon from '@components/SvgIcon'

import Img from '@/components/Img'

export interface IntroduceType {
  id: number
  name: string
  albumSize: number
  musicSize: number
  mvSize: number
  identifyTag: string[]
  briefDesc: string
  [name: string]: any
}

interface SingerInfoType {
  singerInfo: IntroduceType
  coverImgUrl: string
}

const Introduce: React.FC<SingerInfoType> = (props: SingerInfoType) => {
  const {
    coverImgUrl,
    singerInfo: { name, briefDesc, identifyTag, mvSize, musicSize, albumSize },
  } = props

  return (
    <>
      <header className="flex my-10">
        <Img src={coverImgUrl} className="w-60 h-60 text-white rounded-full hover:shadow-lg" />
        <div className="pl-10 flex flex-col justify-between">
          <div className="text-4xl font-bold">{name}</div>
          <div className="">
            <div className="font-bold">{identifyTag.join(',')}</div>
            <div className="mt-2 text-sm w-fit text-gray-700 cursor-pointer">{`${musicSize}首歌曲 · ${albumSize}张专辑 · ${mvSize}个MV`}</div>
          </div>
          <div className="line-clamp-3 text-gray-600">{briefDesc}</div>
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
