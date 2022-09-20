import { FC } from 'react'

import Album from '@/components/Album'

interface ListType {
  id: number
  coverImgUrl: string
  [name: string]: any
}

interface PropListType {
  list: ListType[]
}

const SheetList: FC<PropListType> = ({ list }) => {
  return (
    <div className="grid grid-cols-5 gap-x-4 gap-y-1.5 px-8 box-border">
      {list.map((ele, idx) => (
        <Album src={ele.coverImgUrl} key={idx} />
      ))}
    </div>
  )
}

export default SheetList
