import Img from '@components/Img'
import React from 'react'

const PlayerInfo: React.FC = () => {
  return (
    <>
      <Img
        src="https://p3-passport.byteimg.com/img/user-avatar/ad089cb4989f2babb031e9f0d8b1fe21~100x100.awebp"
        className="w-14 rounded-md mr-4"
      />
      <div className="flex flex-col justify-between">
        <div>艾姬多娜加拿大</div>
        <div className="mt-2">aksdjaldjladjadjald</div>
      </div>
    </>
  )
}

export default PlayerInfo
