import React, { ForwardedRef, forwardRef, HTMLAttributes, ReactEventHandler } from 'react'

interface AudioType extends HTMLAttributes<HTMLAudioElement> {
  src: string
  onChange?: ReactEventHandler
  onEnded?: ReactEventHandler
  onPause?: ReactEventHandler
  onPlay?: ReactEventHandler
  onTimeUpdate?: ReactEventHandler
}

const MusicPlayer = forwardRef((props: AudioType, ref: ForwardedRef<HTMLAudioElement>) => {
  const { src, onChange, onEnded, onTimeUpdate, onPause, onPlay } = props
  return (
    <>
      <audio
        controls
        ref={ref}
        src={src}
        onChange={onChange}
        onEnded={onEnded}
        onTimeUpdate={onTimeUpdate}
        onPause={onPause}
        onPlay={onPlay}
      />
    </>
  )
})

export default MusicPlayer
