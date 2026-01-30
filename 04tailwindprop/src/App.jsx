import './App.css'
import Card from './Components/card'

function App() {

  return (
    <>
      <h1 className='bg-amber-600 text-amber-950 p-4 rounded-2xl'>Aman Jaiswal</h1>
      <Card username="Aman Jaiswal"
        btnText="View Profile"/>
      <Card username="Sujal Jain"/>
    </>
  )
}

export default App
