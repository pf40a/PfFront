import { all } from "axios";
import {
  SEARCH_ROOMS,
  DETAIL_ROOM,
  FILTER_ROOMS,
  ORDER_ROOMS,
  TYPES_ROOMS,
  FILTER_TYPES_ROOMS
} from "./actions";

const initialState = {
  rooms: [],
  allRooms: [],
  room: {},
  filters: [],
  order: "",
  typesRooms:[],
  allTypesRooms:[],
}

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    ///
    case SEARCH_ROOMS:
      return {
        ...state,
        rooms: [...action.payload],
        allRooms: [...action.payload]
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
      let newRoomsOrder = [];
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

case TYPES_ROOMS:
      return {
        ...state,
        typesRooms: [...action.payload],
        allTypesRooms: [...action.payload]
      };

      case FILTER_TYPES_ROOMS:
        const typesRoomsFilter = [...state.allTypesRooms];
        const filterTypes = action.payload;
        
//filtramos los tipos de habitaciones donde subTipo sea igual al filterTypes
        const newTypesRooms = typesRoomsFilter.filter((room) => {
          return room.subTipo === filterTypes
        }
        );

        return {
          ...state,
          typesRooms: [...newTypesRooms],
        }



    default:
      return { ...state};
  }
}
