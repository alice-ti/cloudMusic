import React, { useEffect } from 'react'

import useLoading from '@/components/Loading/useLoading'
import message from '@/components/Message'

const Mine: React.FC = () => {
  const loading = useLoading()
  useEffect(() => {}, [])

  const text = (): void => {
    loading.show()
    setTimeout(() => {
      loading.hide()
    }, 200)
    setTimeout(() => {
      loading.show()
    }, 300)
    setTimeout(() => {
      loading.hide()
    }, 400)
  }

  const msg = (): void => {
    message.info({ content: 'So what ?' })
  }

  return (
    <>
      <div>MINE</div>
      <button onClick={text}>Show</button>
      <button onClick={msg}>Msg</button>
    </>
  )
}
export default Mine
