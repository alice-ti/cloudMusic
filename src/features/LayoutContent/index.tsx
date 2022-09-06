import React, { useEffect, useState } from 'react'

import SwiperCard from '@/components/Swiper'
import { getBanner } from '@/service'

interface SwiperType {
  imageUrl: string
  [name: string]: unknown
}

const LayouContent: React.FC = () => {
  const [swiperList, setSwiperList] = useState<SwiperType[]>([])
  useEffect(() => {
    const bannerList = async (): Promise<void> => {
      const {
        data: { banners },
      } = await getBanner()
      setSwiperList(banners)
    }
    bannerList()
  }, [])
  return (
    <>
      <main className="flex-1 overflow-y-auto">
        <SwiperCard swiperList={swiperList} />
      </main>
    </>
  )
}

export default LayouContent
