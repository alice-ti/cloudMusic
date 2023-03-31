import Img from '@components/Img'
import type { AlbumType } from '@type/api'
import { formatDate } from '@utils/time'

const Album: React.FC<AlbumType> = (props: AlbumType) => {
  const { picUrl, name, publishTime, size, type } = props
  return (
    <section className="flex flex-row">
      <Img src={picUrl} className="w-40 rounded-lg" />
      <div className="ml-4 h-auto grid grid-rows-[2fr, 3fr]">
        <div className="font-bold text-xl self-center cursor-pointer hover:underline">{name}</div>
        <div className="text-gray-700 text-sm">
          <div className="">{formatDate(publishTime)}</div>
          <div className="">
            {type} · {size}首歌
          </div>
        </div>
      </div>
    </section>
  )
}
export default Album
