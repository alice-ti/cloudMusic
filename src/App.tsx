import './App.css'

import Layout from '@router/index'
import React from 'react'
import { HashRouter } from 'react-router-dom'

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout />
    </HashRouter>
  )
}

export default App
