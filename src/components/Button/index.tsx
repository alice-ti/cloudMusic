import Icon from '@components/SvgIcon'
import React, { HTMLAttributes } from 'react'

interface ButtonPropsType extends HTMLAttributes<HTMLButtonElement> {
  text?: string
  icon?: string
}
const Button: React.FC<ButtonPropsType> = (props) => {
  const { text, icon = '', className = '', onClick } = props
  return (
    <button
      className={
        'px-6 py-2 flex justify-center items-center font-bold rounded-md text-purple-800 bg-fuchsia-100 hover:text-fuchsia-900 hover:shadow-sm select-none ' +
        className
      }
      onClick={onClick}
    >
      <Icon name="play" className={icon === '' ? 'hidden' : 'mr-2 h-4 aspect-square'} />
      {text}
    </button>
  )
}

export default Button
