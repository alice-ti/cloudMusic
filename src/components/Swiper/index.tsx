import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/effect-cards'
import './index.css'

import React from 'react'
import { Autoplay, EffectCards } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
interface SwiperPropsType {
  swiperList: any[]
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
        className="flex justify-center items-center rounded-md"
      >
        {swiperList.map((ele) => (
          <SwiperSlide className="rounded-xl" key={ele?.encodeId}>
            <img src={ele?.imageUrl} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default SwiperCard
