import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'

//this simply run as function
// function MyApp() {
//   return (
//     <div>
//       <h1>Custom App | chai</h1>
//     </div>
//   )
// }

//this is not acceptable as react have certain syntax
// const reactElement = {
//     type: 'a',
//     props : {
//         href: "https://www.google.com/"
//     },
//     children: 'Click for google'
// }

// const reactElement = React.createElement(
//   'a',
//   {href: 'https://google.com', target: '_blank' },
//   'click me to visit google'
// )
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <MyApp /> */}
    <App/>
  </StrictMode>,
)
