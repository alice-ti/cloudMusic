import './index.css'

import play from '@assets/svg/play.svg'
import React, { HTMLAttributes } from 'react'

type SizeType = 'md' | 'bg' | 'sm'

interface SizeClassType {
  box: string
  play: string
}

interface ButtonPlayType extends HTMLAttributes<HTMLButtonElement> {
  size?: SizeType
}

const ButtonPlay: React.FC<ButtonPlayType> = (props) => {
  const { size = 'md' } = props
  const getSize = (size: SizeType): SizeClassType => {
    let obj = { box: '', play: '' }
    if (size === 'bg') obj = { box: 'h-16 w-16', play: 'h-8 w-8' }
    if (size === 'md') obj = { box: 'h-12 w-12', play: 'h-6 w-6' }
    if (size === 'sm') obj = { box: 'h-8 w-8', play: 'h-4 w-4' }
    return obj
  }
  return (
    <button
      className={
        `rounded-full bg-gray-200 flex justify-center items-center button ` + getSize(size)?.box
      }
    >
      <img src={play} className={getSize(size)?.play} />
    </button>
  )
}
export default ButtonPlay
