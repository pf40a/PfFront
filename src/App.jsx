import { useState, useEffect } from "react";
import "./App.css";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Home from "./views/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ErroPage from "./views/Error404/Error404";
import Reservation from "./components/ReservationForm/Reservation";
import Sidebar from "./views/DashBoard/DashBoard";

import RegistrationForm from "./views/Registrar/Registrar";
import AboutUs from "./views/AboutUs/AboutUs";
import PaymenView from "./components/Payment/PaymenView";

function App() {
  const [showLayout, setShowLayout] = useState(true);

  // Verificar la ruta actual y decidir si mostrar el diseño completo o no
  useEffect(() => {
    const currentPath = window.location.pathname;
    setShowLayout(currentPath !== "/error" && currentPath !== "/reserve" && currentPath !== "/registrar" && currentPath !== "/Dashboard" && currentPath !== "/payment" );
  }, []);
  return (
    <>
      {showLayout && <Navbar />}
      <Routes>
        <Route path="/error" element={<ErroPage />} />
        <Route exact path="/" element={<Home />} />
        <Route path="/reserve" element={<Reservation />} />
        <Route path="/Dashboard" element={<Sidebar/>}/>
        <Route path="/registrar" element={<RegistrationForm/>}/>
        <Route path="/about" element={<AboutUs/>}/>
        <Route path="/payment" element={<PaymenView/>}/>
        <Route path="*" element={<ErroPage/>}/>
      </Routes>
      {showLayout && <Footer />}
    </>
  );
}

export default App;
