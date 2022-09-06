import './App.css'

import LayouContent from '@features/LayoutContent'
import LayouFooter from '@features/LayoutFooter'
import LayouHeader from '@features/LayoutHeader'

function App() {
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

export default App
