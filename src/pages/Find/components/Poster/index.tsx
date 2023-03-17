import _ from 'lodash'
import { HTMLAttributes, Reducer, useEffect, useReducer, useState } from 'react'

import Img from '@/components/Img'
import { finePlaylist } from '@/service/songList'
import type { PlaylistType } from '@/type/api'
import { getColor } from '@/utils/common'

const reducerAction: Reducer<PlaylistType | null, PlaylistType[]> = (
  state,
  action
): PlaylistType | null => {
  const li = _.sampleSize(action, 1)
  return li[0]
}

interface PosterProps extends HTMLAttributes<HTMLElement> {
  cat?: string
}

const Poster: React.FC<PosterProps> = (props: PosterProps) => {
  const { cat = '全部' } = props
  const [banner, dispatch] = useReducer(reducerAction, null)
  const [palette, setPattle] = useState<number[][]>([])

  useEffect(() => {
    const init = async (): Promise<void> => {
      const {
        data: { playlists },
      } = await finePlaylist({ cat })

      dispatch(playlists)
    }
    void init()
  }, [cat])

  useEffect(() => {
    const init = async (): Promise<void> => {
      const [, list] = await getColor(banner?.coverImgUrl ?? '', 3)
      setPattle(list)
    }
    void init()
  }, [banner])

  // FIXME 组件重新渲染时，会偶尔获取不到Color
  const bg = (color: number[][]): string => {
    const rag = color?.map((ele) => 'rgba(' + ele?.join(',') + ', 0.1)').join(',')

    return `linear-gradient(135deg,${rag})`
  }

  // 对比色
  const reverseColor = (color: number[]): number[] => color?.map((ele) => Math.abs(202 - ele))

  return (
    <section
      className="flex justify-between py-2 px-4 box-border rounded-md w-full h-40 relative"
      style={{ backgroundImage: bg(palette) }}
    >
      <aside
        className="absolute top-0 bottom-0 right-0 left-0 -z-10 blur-sm grayscale-[30%]"
        style={{
          backgroundImage: `url(${banner?.coverImgUrl ?? ''})`,
          backgroundSize: '100%',
          backgroundPosition: 'center',
        }}
      ></aside>
      <Img
        className="h-full aspect-square object-cover rounded-md"
        src={banner?.coverImgUrl ?? ''}
      />
      <div className="flex flex-col justify-center">
        <div
          className="font-bold text-xl"
          style={{
            color: `rgb(${reverseColor(palette[0])?.join(',')})`,
          }}
        >
          {cat !== '' ? cat : banner?.tags[0] ?? ''}
        </div>
        <div
          className="w-40 mt-4 line-clamp-1 font-text"
          style={{
            color: `rgb(${reverseColor(palette[0])?.join(',')})`,
          }}
        >
          {banner?.name}
        </div>
      </div>
    </section>
  )
}

export default Poster
