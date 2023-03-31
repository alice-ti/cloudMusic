import 'rc-slider/assets/index.css'

import RcSlider from 'rc-slider'
import React, { CSSProperties, HTMLAttributes } from 'react'

interface SliderProp extends HTMLAttributes<HTMLElement> {
  onAferChange: (value: number | number[]) => void
  Change: (value: number | number[]) => void
  onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void
  onFocus?: (e: React.FocusEvent<HTMLDivElement>) => void
  trackStyle?: CSSProperties
  handleStyle?: CSSProperties
  rate: number
}
const Slider: React.FC<SliderProp> = (props) => {
  const { onAferChange, onFocus, onBlur, Change, rate, className, trackStyle, handleStyle } = props
  return (
    <>
      <RcSlider
        range={false}
        className={className}
        trackStyle={trackStyle}
        handleStyle={handleStyle}
        value={rate}
        step={0.0001}
        onAfterChange={onAferChange}
        onChange={Change}
        onBlur={onBlur}
        onFocus={onFocus}
      />
    </>
  )
}

export default Slider
