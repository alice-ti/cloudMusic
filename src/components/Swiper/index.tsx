import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/effect-cards'

import type { BannerItemType } from '@type/api'
import React from 'react'
import { Autoplay, EffectCards } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import styles from './index.module.css'
interface SwiperPropsType {
  swiperList: BannerItemType[]
}

const SwiperCard: React.FC<SwiperPropsType> = (props) => {
  const { swiperList } = props
  return (
    <>
      <Swiper
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        loop={true}
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards, Autoplay]}
        className={'flex justify-center items-center rounded-md ' + styles.swiper}
      >
        {swiperList.map((ele, idx) => (
          <SwiperSlide className="rounded-xl" key={idx}>
            <img src={ele?.imageUrl} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default SwiperCard
