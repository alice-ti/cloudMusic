import { FC, HTMLAttributes, memo } from 'react'

import Album from '@/components/Album'
import Icon from '@/components/SvgIcon'
import type { ToplistType } from '@/type/api'

type PlayType = (id: number) => void

interface PlayListPropsType extends HTMLAttributes<HTMLDivElement> {
  list: ToplistType[]
  playDetail: PlayType
}

const PlayList: FC<PlayListPropsType> = ({ list, playDetail }) => {
  return (
    <div className="grid grid-cols-5 gap-x-5 gap-y-6 box-border">
      {list.map((ele, idx) => (
        <section className="mt-4" key={idx}>
          <Album
            src={ele.coverImgUrl}
            className="text-white"
            albumClick={() => playDetail(ele?.id)}
          />
          <div className="flex flex-row items-center my-2 text-gray-500">
            <Icon name="play" className="w-2 aspect-square mr-1" />
            {ele.playCount}
          </div>
          <div className="font-bold">{ele.name}</div>
        </section>
      ))}
    </div>
  )
}

export default memo(PlayList)
