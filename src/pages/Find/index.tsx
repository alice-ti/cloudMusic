import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import SheetList from '@/features/SheetList'
import { playlistCatlist, topPlaylist } from '@/service/songSheet'

import CateCascade from './components/CateCascade'

let isInit = false

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

interface CateBtnType {
  text: string
  active: boolean
  subToggle: React.MouseEventHandler
}
// 分类按钮
const CateBtn: React.FC<CateBtnType> = ({ text, active, subToggle }) => (
  <button
    className={
      'mr-3 px-3.5 py-1 rounded-md bg-[#f5f5f5] text-[#7a7a7b] font-bold text-xl hover:bg-fuchsia-100 hover:text-fuchsia-900' +
      (active ? ' bg-fuchsia-100 text-fuchsia-900' : '')
    }
    onClick={subToggle}
  >
    {text}
  </button>
)

// 发现-歌单
const Find: React.FC = () => {
  const navigate = useNavigate()
  const [isShowSub, setIsShowSub] = useState<boolean>(false) // 是否展示二级分类
  const [cate, setCate] = useState<string[]>([]) // 一级分类
  const [subCate, setSubCate] = useState<any[]>([]) // 二级分类
  const [sheetlist, setSheetlist] = useState<any[]>([])

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
  const goPlaylist = (id: number): void => {
    console.log(id)
    navigate(`/playlist/${id}`)
  }

  useEffect(() => {
    const init = async (): Promise<void> => {
      isInit = true
      const {
        data: { categories, sub },
      } = await playlistCatlist()

      const cateList = Object.values(categories)
      cateList.push('...')
      setCate(cateList)

      setSubCate(formatSub(sub))
    }
    if (!isInit) {
      void init()
      void getTopSheet({ cat: '欧美' })
    }
  }, [])

  return (
    <div className="xl:px-20 box-border">
      <div>A</div>
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
      <SheetList list={sheetlist} playDetail={(e) => goPlaylist(e)} />
    </div>
  )
}

export default Find
