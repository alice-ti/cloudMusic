import React from 'react'

import History from './History'
import Nav from './Nav'
import User from './User'

const LayoutHeader: React.FC = () => {
  return (
    <>
      <header className="xl:px-20 box-border h-16 grid grid-cols-[200px_minmax(900px,_1fr)_100px] shadow-[0_0_10px_0_rgba(0,0,0,0.3)]">
        <History />
        <Nav />
        <User />
      </header>
    </>
  )
}

export default LayoutHeader
