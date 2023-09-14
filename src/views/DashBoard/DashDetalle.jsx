import { AreaChart, Card, Flex, Grid, Metric, ProgressBar, Tab, TabGroup, TabList, TabPanel, TabPanels, Table, TableHead, Text, Title, TableRow, TableHeaderCell, TableBody, TableCell, Badge, Button, MultiSelect, MultiSelectItem, Select, SelectItem, TextInput } from '@tremor/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { GetClientes,GetUsers} from '../../redux/actions'
import { useDispatch } from 'react-redux';
import Modal from 'react-modal';

export default function DashDetalle({ id, data, type, onClose, action = null }) {
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
    setNewData(data)
  },[data])
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
    const resultado = palabras.map((palabra) => {
      return palabra.charAt(0).toUpperCase() + palabra.slice(1);
    }).join(' ');
  
    return resultado;
  }


  const handleChange = (event) => {
    let campo = event.target.name;
    let valor = event.target.value;

    setNewData({ ...newData, [campo]: valor });

    //setErrors(validate({ ...newData, [campo]: valor }));
  };

const handleSubmit = async (e) => {
  closeModal(); 
  e.preventDefault();
  ///con axios envio la newData
  await axios.put(`${import.meta.env.VITE_API_URL}/hotel/${type}/${id}`, newData)
    .then((response) => {
      console.log(response);
      alert('Usuario actualizado');
      if(type==='clientes'){
       dispatch(GetClientes()); 
      }else if(type==='users'){ 
       dispatch(GetUsers());
      }else if(type==='habitaciones/detalle/put'){ 
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
      <Title className="uppercase">{type}</Title>
      
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          {Object.keys(newData).map(key => ( key!=='deleted' && key !== 'id' && key !== 'createdAt' && key !== 'updatedAt' &&
        <div key={key}>
         <label htmlFor="">{convertirCadena(key)}</label><br />
         {(key==='googleUser' && `${newData[key]}`) || ((newData[key]===true || newData[key]===false) && (
          <div>

{/* <Select name={key} value={newData[key] ? "true" : "false"} onChange={handleChange}>
  <SelectItem value="true">Si</SelectItem>
  <SelectItem value="false">No</SelectItem>
</Select> */}
<TextInput name={key} value={newData[key]} onChange={handleChange} />
          </div>
         )) || (
          <TextInput name={key} value={newData[key]} onChange={handleChange} />
         )}
         
         
          </div>
      ))}
         
      </div>
      
       
       <div className='mt-2'>
<Button variant="secondary" onClick={()=>onClose(false)}>Cerrar</Button> 
<Button type='button' variant="primary" className='text-white' onClick={openModal} >Guardar</Button>

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
          <h2 className="text-xl font-semibold mb-4">¿Aceptas recibir información en este correo electrónico?</h2>
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