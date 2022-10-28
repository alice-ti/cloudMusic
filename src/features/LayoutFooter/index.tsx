import Player from '@features/Player'
import React from 'react'

const LayoutFooter: React.FC = () => {
  return (
    <>
      <footer className="h-20 shadow-[0_0_10px_0_rgba(0,0,0,0.3)]">
        <Player />
      </footer>
    </>
  )
}

export default LayoutFooter
