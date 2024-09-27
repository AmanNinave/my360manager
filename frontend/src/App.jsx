import { useState } from 'react'
import './App.css'
import AppRouter from './routes/Router'

function App() {
  const [isAuthenticated , setIsAuthenticated ] = useState(true)
  return (
      <>
      <AppRouter isAuthenticated={isAuthenticated}/>
      </>
  )
}

export default App
