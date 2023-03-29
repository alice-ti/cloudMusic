import React, { HTMLAttributes, useEffect, useState } from 'react'

import { getColor } from '@/utils/common'

interface CoverType extends HTMLAttributes<HTMLImageElement> {
  src: string
}

const Cover: React.FC<CoverType> = (props) => {
  const { className = '', src = '' } = props
  const [pattle, setPattle] = useState<number[][]>()

  useEffect(() => {
    const init = async (): Promise<void> => {
      const [, list] = await getColor(src, 3)
      setPattle(list)
    }

    void init()
    console.log('cover', pattle)
  }, [src])

  return (
    <>
      <img src={src} className={'rounded-2xl shadow-xl hover:shadow-2xl ' + className} />
    </>
  )
}

export default Cover
