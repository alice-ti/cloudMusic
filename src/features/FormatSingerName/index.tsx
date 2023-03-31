import { FC, HTMLAttributes } from 'react'

import { SingerType } from '@/type/common'

interface FormatSingerPropsType extends HTMLAttributes<HTMLElement> {
  ar?: SingerType[]
}

const FormatSingerName: FC<FormatSingerPropsType> = (props) => {
  const { ar } = props
  return (
    <>
      {ar?.map((ele, idx) => (
        <a href={`/#/singer/${ele?.id}`} key={idx} className="hover:underline">
          {idx !== 0 ? ',' : ''}
          {ele?.name}
        </a>
      ))}
    </>
  )
}

export default FormatSingerName
