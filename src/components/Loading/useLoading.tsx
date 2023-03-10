import React, { useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'

import Loading from './index'

interface LoadingType {
  show: () => void
  hide: () => void
}
interface TimeType {
  startTime: number
  endTime: number
  timer: NodeJS.Timer | null
}

const _render = (_dom: HTMLElement, callback: () => void): void => {
  if (_dom === null) {
    const _dom = document.createElement('div')
    createRoot(_dom).render(
      <React.StrictMode>
        <Loading callback={callback} />
      </React.StrictMode>
    )
  }
}

let isF = true

const useLoading = (): LoadingType => {
  const loading = useRef(document.getElementById('loading') as HTMLElement)

  const Time: TimeType = {
    startTime: 0,
    endTime: 0,
    timer: null,
  }

  // 清除计时器
  const clearTimer = (): void => {
    if (typeof Time.timer === 'number') clearTimeout(Time.timer)
    Time.timer = null
  }

  const show = (): void => {
    Time.startTime = Date.now()
    Time.timer = setTimeout(() => {
      loading.current?.classList.remove('hidden')
    }, 200)
  }

  const hide = (): void => {
    clearTimer()
    const diffTime = new Date().getTime() - Time.startTime
    const delayTime = diffTime > 200 && diffTime < 500 ? 300 : diffTime
    setTimeout(
      () => {
        loading.current?.classList.add('hidden')
      },
      delayTime <= 200 ? 0 : delayTime
    )
  }

  const callback = (): void => {
    loading.current = document.getElementById('loading') as HTMLElement
  }

  useEffect(() => {
    loading.current = document.getElementById('loading') as HTMLElement
    if (isF) _render(loading.current, callback)
    isF = false
  }, [])

  return {
    show,
    hide,
  }
}

export default useLoading
