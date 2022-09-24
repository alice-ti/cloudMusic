import React, { HTMLAttributes } from 'react'

interface LoadMoreType extends HTMLAttributes<HTMLButtonElement> {
  text: string
}
const LoadMore: React.FC<LoadMoreType> = (props) => {
  const { text, className = '' } = props
  return (
    <button
      className={
        'px-6 py-2 font-bold block text-purple-400 rounded-md bg-fuchsia-100 hover:text-fuchsia-900 ' +
        className
      }
    >
      {text}
    </button>
  )
}

export default LoadMore
