import React, { HTMLAttributes } from 'react'

interface CoverType extends HTMLAttributes<HTMLImageElement> {
  src: string
}

const Cover: React.FC<CoverType> = (props) => {
  const { className = '' } = props
  const { src = '' } = props
  return (
    <>
      <img src={src} className={'rounded-2xl shadow-xl hover:shadow-2xl ' + className} />
    </>
  )
}

export default Cover
