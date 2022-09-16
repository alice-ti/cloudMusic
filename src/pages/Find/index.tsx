import React, { useEffect, useState } from 'react'

import { playlistCatlist } from '@/service/songSheet'

let isInit = false

interface CateBtnType {
  text: string
}
// 分类按钮
const CateBtn: React.FC<CateBtnType> = ({ text }) => (
  <button className="mr-3 px-3.5 py-1 rounded-md bg-[#f5f5f5] text-[#7a7a7b] font-bold text-xl hover:bg-fuchsia-100 hover:text-fuchsia-900">
    {text}
  </button>
)

interface CateCascadeType {
  cateList: any[]
  subCateList: {
    [name: number]: any[]
  }
}

// 分类选择
const CateCascade: React.FC<CateCascadeType> = (props: any) => {
  const { cateList, subCateList } = props
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
                  className="my-1 mr-3 px-3.5 py-1 font-bold text-xl rounded-md cursor-pointer text-[#7a7a7b] hover:bg-fuchsia-100 hover:text-fuchsia-900"
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
  const [cate, setCate] = useState<string[]>([])
  const [subCate, setSubCate] = useState<any[]>([])

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
    if (!isInit) void init()
  }, [])

  return (
    <>
      <div>A</div>
      <header className="flex flex-row">
        {cate.length > 0 && cate.map((ele, idx) => <CateBtn text={ele} key={idx} />)}
      </header>
      <CateCascade subCateList={subCate} cateList={cate} />
    </>
  )
}

export default Find
