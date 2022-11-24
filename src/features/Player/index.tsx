import Slider from '@components/Slider'
import Icon from '@components/SvgIcon'
import React, { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'

import player from '@/application/player'

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
    <div className="relative h-full flex flex-row items-center">
      <PlayerInfo />
      <div className="flex flex-row items-center">
        <Icon name="previous" className="cursor-pointer w-6 aspect-square" />
        <Icon
          name={isPlay ? 'play' : 'pause'}
          className="cursor-pointer w-8 aspect-square"
          onClick={togglePlay}
        />
        <Icon name="next" className="cursor-pointer w-6 aspect-square" />
      </div>
      <PlayerSetting />
      <Slider
        className="!w-full !p-0 !h-1 !absolute left-0 top-0"
        rate={rate}
        Change={handleSliderChange}
        onAferChange={handleAfterChange}
        trackStyle={{ background: '#862e9c' }}
        handleStyle={{
          background: 'transparent',
          border: 'none',
          boxShadow: 'none',
          transform: 'translateX(-100%)',
          marginTop: '0',
          opacity: '1',
          height: '100%',
          width: 'auto',
          aspectRatio: '1/1',
        }}
      />
    </div>
  )
}

export default Player
