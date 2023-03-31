import React, {
  cloneElement,
  forwardRef,
  PropsWithChildren,
  ReactElement,
  useRef,
  useState,
} from 'react'
import { flushSync } from 'react-dom'

interface VirtualListType extends PropsWithChildren {
  getItemHeight: (idx: number) => number // 可视区域高度 containerHeight
  itemCount: number // 可显示的列表项数 itemCount
  children: ReactElement[]
}

const VirtualList = forwardRef((props: VirtualListType, ref) => {
  const { getItemHeight, itemCount, children } = props
  const virtualList = useRef<HTMLDivElement | null>(null)

  if (typeof ref !== 'function' && ref !== null) {
    ref.current = {
      resetHeight: () => setOffsets(getOffsets()),
      resetContainer: () => {
        if (typeof virtualList.current !== 'undefined') {
          return (virtualList.current as HTMLElement).clientHeight
        }
      },
    }
  }

  // 所有items的位置
  const getOffsets = (): number[] => {
    const arr = []
    arr[0] = getItemHeight(0)
    for (let i = 1; i < itemCount; i++) {
      arr[i] = getItemHeight(i) + arr[i - 1]
    }
    return arr
  }

  // 滚动位置//根据 getItemHeight生成 offsets
  const [scrollTop, setScrollTop] = useState(0)
  // 找 startIdx 和 endIdx //这里用了普通的查找，更好的方式是二分查找
  const [offsets, setOffsets] = useState(() => getOffsets())

  let startIdx = offsets.findIndex((pos) => pos > scrollTop)
  let endIdx = offsets.findIndex(
    (pos) => pos > scrollTop + (virtualList.current as HTMLDivElement)?.clientHeight
  )
  if (endIdx === -1) endIdx = itemCount

  const paddingCount = 2
  startIdx = Math.max(startIdx - paddingCount, 0) // 处理越界情况
  endIdx = Math.min(endIdx + paddingCount, itemCount - 1) // 计算内容总高度

  // 需要渲染的 items
  const contentHeight = offsets[offsets.length - 1]

  const items = []
  for (let i = startIdx; i <= endIdx; i++) {
    const top = i === 0 ? 0 : offsets[i - 1]
    const height = i === 0 ? offsets[0] : offsets[i] - offsets[i - 1]
    if (typeof children[i] !== 'undefined') {
      const Component = cloneElement(children[i], {
        style: {
          position: 'absolute',
          top,
          height,
        },
      })
      items.push(Component)
    }
  }

  return (
    <div
      ref={virtualList}
      id="virtualList"
      className="flex-1 relative overflow-y-auto h-full"
      // style={{ height: containerHeight }}
      onScroll={(e) => {
        flushSync(() => setScrollTop((e.target as HTMLElement)?.scrollTop))
      }}
    >
      <div style={{ height: contentHeight }}>{items}</div>
    </div>
  )
})

export default VirtualList

/**
 * 并不完善 getItemHeight 必须是定高才行，具体实现有待改进
 */
