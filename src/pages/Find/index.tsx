import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Playlist from '@/features/PlayList'
import { playlistCatlist, topPlaylist } from '@/service/songList'
import type { ToplistType } from '@/type/api'

import CateBtn from './components/CateBtn'
import CateCascade from './components/CateCascade'

// 格式化二级分类
const formatSub = (list: Array<{ category: number; [name: string]: any }>): any => {
  const obj: {
    [name: string]: any
  } = {}
  list.forEach((ele) => {
    const key = ele.category.toString()
    if (typeof obj[key] === 'undefined') {
      obj[key] = []
      obj[key].push(ele)
    } else obj[key].push(ele)
  })
  return obj
}

// 发现-歌单
const Find: React.FC = () => {
  const navigate = useNavigate()
  const [isShowSub, setIsShowSub] = useState<boolean>(false) // 是否展示二级分类
  const [cate, setCate] = useState<string[]>([]) // 一级分类
  const [subCate, setSubCate] = useState<any[]>([]) // 二级分类
  const [sheetlist, setSheetlist] = useState<ToplistType[]>([])

  // 展示二级分类
  const handleSubToggle = (): void => setIsShowSub(!isShowSub)

  // 获取分类歌单
  const getTopSheet = async (params: { cat: string }): Promise<void> => {
    const {
      data: { playlists },
    } = await topPlaylist(params)
    setSheetlist(playlists)
  }

  // 切换歌单
  const changeSheet = (params: { cat: string }): void => {
    console.log(params)
    void getTopSheet(params)
  }

  // to歌单详情
  const goPlaylist = (id: number): void => navigate(`/playlist/${id}`)

  useEffect(() => {
    const init = async (): Promise<void> => {
      const {
        data: { categories, sub },
      } = await playlistCatlist()

      const cateList = Object.values(categories)
      cateList.push('...')
      setCate(cateList)

      setSubCate(formatSub(sub))
    }
    void init()
    void getTopSheet({ cat: '全部' })
  }, [])

  return (
    <div className="flex-1 overflow-y-auto xl:px-30 px-20 pt-20 box-border">
      <header className="mb-6 flex flex-row">
        {cate.length > 0 &&
          cate.map((ele, idx, _arr) => (
            <CateBtn
              text={ele}
              active={idx === _arr.length - 1 ? isShowSub : false}
              subToggle={idx === _arr.length - 1 ? handleSubToggle : () => {}}
              key={idx}
            />
          ))}
      </header>
      <CateCascade
        subCateList={subCate}
        cateList={cate}
        updateSheet={changeSheet}
        isShow={isShowSub}
      />
      <Playlist list={sheetlist} playDetail={(e) => goPlaylist(e)} />
    </div>
  )
}

export default Find
