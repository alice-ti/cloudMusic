import React, { HTMLAttributes, memo, useState } from 'react'

import ButtonPlay from '@/components/ButtonPlay'

type AlbumClickType = () => void

interface AlbumPropsType extends HTMLAttributes<HTMLElement> {
  src: string
  albumClick?: AlbumClickType
}

const Album: React.FC<AlbumPropsType> = (props) => {
  const { src, albumClick, className = '' } = props
  const [showBtn, setShowBtn] = useState<boolean>(false)

  const handleEnter = (): void => setShowBtn(true)
  const handleLeave = (): void => setShowBtn(false)

  return (
    <div
      className={
        'flex justify-center items-center rounded-lg bg-slate-600 aspect-square shadow-sm hover:drop-shadow-xl ' +
        className
      }
      style={{ backgroundImage: `url(${src})`, backgroundSize: '100%' }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={() => (albumClick != null ? albumClick() : '')}
    >
      {showBtn && <ButtonPlay />}
    </div>
  )
}

export default memo(Album)
