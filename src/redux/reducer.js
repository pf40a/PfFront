import { all } from "axios";
import {
  SEARCH_ROOMS,
  DETAIL_ROOM,
  FILTER_ROOMS,
  ORDER_ROOMS,
  TYPES_ROOMS,
  FILTER_TYPES_ROOMS,
  SAVE_PAGE,
  LOGIN,
  LOGOUT,
  CHECKING_CREDENTIALS,
} from "./actions";

const initialState = {
  rooms: [],
  allRooms: [],
  room: {},
  filters: [],
  order: "",
  typesRooms:[],
  allTypesRooms:[],
  page:1,

  // Authentication
  auth: {
    status: "checking", // authenticated, not-authenticated, checking
    uid: null,
    displayName: null,
    nombre: null,
    apellido: null,
    email: null,
    photoURL: null,
    errorMessage: null,
    admin: false,
    user:false,
  },
};

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
      };

    case ORDER_ROOMS:
      const roomsOrder = [...state.allRooms];
      const order = action.payload;
      let newRoomsOrder = [];
      if (order === "Precio Menor") {
        
        newRoomsOrder = roomsOrder.sort(function(a, b) {
  return a.precio - b.precio;
});

      }else if (order === "Precio Mayor") {
        
        newRoomsOrder = roomsOrder.sort(function(a, b) {
  return b.precio - a.precio;
});

      }else if (order === "Capacidad") {
        
        newRoomsOrder = roomsOrder.sort(function(a, b) {
  return b.capacidad - a.capacidad;
});

      } else if (order === "Name") {
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
      };

    case TYPES_ROOMS:
      return {
        ...state,
        typesRooms: [...action.payload],
        allTypesRooms: [...action.payload],
      };

    case FILTER_TYPES_ROOMS:
      const typesRoomsFilter = [...state.allTypesRooms];
      const filterTypes = action.payload;

      //filtramos los tipos de habitaciones donde subTipo sea igual al filterTypes
      const newTypesRooms = typesRoomsFilter.filter((room) => {
        return room.subTipo === filterTypes;
      });

      return {
        ...state,
        typesRooms: [...newTypesRooms],
      };

      case SAVE_PAGE:
      return {
        ...state,
        page: action.payload
      };

    // ----- Authentication -----

    case LOGIN:
      const { displayName, nombre, apellido, photoURL } = action.payload;
      return {
        ...state,
        auth: {
          status: "authenticated",
          uid: action.payload.uid,
          displayName: displayName || `${nombre} ${apellido}`,
          nombre: action.payload.nombre,
          apellido: action.payload.apellido,
          email: action.payload.email,
          photoURL: photoURL || "https://w7.pngwing.com/pngs/741/68/png-transparent-user-computer-icons-user-miscellaneous-cdr-rectangle-thumbnail.png",
          errorMessage: null,
          admin: false,
          user:true,
        },
      };

    case LOGOUT:
      return {
        ...state,
        auth: {
          status: "not-authenticated",
          uid: null,
          displayName: null,
          nombre: null,
          apellido: null,
          email: null,
          photoURL: null,
          errorMessage: action.payload ? action.payload : null ,
          admin: false,
          user:false,
        },
      };

    case CHECKING_CREDENTIALS:
      return {
        ...state,
        auth: {
          ...state.auth,
          status: "checking",
        },
      };


    default:
      return { ...state };
  }
}
