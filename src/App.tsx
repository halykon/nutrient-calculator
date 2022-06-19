import React, { useState } from 'react'
import IngredientInput from './components/IngredientInput'

const App: React.FC = () => {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <IngredientInput/>
    </div>
  )
}

export default App
