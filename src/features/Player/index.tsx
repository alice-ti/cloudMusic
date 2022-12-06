import Slider from '@components/Slider'
import React, { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'

import player from '@/application/player'

import PlaryerControl from './PlayerControl'
import PlayerInfo from './PlayerInfo'
import PlayerSetting from './PlayerSetting'

const Player: React.FC = (props) => {
  const [isPlay, setIsPlay] = useState<boolean>(false)
  const [rate, setRate] = useState<number>(0)

  const isDraw = useRef<boolean>(false) // 拖动
  useEffect(() => {
    // setInterval(() => console.log('===>', player.progress), 1000)
  }, [])

  // slider 进度条改变
  const handleSliderChange = (val: number | number[]): void => {
    isDraw.current = true
    setRate(val as number)
  }

  const handlePlay = (): void => {
    console.log('开始播放')
    player.play()
  }
  const handlePause = (): void => {
    console.log('暂停播放')
    player.pause()
  }
  const togglePlay = (): void => {
    setIsPlay(player.playing)
    player.playing ? handlePause() : handlePlay()
  }
  const handleAfterChange = (val: number | number[]): void => {
    console.log(val)
    isDraw.current = false
    flushSync(() => setRate(val as number))
  }

  return (
    <div className="relative px-10 box-border h-full flex flex-row items-center">
      <PlayerInfo />
      <PlaryerControl isPlay={isPlay} togglePlay={togglePlay} />
      <PlayerSetting />
      <Slider
        className="!w-full !p-0 !h-1 !absolute left-0 top-0"
        rate={rate}
        Change={handleSliderChange}
        onAferChange={handleAfterChange}
        trackStyle={{ background: '#862e9c' }}
        handleStyle={{
          background: '#f5f6fa',
          // height: '100%',
          // marginTop: '0',
          border: '2px solid #862e9c',
          boxShadow: '0 0 2px 1px gray',
          transform: 'translateX(-100%)',
          opacity: '1',
          width: 'auto',
          aspectRatio: '1/1',
        }}
      />
    </div>
  )
}

export default Player
