import SwiperCard from '@components/Swiper'
import RecomArtist from '@features/RecomArtist'
import RecommFM from '@features/RecomFM'
import RecomSong from '@features/RecomSong'
import RecomSongSheet from '@features/RecomSongSheet'
import type { BannerItemType } from '@type/api'
import React, { useEffect, useState } from 'react'

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
      <main className="flex-1 overflow-y-auto px-10 box-border">
        {/* <SwiperCard swiperList={swiperList} /> */}
        {/* <RecomSongSheet /> */}
        <section className="grid grid-cols-2 gap-x-10">
          <RecomSong />
          <RecommFM />
        </section>
        <RecomArtist />
      </main>
    </>
  )
}

export default LayouContent
