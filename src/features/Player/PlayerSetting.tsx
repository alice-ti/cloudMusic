import { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Icon from '@/components/SvgIcon'
import { RootState } from '@/store'
import { switchPlayMode } from '@/store/features/player'

// 0-顺序播放 1-列表循环 2-随机播放 3-单曲循环 4-心动模式
const ModeMap: { [name: number]: string } = {
  0: 'mode-order',
  1: 'mode-list',
  2: 'mode-random',
  3: 'mode-single',
}

const PlayerSetting: React.FC = () => {
  const playMode = useSelector((state: RootState) => state.player.playMode)
  const dispatch = useDispatch()
  const changePlayMode = (): void => {
    let num = playMode
    if (num < Object.keys(ModeMap).length - 1) num += 1
    else num = 0
    dispatch(switchPlayMode(num))
  }

  return (
    <>
      <div className="min-w-[15%] flex flex-row justify-center">
        <Icon
          name={ModeMap[playMode]}
          className="w-6 aspect-square mx-2 hover:cursor-pointer p-1 box-content rounded-md hover:bg-gray-200/70"
          onClick={changePlayMode}
        />
        <Icon
          name="volume"
          className="w-6 aspect-square mx-2 hover:cursor-pointer p-1 box-content rounded-md hover:bg-gray-200/70"
        />
        <Icon
          name="fold"
          className="w-6 aspect-square mx-2 cursor-pointer p-1 box-content  rounded-md hover:bg-gray-200/70"
        />
      </div>
    </>
  )
}

export default memo(PlayerSetting)
