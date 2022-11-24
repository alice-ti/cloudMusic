import Img from '@components/Img'
import Icon from '@components/SvgIcon'
// import { personalFM } from '@service/person'

const RecommFM: React.FC = () => {
  // const FM = async () => {
  //   const {
  //     data: { data: FMList },
  //   } = await personalFM()
  // }
  // void FM()

  return (
    <>
      <div className="select-none w-[30rem] h-[14rem] p-4 bg-gray-300 rounded-2xl flex flex-row">
        <Img
          className="h-full aspect-square rounded-xl"
          src="http://p3.music.126.net/1iviscxYPqA3nzYDJaV1aQ==/109951164853199947.jpg"
        />
        <div className="ml-4 flex flex-col justify-between">
          <div className="font-bold text-2xl text-white">Love Story meets Viva La Vida</div>
          <div className="mb-8 text-white font-bold hover:underline cursor-pointer">
            Jon Schmidt
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
