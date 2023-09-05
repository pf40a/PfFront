import { useState, useEffect } from "react";
import { Routes, Route,  } from "react-router-dom";

import RegisterPage from "./views/Auth/Pages/RegisterPage";
import LoginPage from "./views/Auth/Pages/LoginPage";
import DetailsRooms from "./views/Details/Details";
import Sidebar from "./views/DashBoard/DashBoard";
import ErroPage from "./views/Error404/Error404";
import AboutUs from "./views/AboutUs/AboutUs";
import Home from "./views/Home/Home";

import Reservation from "./components/ReservationForm/Reservation";
import SearchRoom from "./components/SearchComponent/SearchRoom";
import { CheckingAuth } from "./components/Login/CheckingAuth";
import PaymenView from "./components/Payment/PaymenView";
import PopDetail from "./components/PopDetail/PopDetail";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import { useCheckAuth } from "./Hooks/useCheckAuth";

import "./App.css";

function App() {
  const [showLayout, setShowLayout] = useState(true);
  //   const [localStorageRooms, setLocalStorageRooms] = useState(["hola"])
  //   const typesRoom = useSelector((state) => state.allTypesRooms);
  //   const dispatch = useDispatch()

  // //Rooms LocalStorage :
  // useEffect(() => {
  //   // Cargar datos del carrito desde localStorage al cargar la página
  //   const savedRooms = localStorage.getItem('rooms');
  //   if (savedRooms) {
  //     setLocalStorageRooms(JSON.parse(savedRooms));
  //   }
  // }, []);

  // useEffect(() => {
  //   // Guardar datos del carrito en localStorage cuando cambien
  //   localStorage.setItem('rooms', JSON.stringify(localStorageRooms));
  // }, [localStorageRooms]);

  // //añadir habitacion
  // const addToCart = (item) => {
  //   setLocalStorageRooms([...localStorageRooms, item]);
  // };

  // Verificar la ruta actual y decidir si mostrar el diseño completo o no
  useEffect(() => {
    const currentPath = window.location.pathname;
    setShowLayout(
      currentPath !== "/error" &&
        currentPath !== "/reserve" &&
        currentPath !== "/login" &&
        currentPath !== "/register" &&
        currentPath !== "/dashboard"
    );
    // const fetchDataRooms = async()=>{
    //   dispatch(allTypesRooms(typesRoom))
    // }
    // fetchDataRooms()
  }, []);

  // Authentication

  const status = useCheckAuth();

  if (status === "checking") {
    return <CheckingAuth />;
  }

  // getAuth()
  // .getUsers([ { email: 'user2@example.com' } ])
  // .then((getUsersResult) => {
  //   console.log('Successfully fetched user data:');
  //   getUsersResult.users.forEach((userRecord) => {
  //     console.log(userRecord);
  //   });

  //   console.log('Unable to find users corresponding to these identifiers:');
  //   getUsersResult.notFound.forEach((userIdentifier) => {
  //     console.log(userIdentifier);
  //   });
  // })
  // .catch((error) => {
  //   console.log('Error fetching user data:', error);
  // });

  return (
    <>
      {showLayout && <Navbar />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/details/:subtipo" element={<DetailsRooms />} />
        <Route path="/reserve" element={<Reservation />} />
        <Route path="/dashboard" element={<Sidebar />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/payment" element={<PaymenView />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* <Route path="/error" element={<ErroPage />} /> */}
        <Route path="*" element={<ErroPage />} />
        <Route path="/pop" element={<PopDetail />} />
        <Route path="/search" element={<SearchRoom />} />
      </Routes>
      {showLayout && <Footer />}
    </>
  );
}

export default App;
