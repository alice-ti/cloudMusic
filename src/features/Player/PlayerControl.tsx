import React from 'react'

import player from '@/application/player'
import Icon from '@/components/SvgIcon'

interface PlayerControlProps {
  isPlay: boolean
  togglePlay: React.MouseEventHandler
}

const PlaryerControl: React.FC<PlayerControlProps> = (props) => {
  const { isPlay, togglePlay } = props
  const nextTrack = (): void => {
    player._playNextTrack()
    console.log('next')
  }
  return (
    <>
      <div className="flex-1 flex flex-row justify-center items-center">
        <Icon name="previous" className="cursor-pointer w-6 aspect-square" />
        <Icon
          name={isPlay ? 'play' : 'pause'}
          className="mx-4 cursor-pointer w-8 aspect-square"
          onClick={togglePlay}
        />
        <Icon name="next" className="cursor-pointer w-6 aspect-square" onClick={nextTrack} />
      </div>
    </>
  )
}

export default PlaryerControl
