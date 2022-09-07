import React from 'react'

import LayouContent from '@/features/LayoutContent'
import LayouFooter from '@/features/LayoutFooter'
import LayouHeader from '@/features/LayoutHeader'

const Home: React.FC = () => {
  return (
    <>
      <div className="h-screen flex flex-col">
        <LayouHeader />
        <LayouContent />
        <LayouFooter />
      </div>
    </>
  )
}
export default Home
