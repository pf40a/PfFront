import { useState, useEffect } from 'react'
import './App.css'
import { Route} from 'react-router-dom'
import { Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import ErroPage from './views/Error404/Error404'
import Reservation from './components/ReservationForm/Reservation'
import AirbnbCard from './components/Map/Map'

function App() {
  const [showLayout, setShowLayout] = useState(true);

  // Verificar la ruta actual y decidir si mostrar el diseño completo o no
  useEffect(() => {
    const currentPath = window.location.pathname;
    setShowLayout(currentPath !== '/error' && currentPath !== '/reserve' );
  }, []);
  return (
    <>
    {showLayout && <Navbar />}
    <Routes>
      <Route path="/error" element={<ErroPage/>}/>
      <Route path='/reserve' element={<Reservation/>}/>
      <Route path='/' element={<AirbnbCard/>}/>
    </Routes>
    {showLayout && <Footer />}
    </>
  )
}

export default App
