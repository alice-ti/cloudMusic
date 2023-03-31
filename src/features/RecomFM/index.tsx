import Img from '@components/Img'
import Icon from '@components/SvgIcon'
import FormatSingerName from '@features/FormatSingerName'
import { useSelector } from 'react-redux'

import { RootState } from '@/store'
// import { personalFM } from '@service/person'

const RecommFM: React.FC = () => {
  // const FM = async () => {
  //   const {
  //     data: { data: FMList },
  //   } = await personalFM()
  // }
  // void FM()

  const songInfo = useSelector((state: RootState) => state.player.songInfo)

  return (
    <>
      <div className="w-full aspect-[3/1] p-4 bg-gray-300 rounded-2xl flex flex-row">
        <Img className="h-full aspect-square rounded-xl" src={songInfo?.al.picUrl ?? ''} />
        <div className="ml-4 flex flex-col justify-between">
          <div className="font-bold text-2xl text-white">{songInfo?.name}</div>
          <div className="mb-8 text-white font-bold hover:underline cursor-pointer">
            <FormatSingerName ar={songInfo?.ar} />
          </div>
          <div className="flex flex-row items-center">
            <Icon
              name={'play'}
              className="p-2 cursor-pointer w-10 aspect-square hover:bg-gray-400/50 hover:rounded-md"
            />
            <Icon
              name="next"
              className="p-2 cursor-pointer w-10 aspect-square hover:bg-gray-400/50 hover:rounded-md"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default RecommFM
