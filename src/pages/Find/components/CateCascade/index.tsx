import React, { Reducer, useReducer, useState } from 'react'

import type { CateType, ClassifyType } from '../..'
import CateButton from '../CateButton'

interface CateCascadeType {
  onUpdateTag: Function
  tag: string
  cate: ClassifyType
}

interface CurrType {
  cate: string | string[]
  sub: string
}

// 格式化二级分类
const formatSublist = (curr: CurrType, cate: ClassifyType): any => {
  const list = cate?.sub ?? []
  const obj: {
    [name: string]: CateType[]
  } = {}
  list
    .filter((ele) => {
      if (curr.cate === '') return ele
      if (curr.cate === cate.cate[ele.category]) return ele
      else return false
    })
    .forEach((ele) => {
      const key = ele.category.toString()
      if (typeof obj[key] === 'undefined') {
        obj[key] = []
        obj[key].push(ele)
      } else obj[key].push(ele)
    })

  return obj
}

const currReducer: Reducer<CurrType, { type: 'cate' | 'sub'; val: number | string | string[] }> = (
  state,
  action
) => {
  const { type, val } = action
  if (type === 'cate') state.cate = val as string
  else if (type === 'sub') state.sub = val as string

  return {
    ...state,
  }
}

// 分类选择
const CateCascade: React.FC<CateCascadeType> = (props) => {
  const { cate, onUpdateTag, tag } = props

  const [isShowSub, setIsShowSub] = useState<boolean>(false)
  const [curr, setCurr] = useReducer(currReducer, { cate: '', sub: '' })

  const handleSubToggle = (txt: string): void => {
    if (txt === curr.cate || !isShowSub) setIsShowSub(!isShowSub)
    const index = Object.keys(cate?.cate).findIndex((ele) => cate.cate[ele] === txt)

    if (index !== -1) setCurr({ type: 'cate', val: cate.cate[index] })
    else setCurr({ type: 'cate', val: '' })
  }

  // 点击事件
  const handleClick = (item: CateType): void => {
    onUpdateTag({ cat: item.name })
  }

  return (
    <>
      <header className="my-6 flex flex-row">
        {Object.values(cate?.cate)?.map((ele, idx) => (
          <CateButton
            text={ele}
            active={ele === curr.cate}
            subToggle={(e) => handleSubToggle(ele)}
            key={idx}
          />
        ))}
        <CateButton text="..." active={curr.cate === ''} subToggle={(e) => handleSubToggle('')} />
      </header>
      <main
        className={
          'py-4 px-4 box-border rounded-md bg-gray-300/70 select-none ' +
          (isShowSub ? '' : 'hidden')
        }
      >
        {Object.values<CateType[]>(formatSublist(curr, cate))?.map((ele: CateType[], idx) => (
          <ul className="mt-2" key={idx}>
            <li className="flex">
              <span className="text-2xl w-24 px-3.5 py-1 font-bold rounded-md text-[#4e4e4f]">
                {cate.cate[ele[0]?.category]}
              </span>
              <ul className="flex-1 flex flex-wrap">
                {ele.map((item: CateType, index: number) => (
                  <li
                    className={
                      'my-1 mr-3 px-3.5 py-1 font-bold text-xl rounded-md cursor-pointer text-[#7a7a7b] hover:bg-fuchsia-100 hover:text-fuchsia-900 ' +
                      (tag === item.name ? 'bg-fuchsia-100 text-fuchsia-900' : '')
                    }
                    onClick={() => handleClick(item)}
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
    </>
  )
}

export default CateCascade
