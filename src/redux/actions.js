export const SEARCH_ROOMS = "SEARCH_ROOMS";
export const DETAIL_ROOM = "DETAIL_ROOM";
export const FILTER_ROOMS = "FILTER_ROOMS";
export const ORDER_ROOMS = "ORDER_ROOMS";

import axios from "axios";

export const searchRooms = (search) => {
  return async (dispatch) => {
    try {
      let response = await axios.get("http://localhost:3001/search", search);
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
