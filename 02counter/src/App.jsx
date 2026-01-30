import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  let count = 0
  let [counter,setCounter] = useState(count)

  const addValue = () => {
    if(counter < 20){
      setCounter(counter + 1)
    }
    else{
      alert('above 20 not possible')
    }
    
  }
  const removeValue = () => {
    if (counter > 0) {
      setCounter(counter - 1)
    }
    else{
      alert('below 0 is not possible')
    }
    
  }
  return (
    <>
      <h1>Aman Jaiswal</h1>
      <h2>counter value {counter}</h2>
      <button onClick={addValue}> Add Value</button>
      <br/>
      <button onClick={removeValue}>Remove Value</button>
    </>
  )
}

export default App
