import React, { useState } from 'react'
import './App.css'

import ReactRedux from './pages/ReactRedux'
import Hooks from './pages/Hooks'

function App() {
  const [state, setState] = useState(0)

  return (
    <div className="App">
      <button onClick={() => setState(state + 1)}>add : {state}</button>
      <ReactRedux state={state} />
      <Hooks />
    </div>
  )
}

export default App
