import React, { HTMLAttributes } from 'react'

interface CoverType extends HTMLAttributes<HTMLImageElement> {
  src: string
}

const Cover: React.FC<CoverType> = (props) => {
  const { className = '' } = props
  const {
    src = 'https://p1.music.126.net/a4qCDQjCjPmpz1EXZGYEhg==/109951163869221016.jpg?param=1024y1024',
  } = props
  return (
    <>
      <img src={src} className={'rounded-2xl shadow-xl ' + className} />
    </>
  )
}

export default Cover
