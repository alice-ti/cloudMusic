import MusicPlayer from '@components/MusicPlayer'
import Progress from '@components/Progress'
import Icon from '@components/SvgIcon'
import React, { MouseEvent, useRef, useState } from 'react'

import PlayerInfo from './PlayerInfo'

const src =
  'https://webfs.ali.kugou.com/202210271900/f2fea62ad0cf6e23ab7fa3bc3c962384/KGTX/CLTX001/cefc0bb49e2cc073c540909aa5bcb164.mp3'
const Player: React.FC = () => {
  const playerRef = useRef<HTMLAudioElement | null>(null)
  const [isPlay, setIsPlay] = useState<boolean>(false)
  const [rate, setRate] = useState<number>(0)
  const handleEnded = (): void => {
    console.log('播放完毕')
  }
  const handleChange = (): void => {
    console.log('播放改变')
  }
  const handleTimeUpdate = (e: MouseEvent): void => {
    const { duration, currentTime } = playerRef.current as HTMLAudioElement
    const percent = Number((currentTime / duration).toFixed(6))
    setRate(percent * 100)
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
  const handleProgressChange = (e: MouseEvent<HTMLElement>): void => {
    const { pageX } = e
    const { offsetWidth } = e.target as HTMLElement
    const { duration } = playerRef.current as HTMLAudioElement
    const percent = Number((pageX / offsetWidth).toFixed(6))
    setRate(percent * 100)
    if (playerRef.current !== null) playerRef.current.currentTime = percent * duration
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
      <Progress
        rate={rate}
        className="!w-full !absolute left-0 top-0"
        onClick={handleProgressChange}
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
