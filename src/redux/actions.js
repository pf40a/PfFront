export const SEARCH_ROOMS = "SEARCH_ROOMS";
export const DETAIL_ROOM = "DETAIL_ROOM";
export const FILTER_ROOMS = "FILTER_ROOMS";
export const TYPES_ROOMS = "TYPES_ROOMS";
export const FILTER_TYPES_ROOMS = "FILTER_TYPES_ROOMS";
export const ORDER_ROOMS = "ORDER_ROOMS";
export const SAVE_PAGE = "SAVE_PAGE";

//  Authentication
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const CHECKING_CREDENTIALS = "CHECKING_CREDENTIALS";

import axios from "axios";

export const searchRooms = (search) => {
  //console.log('buscar',search)
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

      //console.log('dataxx',data)
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
