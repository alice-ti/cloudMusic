import React, { HTMLAttributes, useState } from 'react'

import ButtonPlay from '@/components/ButtonPlay'

interface AlbumPropsType extends HTMLAttributes<HTMLButtonElement> {
  src: string
}

const Album: React.FC<AlbumPropsType> = (props) => {
  const { src, className = '' } = props
  const [showBtn, setShowBtn] = useState<boolean>(false)
  const handleEnter = (): void => setShowBtn(true)
  const handleLeave = (): void => setShowBtn(false)
  return (
    <div
      className={'rounded-xl bg-slate-600 aspect-square hover:shadow-xl ' + className}
      style={{ backgroundImage: `url(${src})`, backgroundSize: '100%' }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {showBtn && <ButtonPlay size={'md'} />}
    </div>
  )
}
export default Album
