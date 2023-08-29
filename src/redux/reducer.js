import {
  SEARCH_ROOMS,
  DETAIL_ROOM,
  FILTER_ROOMS,
  ORDER_ROOMS,
} from "./actions";

const initialState = {
  rooms: [],
  allRooms: [],
  room: {},
  filters: [],
  order: "",
  search: { fechaIn: "", fechaOut: "", adultos: 2, niños: 0, bebes: 0 },
}

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    ///
    case SEARCH_ROOMS:
      return {
        ...state,
        rooms: [...action.payload],
        allRooms: [...action.payload],
        search: { ...action.search },
      };

    case DETAIL_ROOM:
      const rooms = [...state.allRooms];
      const room = rooms.find((r) => r.id === action.payload);
      return {
        ...state,
        room: room,
      };

    case FILTER_ROOMS:
      const roomsFilter = [...state.allRooms];
      const filter = action.payload;
      const newRooms = roomsFilter.filter((room) =>
        filter.every((filtroItem) => room.caracteristica.includes(filtroItem))
      );
      return {
        ...state,
        rooms: [...newRooms],
        filters: [...action.payload],
      }

    case ORDER_ROOMS:
      const roomsOrder = [...state.allRooms];
      const order = action.payload;
      const newRoomsOrder = [];
      if (order === "price") {
        newRoomsOrder = roomsOrder.slice().sort((a, b) => a.precio - b.precio);
      } else if (order === "name") {
        newRoomsOrder = roomsOrder.sort((a, b) => {
          if (a[order] < b[order]) {
            return -1;
          }
          if (a[order] > b[order]) {
            return 1;
          }
          return 0;
        });
      }
      return {
        ...state,
        rooms: [...newRoomsOrder],
        order: action.payload,
      }


    default:
      return { ...state};
  }
}
