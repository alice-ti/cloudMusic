import Icon from '@components/SvgIcon'
import { useRef } from 'react'
import ReactDOM from 'react-dom'

interface LoadingType {
  className?: string
  callback: () => void
  [name: string]: unknown
}

const Loading: React.FC<LoadingType> = (props: LoadingType) => {
  const { className = '', callback } = props
  const loading = useRef(document.getElementById('root') as HTMLElement)

  return ReactDOM.createPortal(
    <div
      id="loading"
      ref={callback}
      className="bg-white/80 backdrop-blur backdrop-opacity-25 fixed inset-0 h-full w-full hidden"
    >
      <Icon
        name="loading"
        className={
          'absolute w-1/6 aspect-[1/1] right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2 ' +
          className
        }
      />
    </div>,
    loading.current
  )
}

export default Loading
