import React, { useEffect , useState } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';

const PaymenView = () => {
    const [roomData, setRoomData] = useState({})
    const typesRoom = useSelector((state) => state.typesRoom);  
    
    useEffect(() => {
        // Este código se ejecuta después de cada renderizado
        // Aquí puedes realizar operaciones como llamadas a API, suscripciones, etc.
        const fetchData = async ()=>{
            try {
                const roomRequest = await axios.get('http://localhost:3001/hotel/habitaciones/detalle/1')
                const response = roomRequest.data.data
                setRoomData(response)
            } catch (error) {
                
            }
        }
        fetchData()
        // Si necesitas hacer algo al desmontar el componente, retorna una función de limpieza
      }, []); // El segundo argumento es un array de dependencias
      console.log(roomData);
    const property = {
        imageUrl: 'https://bit.ly/2Z4KKcF',
        imageAlt: 'Rear view of modern home with pool',
        beds: 3,
        baths: 2,
        title: 'Habitacion de lujo',
        formattedPrice: '$1,900.00',
        reviewCount: 34,
        rating: 4,
      };
      console.log(typesRoom);
  return (
    <div className=" mx-auto max-w-sm border border-gray-300 rounded-lg overflow-hidden">
      <img src={roomData.image} alt={property.imageAlt} />

      <div className="flex flex-col items-center p-6">
        <div className="flex items-baseline">
          <span className="bg-teal-500 text-white rounded-full px-2">
            {roomData.subTipo}
          </span>
          <span className="text-gray-500 font-semibold tracking-wide text-xs uppercase ml-2">
            {roomData.capacidad} cama &bull; {roomData.capacidad} baño
          </span>
        </div>

        <h4 className="mt-1 font-semibold leading-tight">
          {roomData.tipo_Habitacion}
        </h4>

        <div className="mt-1">
          {roomData.precio}
          <span className="text-gray-600 text-sm">
            / Ars
          </span>
        </div>

        <div className="flex  mt-2 items-center">
          {Array(5)
            .fill('')
            .map((_, i) => (
              <svg
                key={i}
                className={`h-5 w-5 fill-current ${
                  i < property.rating ? 'text-teal-500' : 'text-gray-300'
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M10 1l2.39 5.44h5.61l-4.33 3.98 1.3 5.4L10 13.36l-5.97 4.46 1.3-5.4L2 6.44h5.61L10 1z" />
              </svg>
            ))}
          <span className="ml-2 text-gray-600 text-sm">
            {property.reviewCount} reviews
          </span>
        </div>

        {/* Agregar el botón de pago */}
        <button className="mt-4 bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600">
          Pagar
        </button>
      </div>
    </div>
  )
}

export default PaymenView