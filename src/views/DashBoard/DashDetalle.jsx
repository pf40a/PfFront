import {
  
  Card,
  
  Title,
  
  Button,
  
  TextInput,
} from "@tremor/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { GetClientes, GetUsers } from "../../redux/actions";
import { useDispatch } from "react-redux";
import Modal from 'react-modal';

export default function DashDetalle({
  id,
  data,
  type,
  onClose,
  action = null,
}) {
  const dispatch = useDispatch();
  const [newData, setNewData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

console.log('Data:.',newData)

// Función para abrir el modal de confirmación
const openModal = () => {
  setIsModalOpen(true);
};

// Función para cerrar el modal de confirmación
const closeModal = () => {
  setIsModalOpen(false);
};

  useEffect(() => {
    setNewData(data);
  }, [data]);
  /* useEffect(() => {
    // Realizar la solicitud Axios para obtener los detalles del usuario
    axios.get(`${import.meta.env.VITE_API_URL}/api/usuario/${userId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los detalles del usuario', error);
      });
  }, [userId]);

  if (!user) {
    return <div>Cargando...</div>;
  } */

  function convertirCadena(cadena) {
    // Dividir la cadena en palabras separadas por mayúsculas o "_"
    const palabras = cadena.split(/_|\B(?=[A-Z])/);

    // Capitalizar la primera letra de cada palabra y unirlas con un espacio
    const resultado = palabras
      .map((palabra) => {
        return palabra.charAt(0).toUpperCase() + palabra.slice(1);
      })
      .join(" ");

    return resultado;
  }

  const handleChange = (event) => {
    let campo = event.target.name;
    let valor = event.target.value;

    // Convierte el valor a un booleano si es una cadena "true" o "false"
  if (valor === "true") {
    valor = true;
  } else if (valor === "false") {
    valor = false;
  }
  
    setNewData({ ...newData, [campo]: valor });

  };

const handleSubmit = async (e) => {
  closeModal(); 
  e.preventDefault();
  ///con axios envio la newData
  await axios.put(`${import.meta.env.VITE_API_URL}/hotel/${type}/${id}`, newData)
    .then((response) => {
      console.log(response);
      if(type==='clientes'){
        alert('Cliente actualizado');
       dispatch(GetClientes()); 
      }else if(type==='users'){ 
        alert('Usuario actualizado');
       dispatch(GetUsers());
      }else if(type==='habitaciones/detalle/put'){ 
        alert('Habitacion actualizado');
        action();
       }
      
      onClose(false);
    })
    .catch((error) => console.log(error));
}

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Card>
          <Title className="uppercase border-b-2 mb-4 !text-primary">{type}</Title>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.keys(newData).map(
              (key) =>
                key !== "deleted" &&
                key !== "id" &&
                key !== "createdAt" &&
                key !== "updatedAt" && (
                  <div key={key}>
                    <label htmlFor="">
                      {convertirCadena(key)}
                    </label>
                    <br />
                    {(key === "googleUser" && `${newData[key]}`) ||
                      ((newData[key] === true || newData[key] === false) && (
                        <div>
                          <select
    onChange={handleChange}
    name={key}
    value={newData[key] ? 'true' : 'false'}
    className="block text-lg w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
  >
    <option value="true">Si</option>
    <option value="false">No</option>
  </select>
                        
                          
                        </div>
                      )) ||
                      ((key === "descripcion" || key === "caracteristica" || key === "image") && null) || (
                        <TextInput
                          name={key}
                          value={newData[key]}
                          onChange={handleChange}
                        />
                      )}
                  </div>
                )
            )}

{Object.keys(newData).map(
              (key) =>
              (key === "descripcion" || key === "caracteristica") && (
                  <div className="col-span-2 md:col-span-4" key={key}>
                    <label htmlFor="">
                      {convertirCadena(key)}
                    </label>
                    <br />
                    
                        <textarea
                          onChange={handleChange}
                          name={key}
                          className="block w-full h-20 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                          {newData[key]}
                        </textarea>
                     
                  </div>
                ) || key=='image' && (
<div className="col-span-2 md:col-span-4" key={key}>
<label htmlFor="">
                      {convertirCadena(key)}
                    </label>
                    <br />
  <img src={newData[key]} alt="" className="w-10/12 max-w-[300px] h-auto mx-auto" />
  
</div>
              
      ))}
         
      </div>
      
       
       <div className='mt-2'>
<Button variant="secondary" onClick={()=>onClose(false)}>Cerrar</Button>
<Button type='button' variant="primary" className='ml-3' onClick={openModal} >Guardar</Button>

       </div>
       
      </Card>
      </form>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Confirmación"
        className="fixed inset-0 flex items-center justify-center outline-none"
        overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-50 z-50"
      >
        <div className="bg-white w-full max-w-md p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">¿Estás seguro de guardar los cambios?</h2>
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg mr-2"
            >
              Confirmar
            </button>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg"
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>      
    </div>
  );
}
