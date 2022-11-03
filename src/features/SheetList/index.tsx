import { FC, HTMLAttributes } from 'react'

import Album from '@/components/Album'

type PlayType = (id: number) => void
interface ListType {
  id: number
  coverImgUrl: string
  [name: string]: unknown
}

interface PropListType extends HTMLAttributes<HTMLDivElement> {
  list: ListType[]
  playDetail: PlayType
}

const SheetList: FC<PropListType> = ({ list, playDetail }) => {
  return (
    <div className="grid grid-cols-5 gap-x-4 gap-y-3 px-8 box-border">
      {list.map((ele, idx) => (
        <Album
          src={ele.coverImgUrl}
          className="text-white"
          albumClick={() => playDetail(ele?.id)}
          key={idx}
        />
      ))}
    </div>
  )
}

export default SheetList
