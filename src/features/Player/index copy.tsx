import MusicPlayer from '@components/MusicPlayer'
import Slider from '@components/Slider'
import Icon from '@components/SvgIcon'
import React, { MouseEvent, useRef, useState } from 'react'
import { flushSync } from 'react-dom'

import PlayerInfo from './PlayerInfo'

interface PlayerProps {
  src: string
}

const Player: React.FC<PlayerProps> = (props) => {
  const { src } = props
  const playerRef = useRef<HTMLAudioElement | null>(null)
  const [isPlay, setIsPlay] = useState<boolean>(false)
  const [rate, setRate] = useState<number>(0)

  const isDraw = useRef<boolean>(false)

  const handleEnded = (): void => {
    console.log('播放完毕')
  }
  // slider 进度条改变
  const handleSliderChange = (val: number | number[]): void => {
    isDraw.current = true
    setRate(val as number)
  }

  const handleChange = (val: MouseEvent): void => {
    console.log('播放改变')
  }

  const handleTimeUpdate = (e: MouseEvent): void => {
    const { duration, currentTime } = playerRef.current as HTMLAudioElement
    const percent = Number((currentTime / duration).toFixed(6))
    if (!isDraw.current) setRate(percent * 100)
  }

  const handlePlay = (): void => {
    console.log('开始播放')
    void playerRef.current?.play()
  }
  const handlePause = (): void => {
    console.log('暂停播放')
    void playerRef.current?.pause()
  }
  const togglePlay = (): void => {
    setIsPlay(!isPlay)
    isPlay ? handlePlay() : handlePause()
  }
  const handleAfterChange = (val: number | number[]): void => {
    console.log(val)
    isDraw.current = false
    flushSync(() => setRate(val as number))
    const { duration } = playerRef.current as HTMLAudioElement
    if (playerRef.current !== null) {
      playerRef.current.currentTime = ((val as number) / 100) * duration
    }
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
      {/* <Progress
        rate={rate}
        className="!w-full !absolute left-0 top-0"
        onClick={handleProgressChange}
      /> */}
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
      <MusicPlayer
        ref={playerRef}
        src={src}
        onEnded={handleEnded}
        onChange={handleChange}
        onTimeUpdate={handleTimeUpdate}
        onPause={handlePause}
        onPlay={handlePlay}
      />
    </div>
  )
}

export default Player
