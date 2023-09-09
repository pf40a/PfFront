export const SEARCH_ROOMS = "SEARCH_ROOMS";
export const DETAIL_ROOM = "DETAIL_ROOM";
export const FILTER_ROOMS = "FILTER_ROOMS";
export const TYPES_ROOMS = "TYPES_ROOMS";
export const FILTER_TYPES_ROOMS = "FILTER_TYPES_ROOMS";
export const ORDER_ROOMS = "ORDER_ROOMS";
export const SAVE_PAGE = "SAVE_PAGE";
export const GET_CLIENTES = "GET_CLIENTES"
export const PUT_CLIENTES = "PUT_CLIENTES"
export const GET_USERS = "GET_USERS"
export const PUT_USERS = "PUT_USERS"
export const GET_HABITACIONES = "GET_HABITACIONES"
export const PUT_HABITACIONES = "PUT_HABITACIONES"
export const PUT_HABITACIONES_DETAIL = "PUT_HABITACIONES_DETAIL"
//  Authentication
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const CHECKING_CREDENTIALS = "CHECKING_CREDENTIALS";

import axios from "axios";

export const GetHabitaciones = ()=>{
  return async(dispatch)=>{
  let response = await axios.get(`${import.meta.env.VITE_API_URL}/hotel/habitaciones`)
  dispatch({
   type: GET_HABITACIONES,
   payload: response.data.data   
  }) 
  }
}
export const PutHabitacionDetail = (id, habitacion)=>{
  return async(dispatch)=>{
  let response = await axios.put(`${import.meta.env.VITE_API_URL}/hotel/habitacion/detalle/put/${id}`, habitacion)
  dispatch({
   type: PUT_HABITACIONES_DETAIL,
   payload: response.data.data   
  }) 
  }
}

export const PutHabitacion = (id, habitacion)=>{
  return async(dispatch)=>{
  let response = await axios.put(`${import.meta.env.VITE_API_URL}/hotel/habitaciones/put/${id}`, habitacion)
  dispatch({
   type: PUT_HABITACIONES,
   payload: response.data.data   
  }) 
  }
}



export const PutUsers = (id, user)=>{
  return async(dispatch)=>{
  let response = await axios.put(`${import.meta.env.VITE_API_URL}/hotel/users/${id}`, user)
  dispatch({
   type: PUT_USERS,
   payload: response.data.data   
  }) 
  }
}

export const GetUsers = ()=>{
  return async(dispatch)=>{
  let response = await axios.get(`${import.meta.env.VITE_API_URL}/hotel/users`)
  dispatch({
   type: GET_USERS,
   payload: response.data.data   
  }) 
  }
}




export const PutClientes = (doc, cliente)=>{
  return async(dispatch)=>{
  let response = await axios.put(`${import.meta.env.VITE_API_URL}/hotel/clientes/${doc}`, cliente)
  dispatch({
   type: PUT_CLIENTES,
   payload: response.data.data   
  }) 
  }
}

export const GetClientes = ()=>{
  return async(dispatch)=>{
  let response = await axios.get(`${import.meta.env.VITE_API_URL}/hotel/clientes`)
  dispatch({
   type: GET_CLIENTES,
   payload: response.data.data   
  }) 
  }
}

export const searchRooms = (search) => {
  console.log('buscar',search)
  return async (dispatch) => {
    try {
      let filtroFechas = {
        fechaIngreso: search.fechaIn,
        fechaSalida: search.fechaOut,
      };
      //console.log('filtro',filtroFechas)
      let response = await axios.post(
        `${import.meta.env.VITE_API_URL}/hotel/filtros`,
        filtroFechas
      );
      let data = response.data.data;
      ///se filtra dependiendo del total de pax
      let pax = Number(search.adultos) + Number(search.niños);

      var dataNew = data.filter(function (habitacion) {
        return habitacion.capacidad <= pax;
      });

      dataNew = dataNew.sort(function(a, b) {
        return b.capacidad - a.capacidad;
      })
  console.log('dataFinal',dataNew)
      return dispatch({
        type: "SEARCH_ROOMS",
        payload: dataNew,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const detailRoom = (id) => {
  return {
    type: "DETAIL_ROOM",
    payload: id,
  };
};

export const filterRoom = (filter) => {

  return {
    type: "FILTER_ROOMS",
    payload: filter,
  };
};

export const orderRoom = (order) => {
  return {
    type: "ORDER_ROOMS",
    payload: order,
  };
};

export const loadAllTypesRooms = () => {
  return async (dispatch) => {
    try {
      let response = await axios.get(
        `${import.meta.env.VITE_API_URL}/hotel/habitaciones/detalle`
      );
      let data = response.data.data;
      //console.log('data',data)
      return dispatch({
        type: "TYPES_ROOMS",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const filterTypesRooms = (filter) => {
  return {
    type: "FILTER_TYPES_ROOMS",
    payload: filter,
  };
};

export const savePage = (page) => {
  return {
    type: "SAVE_PAGE",
    payload: page,
  };
};

// ----- Authentication -----

export const login = (payload) => {
  return {
    type: LOGIN,
    payload,
  };
};

export const logout = (payload) => {
  return {
    type: LOGOUT,
    payload,
  };
};

export const checkingCredentials = () => {
  return {
    type: CHECKING_CREDENTIALS,
  };
};
