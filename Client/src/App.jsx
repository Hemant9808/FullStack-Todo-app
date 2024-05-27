import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import AddTodo from './AddTodo'

import Todos from './Todos'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='w-100vw p-0 m-0 h-auto min-h-screen bg-gray-900'>
     <div className='relative' >  <AddTodo ></AddTodo></div>
      <Todos></Todos>
    </div>
  )
}

export default App
