import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCards, Autoplay } from 'swiper'
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/effect-cards'

import './index.css'

const SwiperCard: React.FC = () => {
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
        <SwiperSlide className="rounded-xl bg-slate-300">Slide 1</SwiperSlide>
        <SwiperSlide className="rounded-xl bg-slate-500">Slide 2</SwiperSlide>
        <SwiperSlide className="rounded-xl bg-slate-700">Slide 3</SwiperSlide>
        <SwiperSlide className="rounded-xl bg-slate-900">Slide 4</SwiperSlide>
        <SwiperSlide className="rounded-xl bg-violet-100">Slide 5</SwiperSlide>
        <SwiperSlide className="rounded-xl bg-violet-300">Slide 6</SwiperSlide>
        <SwiperSlide className="rounded-xl bg-violet-500">Slide 7</SwiperSlide>
        <SwiperSlide className="rounded-xl bg-violet-700">Slide 8</SwiperSlide>
        <SwiperSlide className="rounded-xl bg-violet-900">Slide 9</SwiperSlide>
      </Swiper>
    </>
  )
}

export default SwiperCard
