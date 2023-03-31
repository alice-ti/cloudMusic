import Img from '@components/Img'
import { MvType } from '@type/common'
import { formatDate } from '@utils/time'

const Mv: React.FC<MvType> = (props: MvType) => {
  const { playCount, publishTime, name, imgurl } = props
  return (
    <section className="flex flex-row">
      <Img src={imgurl} className="h-40 aspect-[4/3] rounded-md" />
      <div className="ml-4 h-auto flex flex-col justify-between">
        <div className="text-2xl font-bold cursor-pointer hover:underline">{name}</div>
        <div className="text-gray-700">
          <div>{formatDate(publishTime)}</div>
          <div className="mt-2">播放人数 · {playCount}人</div>
        </div>
      </div>
    </section>
  )
}

export default Mv
