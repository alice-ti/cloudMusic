import Icon from '@components/SvgIcon'
import React, { HTMLAttributes } from 'react'

interface ButtonPlayType extends HTMLAttributes<HTMLButtonElement> {}
const ButtonPlay: React.FC<ButtonPlayType> = (props) => {
  const { className = '' } = props
  return (
    <button
      className={`rounded-full flex justify-center items-center button w-1/4 aspect-[1/1] select-none backdrop-blur hover:bg-gray-200/30 transition-all ${className}`}
    >
      <Icon name="play" className="w-1/2 h-1/2" />
    </button>
  )
}
export default ButtonPlay
