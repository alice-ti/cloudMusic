import RecomSongSheet from '@features/RecomSongSheet'
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
    void bannerList()
  }, [])
  return (
    <>
      <main className="flex-1 overflow-y-auto">
        <SwiperCard swiperList={swiperList} />
        <RecomSongSheet />
      </main>
    </>
  )
}

export default LayouContent
