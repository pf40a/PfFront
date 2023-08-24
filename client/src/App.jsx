import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    <h1 className="text-3xl font-bold underline">
      OASIS  HOTEL
    </h1>
    <img className="mx-auto max-w-7xl w-full" src="https://images.unsplash.com/photo-1615678593177-310b3915a5cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80" alt="" />
    <Footer/>
    </>
  )
}

export default App
