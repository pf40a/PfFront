import { all } from "axios";
import {
  PUT_CLIENTES,
  GET_CLIENTES,
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
  PUT_USERS,
  GET_USERS
} from "./actions";

const initialState = {
  users:[],
  clientes: [],
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
    
    
    case PUT_USERS:
  const updatedUserIndex = state.users.findIndex((u) => u.id === action.payload.id);
  const updatedUsers = [...state.users];
  updatedUsers[updatedUserIndex] = action.payload;
  return {
    ...state,
    users: updatedUsers,
  };
    case GET_USERS:
      return {
        ...state,
        users: [...action.payload]
      };

    case PUT_CLIENTES:
     const updatedClientIndex = state.clientes.findIndex((client) => client.doc_Identidad === action.payload.doc_Identidad);
  // Crea una copia del array de clientes actual y reemplaza el cliente modificado en el índice correspondiente
  const updatedClientes = [...state.clientes];
  updatedClientes[updatedClientIndex] = action.payload;
  return {
    ...state,
    clientes: updatedClientes,
  };
    case GET_CLIENTES:
      return {
        ...state,
        clientes: [...action.payload]
      };
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
