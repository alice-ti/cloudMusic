import React, { Reducer, useEffect, useReducer, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Playlist from '@/features/PlayList'
import { playlistCatlist, topPlaylist } from '@/service/songList'
import type { ToplistType } from '@/type/api'

import CateCascade from './components/CateCascade'
import Poster from './components/Poster'

export interface CateType {
  category: number
  name: string
  hot: boolean
  [name: string]: unknown
}

export interface ClassifyType {
  cate: {
    [name: string]: string
  }
  sub: CateType[]
}

const reducerAction: Reducer<ClassifyType, ClassifyType> = (state, action) => {
  return action
}

// 发现-歌单
const Find: React.FC = () => {
  const navigate = useNavigate()
  const [sheetlist, setSheetlist] = useState<ToplistType[]>([])
  const [cate, dispatch] = useReducer(reducerAction, { sub: [], cate: {} })
  const [tag, setTag] = useState<string>('') // 当前选择分类

  // 获取分类歌单
  const getTopSheet = async (params: { cat: string }): Promise<void> => {
    const {
      data: { playlists },
    } = await topPlaylist(params)
    setSheetlist(playlists)
  }

  // 切换歌单
  const changeTag = (params: { cat: string }): void => {
    console.log(params)
    setTag(params.cat)
    void getTopSheet(params)
  }

  // to歌单详情
  const goPlaylist = (id: number): void => navigate(`/playlist/${id}`)

  useEffect(() => {
    const init = async (): Promise<void> => {
      const {
        data: { categories, sub },
      } = await playlistCatlist()

      dispatch({ sub, cate: categories })
    }
    void init()
    void getTopSheet({ cat: '全部' })
  }, [])

  return (
    <div className="flex-1 overflow-y-auto xl:px-30 px-20 pt-20 box-border">
      <Poster cat={tag} />

      <CateCascade tag={tag} cate={cate} onUpdateTag={changeTag} />
      <Playlist list={sheetlist} playDetail={(e) => goPlaylist(e)} />
    </div>
  )
}

export default Find
