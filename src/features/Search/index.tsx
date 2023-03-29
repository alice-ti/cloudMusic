import { ChangeEvent, FC, KeyboardEvent, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import Icon from '@/components/SvgIcon'

const Search: FC = () => {
  const navigate = useNavigate()
  const searchDom = useRef('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const val = e.target.value
    searchDom.current = val
    console.log(val)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    const { key } = e
    if (key === 'Enter') {
      navigate('search?q=' + encodeURIComponent(searchDom.current))
    }
  }

  return (
    <section className="flex items-center">
      <div className="h-1/2 flex items-center rounded-md text-sm text-gray-500 bg-gray-100/80">
        <Icon name="search" className="px-2 box-content h-1/2 aspect-square" />
        <input
          className="h-full bg-transparent outline-none placeholder:text-slate-400 placeholder:text-sm placeholder:font-bold"
          type="text"
          placeholder="搜索"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
    </section>
  )
}

export default Search
