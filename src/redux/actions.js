export const SEARCH_ROOMS = "SEARCH_ROOMS";
export const DETAIL_ROOM = "DETAIL_ROOM";
export const FILTER_ROOMS = "FILTER_ROOMS";
export const TYPES_ROOMS = "TYPES_ROOMS";
export const FILTER_TYPES_ROOMS = "FILTER_TYPES_ROOMS";
export const ORDER_ROOMS = "ORDER_ROOMS"


import axios from "axios";

export const searchRooms = (search) => {
  return async (dispatch) => {
    try {
      let response = await axios.get("http://localhost:3001/hotel/habitaciones/detalle", search);
      let data = response.data;
      //console.log('data',data)
      return dispatch({
        type: "SEARCH_ROOMS",
        payload: data,
        search: search,
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

export const allTypesRooms = () => {
    return async (dispatch) => {
    try {
      let response = await axios.get("http://localhost:3001/hotel/habitaciones/detalle");
      let data = response.data.data;
      //console.log('data',data)
      return dispatch({
        type: "TYPES_ROOMS",
        payload: data
      });
    } catch (error) {
      console.log(error);
    }
  };
}


export const filterTypesRooms = (filter) => {
  return {
    type: "FILTER_TYPES_ROOMS",
    payload: filter,
  };
}