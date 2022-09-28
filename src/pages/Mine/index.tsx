import React, { useEffect } from 'react'

import useLoading from '@/components/Loading/useLoading'

const Mine: React.FC = () => {
  const loading = useLoading()
  useEffect(() => {}, [])

  const text = () => {
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

  return (
    <>
      <div>MINE</div>
      <button onClick={text}>Show</button>
    </>
  )
}
export default Mine
