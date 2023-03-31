import React, { memo } from 'react'

import player from '@/application/player'
import Icon from '@/components/SvgIcon'

interface PlayerControlProps {
  isPlay: boolean
  togglePlay: React.MouseEventHandler
}

const PlaryerControl: React.FC<PlayerControlProps> = (props) => {
  const { isPlay, togglePlay } = props
  const nextTrack = (): void => {
    player.playNextTrack()
    console.log('next')
  }

  const prevTrack = (): void => {
    player.playPrevTrack()
    console.log('prev')
  }

  return (
    <>
      <div className="flex-1 flex flex-row justify-center items-center">
        <Icon
          name="previous"
          className="p-1 box-content rounded-md cursor-pointer w-6 aspect-square hover:bg-gray-200/70"
          onClick={prevTrack}
        />
        <Icon
          name={isPlay ? 'play' : 'pause'}
          className="p-1 box-content rounded-md mx-4 cursor-pointer w-8 aspect-square hover:bg-gray-200/70"
          onClick={togglePlay}
        />
        <Icon
          name="next"
          className="p-1 box-content rounded-md cursor-pointer w-6 aspect-square hover:bg-gray-200/70"
          onClick={nextTrack}
        />
      </div>
    </>
  )
}

export default memo(PlaryerControl)
