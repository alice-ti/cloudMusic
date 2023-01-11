import React, { useState } from 'react'

interface CateCascadeType {
  updateSheet: Function
  cateList: any[]
  isShow?: boolean
  subCateList: {
    [name: number]: any[]
  }
}
// 分类选择
const CateCascade: React.FC<CateCascadeType> = (props) => {
  const { cateList, subCateList, updateSheet, isShow = false } = props
  const [curr, setCurr] = useState<string>('')

  // 点击事件
  const handleClick = (item: any, index: string): void => {
    updateSheet({ cat: item.name })
    setCurr(index)
  }
  return (
    <main className={'py-4 bg-gray-300 select-none ' + (isShow ? '' : 'hidden')}>
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

export default CateCascade
