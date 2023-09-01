import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./views/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ErroPage from "./views/Error404/Error404";
import Reservation from "./components/ReservationForm/Reservation";
import Sidebar from "./views/DashBoard/DashBoard";
import LoginPage from "./views/Auth/Pages/LoginPage";
import RegisterPage from "./views/Auth/Pages/RegisterPage";

import "./App.css";
import { CheckingAuth } from "./components/Login/CheckingAuth";
import { useCheckAuth } from "./Hooks/useCheckAuth";

function App() {
  const [showLayout, setShowLayout] = useState(true);

  // Verificar la ruta actual y decidir si mostrar el diseño completo o no
  useEffect(() => {
    const currentPath = window.location.pathname;
    setShowLayout(
      currentPath !== "/error" &&
        currentPath !== "/reserve" &&
        currentPath !== "/registrar" &&
        currentPath !== "/Dashboard" &&
        currentPath !== "/login" &&
        currentPath !== "/register"
    );
  }, []);

  // Authentication

  // const status = useCheckAuth();

  // if(status === "checking"){
  //   return <CheckingAuth/>
  // }

  return (
    <>
      {showLayout && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reserve" element={<Reservation />} />
        <Route path="/Dashboard" element={<Sidebar />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/error" element={<ErroPage />} />
        <Route path="/*" element={<ErroPage />} />
      </Routes>
      {showLayout && <Footer />}
    </>
  );
}

export default App;
