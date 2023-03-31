import React, { HTMLAttributes } from 'react'

interface ProgressType extends HTMLAttributes<HTMLElement> {
  type?: 'col' | 'row'
  rate: number
}

const Progress: React.FC<ProgressType> = (props) => {
  const { rate, className = '', onClick } = props
  return (
    <>
      <div
        className={className + ' relative w-[60%] h-1 rounded-sm bg-gray-100 cursor-pointer'}
        onClick={onClick}
      >
        <div
          className="absolute h-full rounded-sm bg-fuchsia-800 pointer-events-none"
          style={{ width: rate.toString() + '%' }}
        ></div>
      </div>
    </>
  )
}

export default Progress
