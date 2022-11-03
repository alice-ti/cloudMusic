import RecomSongSheet from '@features/RecomSongSheet'
import type { BannerItemType } from '@type/api'
import React, { useEffect, useState } from 'react'

import SwiperCard from '@/components/Swiper'
import { getBanner } from '@/service'

let isInit = false

const LayouContent: React.FC = () => {
  const [swiperList, setSwiperList] = useState<BannerItemType[]>([])
  useEffect(() => {
    const bannerList = async (): Promise<void> => {
      const {
        data: { banners },
      } = await getBanner()
      setSwiperList(banners)
      isInit = true
    }
    if (!isInit) void bannerList()
  }, [])

  return (
    <>
      <main className="flex-1 overflow-y-auto">
        <SwiperCard swiperList={swiperList} />
        {/* <RecomSongSheet /> */}
      </main>
    </>
  )
}

export default LayouContent
