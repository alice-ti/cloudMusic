import LayouFooter from '@features/LayoutFooter'
import LayouContent from '@features/LayoutContent'
import LayouHeader from '@features/LayoutHeader'

import './App.css'

function App() {
  return (
    <>
      <div className='h-screen flex flex-col'>
        <LayouHeader />
        <LayouContent />
        <LayouFooter />
      </div>
    </>
  )
}

export default App
