import React, { useEffect } from 'react'
import { createRoot } from 'react-dom/client'

import Icon from '../SvgIcon'

type MsgMoldType = 'info' | 'success' | 'error' | 'warning'

interface MessagePropsType {
  icon?: string
  content: string
  onClose?: () => void
}
interface MessageType extends MessagePropsType {
  type: MsgMoldType
}

const Message: React.FC<MessageType> = ({ icon, content, type = 'info', onClose }) => {
  useEffect(() => {
    const timer = typeof onClose === 'undefined' ? null : setTimeout(onClose, 5000)
    return () => {
      if (typeof timer === 'number') clearTimeout(timer)
    }
  }, [])

  return (
    <div
      className="w-fit py-3 px-4 rounded-md shadow-md backdrop-blur select-none"
      onClick={onClose}
    >
      <div className="flex items-center">
        <Icon name="play" />
        <label>{content}</label>
      </div>
    </div>
  )
}

const getContainer = (): HTMLElement => {
  const container = document.getElementById('customMessageWrapper')
  if (container == null) {
    const _container = document.createElement('div')
    _container.id = 'customMessageWrapper'
    _container.className = `fixed flex flex-col top-0 items-center py-5 left-1/2 -translate-x-1/2`
    document.body.appendChild(_container)
    return _container
  }
  return container
}

// 公用message方法
const _message = (type: MsgMoldType) => (props: MessagePropsType) => {
  const container = getContainer()
  const _dom = document.createElement('div')

  container.appendChild(_dom)

  const root = createRoot(_dom)

  const hanldeClose = (): void => {
    root.unmount()
    container.removeChild(_dom)
  }

  root.render(
    <React.StrictMode>
      <Message {...props} type={type} onClose={hanldeClose} />
    </React.StrictMode>
  )
}

const error = _message('error')
const warning = _message('warning')
const success = _message('success')
const info = _message('info')

export default {
  error,
  warning,
  success,
  info,
}
