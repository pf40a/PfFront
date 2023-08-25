import { useState } from 'react'
import { useEffect} from 'react';
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import ErroPage from './components/Error/ErroPage'
import { Route} from 'react-router-dom'
import { Routes } from 'react-router-dom'
import Reservation from './components/Reservation/Reservation';

function App() {
  const [showLayout, setShowLayout] = useState(true);

  // Verificar la ruta actual y decidir si mostrar el diseño completo o no
  useEffect(() => {
    const currentPath = window.location.pathname;
    setShowLayout(currentPath !== '/error');
  }, []);

  return (
    <>
    {showLayout && <Navbar />}
    <Routes>
    <Route path='/error' element={<ErroPage/>}/>
    <Route path='/reservation' element={<Reservation/>}/>
    </Routes>
    {showLayout && <Footer />}
    </>
  )
}

export default App
