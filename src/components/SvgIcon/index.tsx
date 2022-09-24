import React from 'react'

type Props = {
  name: string
  color?: string
  className?: string
} & React.SVGAttributes<SVGElement>

const Icon: React.FC<Props> = (props: Props) => {
  const { name, className = '' } = props
  const symbolId = `#icon-${name}`

  return (
    <svg className={`svg-icon w-6 h-6 ${className}`} aria-hidden="true" stroke="red" fill="green">
      <use href={symbolId} />
    </svg>
  )
}

export default Icon
