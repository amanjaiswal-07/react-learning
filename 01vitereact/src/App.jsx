import Aman from "./aman.jsx";

function App() {
  const username = 'khao' // to hold variable use {}
  //{} isme evaluated expression aata hai 
  return (
    //rule is return only one element called fragment
    <>
      <h1>aman jaiswal vite {username}</h1>
      <Aman/>
    </>
    
  )
}

export default App
