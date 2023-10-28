import { useState } from 'react'

import { AllRoutes } from './Components/AllRoutes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
     <AllRoutes></AllRoutes>
    </div>
  )
}

export default App
