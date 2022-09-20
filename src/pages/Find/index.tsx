import React, { useEffect, useState } from 'react'

import SheetList from '@/features/SheetList'
import { playlistCatlist, topPlaylist } from '@/service/songSheet'

let isInit = false

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

interface CateCascadeType {
  updateSheet: Function
  cateList: any[]
  subCateList: {
    [name: number]: any[]
  }
}

// 分类选择
const CateCascade: React.FC<CateCascadeType> = (props) => {
  const { cateList, subCateList, updateSheet } = props
  const [curr, setCurr] = useState<string>('')

  // 点击事件
  const handleClick = (item: any, index: string): void => {
    updateSheet({ cat: item.name })
    setCurr(index)
  }
  return (
    <main className="py-4 bg-gray-300 select-none">
      {Object.values(subCateList).map((ele: any, idx) => (
        <ul className="mt-4" key={idx}>
          <li className="flex" key={1}>
            <span className="text-2xl w-24 px-3.5 py-1 font-bold rounded-md text-[#4e4e4f]">
              {cateList[idx]}
            </span>
            <ul className="flex-1 flex flex-wrap">
              {ele.map((item: any, index: number) => (
                <li
                  className={
                    'my-1 mr-3 px-3.5 py-1 font-bold text-xl rounded-md cursor-pointer text-[#7a7a7b] hover:bg-fuchsia-100 hover:text-fuchsia-900 ' +
                    (curr === idx.toString() + index.toString()
                      ? 'bg-fuchsia-100 text-fuchsia-900'
                      : '')
                  }
                  onClick={() => handleClick(item, idx.toString() + index.toString())}
                  key={index}
                >
                  {item?.name}
                </li>
              ))}
            </ul>
          </li>
        </ul>
      ))}
    </main>
  )
}

// 发现-歌单
const Find: React.FC = () => {
  const [isShowSub, setIsShowSub] = useState<boolean>(false) // 是否展示二级分类
  const [cate, setCate] = useState<string[]>([]) // 一级分类
  const [subCate, setSubCate] = useState<any[]>([]) // 二级分类
  const [sheetlist, setSheetlist] = useState<any[]>([])

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
    <>
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
      {isShowSub && <CateCascade subCateList={subCate} cateList={cate} updateSheet={changeSheet} />}
      <SheetList list={sheetlist} />
    </>
  )
}

export default Find
