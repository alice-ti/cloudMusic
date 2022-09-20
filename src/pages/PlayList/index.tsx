import React, { useState } from 'react'

const Songsheet: React.FC = () => {
  const [text, setText] = useState(0)
  const handleClick = (): void => {
    setText(text + 1)
  }
  return (
    <>
      <header>
        <div>{text}</div>
      </header>
      <main>{console.log('re-render')}</main>
      <button onClick={handleClick}>TTTTTTT</button>
    </>
  )
}

export default Songsheet
