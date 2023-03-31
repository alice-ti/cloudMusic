import React from 'react'

interface Props extends React.SVGAttributes<SVGElement> {
  name: string
  color?: string
  className?: string
}

const Icon: React.FC<Props> = (props: Props) => {
  const { name, className = '', onClick } = props
  const symbolId = `#icon-${name}`

  return (
    <svg
      className={`svg-icon ${className === '' ? 'w-6 aspect-[1/1]' : className}`}
      aria-hidden="true"
      stroke="red"
      fill="green"
      onClick={onClick}
    >
      <use href={symbolId} />
    </svg>
  )
}

export default Icon
