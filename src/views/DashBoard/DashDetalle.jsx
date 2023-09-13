import { AreaChart, Card, Flex, Grid, Metric, ProgressBar, Tab, TabGroup, TabList, TabPanel, TabPanels, Table, TableHead, Text, Title, TableRow, TableHeaderCell, TableBody, TableCell, Badge, Button, MultiSelect, MultiSelectItem, Select, SelectItem, TextInput } from '@tremor/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { GetClientes,GetUsers} from '../../redux/actions'
import { useDispatch } from 'react-redux';

export default function DashDetalle({ id, data, type, onClose }) {
 const dispatch = useDispatch(); 
  const [newData, setNewData] = useState({});
console.log('Data:.',newData)
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
  e.preventDefault();
  if(confirm('¿Desea guardar los cambios?')){
  ///con axios envio la newData
  await axios.put(`${import.meta.env.VITE_API_URL}/hotel/${type}/${id}`, newData)
    .then((response) => {
      console.log(response);
      alert('Usuario actualizado');
      if(type==='clientes'){
       dispatch(GetClientes()); 
      }
      
      onClose(false);
    })
    .catch((error) => console.log(error));
  }
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
         {key==='googleUser' && `${newData[key]}`}
         {key !== 'googleUser' && (
         <TextInput name={key} value={newData[key]} onChange={handleChange} /> 
         )}
         
          </div>
      ))}
         
      </div>
      
       
       <div className='mt-2'>
<Button className='bg-red text-white' onClick={()=>onClose(false)}>Cerrar</Button> <Button type='submit' variant="primary" className='text-white' >Guardar</Button> 
       </div>
       
      </Card>
      </form>
      
    </div>
  );
}