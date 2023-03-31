import EmptyImage from '@assets/image/empty.png'
import React, { HTMLAttributes, memo, useCallback, useEffect, useState } from 'react'

interface ImagePropsType extends HTMLAttributes<HTMLImageElement> {
  src: string // 真实图片
  defaultImgSrc?: string // 占位图
  [key: string]: unknown
}

// const cache: {
//   [key: string]: Promise<void>
// } = {}

const Img: React.FC<ImagePropsType> = (props) => {
  const { src, defaultImgSrc = EmptyImage, className = '', ...restProps } = props

  const [imgLoaded, setImgLoaded] = useState<boolean>(false)

  const loadImg = useCallback((url: string) => {
    const img = new Image()
    img.src = url
    img.onload = () => setImgLoaded(true)
  }, [])

  // 真实图片加载完成，显示真实图片
  useEffect(() => {
    loadImg(src)
  }, [src])

  // 真实图片未加载完成，先显示占位图
  return (
    <img
      src={imgLoaded ? src : defaultImgSrc}
      className={'shadow-xl hover:shadow-2xl object-cover ' + className}
      {...restProps}
    />
  )
}

export default memo(Img)
