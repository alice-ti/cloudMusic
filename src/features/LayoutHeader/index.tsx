import React from 'react'

import Search from '../Search'
import History from './History'
import Nav from './Nav'
import User from './User'

const LayoutHeader: React.FC = () => {
  return (
    <>
      <header className="xl:px-20 box-border h-16 grid grid-cols-[200px_minmax(700px,_1fr)_200px_100px] shadow-[0_0_10px_0_rgba(0,0,0,0.3)]">
        <History />
        <Nav />
        <Search />
        <User />
      </header>
    </>
  )
}

export default LayoutHeader
