import { AreaChart, Card, Flex, Grid, Metric, ProgressBar, Tab, TabGroup, TabList, TabPanel, TabPanels, Table, TableHead, Text, Title, TableRow, TableHeaderCell, TableBody, TableCell, Badge, Button, MultiSelect, MultiSelectItem, Select, SelectItem } from '@tremor/react';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector,  } from 'react-redux';
import Detalle from './DashDetalle';
import Form from './DashForm';
import { GetTiposHabitaciones, PutTipoHabitacion } from '../../redux/actions';
import FormUser from './FormUser';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import axios from 'axios';

function Tipos( {data, toggleMenuDetalle, setIsOpenDetalle, setDataDetail, setDataId, setTypeData}) {
  
  const dispatch = useDispatch()
    const [selectedStatus, setSelectedStatus] = useState("all");
    const[selectedRole, setSelectedRole] = useState([])
    const [menuState, setMenuState] = useState({});
  
    const [doc, setDoc] = useState("")//esto deberia guardar el id
    const [admin, setAdmin] = useState(false)
    const tipos = useSelector((state) => state.habitaciones);
    const toggleMenuForItem = (item) => {
      setMenuState((prevState) => ({
        ...prevState,
        [item.nombre]: !prevState[item.nombre],
      }));
    };
    const handlerSelect = (select) => {
      return (
        (select.subTipo === selectedStatus || selectedStatus === "all") &&
        (selectedRole.length === 0 || selectedRole.includes(select.id.toString())) 
        
      );
      
    }; 
    const changeSelect = (values) => {
      // Filtra solo los valores seleccionados
      const newSelectedRoles = values.filter((value) => value !== null);
    
      // Actualiza el estado con los valores seleccionados
      setSelectedRole(newSelectedRoles);
    };
    const [isOpenForm, setIsOpenForm] = useState(false);
    
    /* 
    const [isOpenDetalle, setIsOpenDetalle] = useState(false);
    const toggleMenuDetalle = (id) => {
      setIsOpenDetalle(!isOpenDetalle);
      setDoc(id)
    }; */

    const toggleMenuForm = (id, adm) => {
      setIsOpenForm(!isOpenForm);
      setDoc(id)
      setAdmin(adm)
    };
    /*
    const handleDelete = async(docItem, deleteItem)=>{
      let user = {}
      if(deleteItem === true){
        user.deleted = false
      }else{
        user.deleted = true
      }
       await axios.put(`${import.meta.env.VITE_API_URL}/hotel/habitaciones/detalle/put/${docItem}`, user)
     
    }
    */
    const PutForm = async(id, user)=>{
      try{  
        await dispatch(PutUsers(id, user))
        dispatch(GetUsers());
        setDoc("")
    }catch(error){
     console.error(error)
    } 
    }
    

    useEffect(() => {
      
      fetchData();
      
     
    }, [tipos]);

return(

<main className=""> 

{isOpenForm && (
    <div className=" z-50 bg-black p-4 border shadow-lg  backdrop-blur-sm bg-black/70 fixed w-full h-full flex items-center justify-center top-0 left-0  mx-auto"> 
    
    <FormUser estado={isOpenForm} PutForm={PutForm} cambiarEstado={setIsOpenForm} documento={doc} admin={admin}/>
      </div>
  )}
  {/* {isOpenDetalle && (
    <div className=" z-50 bg-black p-4 border shadow-lg  backdrop-blur-sm bg-black/70 fixed w-full h-full flex items-center justify-center top-0 left-0  mx-auto"> 
      
      <Detalle estado={isOpenDetalle} cambiarEstado={setIsOpenDetalle} id={doc}/>
      </div>
  )} */}
  <TabGroup className="mt-6 ">
  <TabList>
        <Tab>Tipos de habitacion</Tab>
      </TabList>
      <TabPanels> 
      <TabPanel> 
  <Grid className="gap-6 m-6"> 
  <div className="flex space-x-2">
 <MultiSelect
 className="max-w-full sm:max-w-xs"
 onValueChange={changeSelect}
 placeholder="Buscar id..."
 value={selectedRole}
 >
  {
    tipos.map((item)=>{
      return(
      <MultiSelectItem key={item.id.toString()} value={item.id.toString()}>
      {`${item.tipo_Habitacion} - ${item.subTipo}`}
      </MultiSelectItem>)
    })
    
  }
 </MultiSelect>
 <Select
          className="max-w-full sm:max-w-xs"
          defaultValue="all"
          onValueChange={setSelectedStatus}
        >
<SelectItem value="all">All</SelectItem>
<SelectItem value={"Economica"}>Economica</SelectItem>
<SelectItem value={"Confort"}>Confort</SelectItem>
<SelectItem value={"Gold"}>Gold</SelectItem>
</Select>          
  </div>
<Card >
<Title>Lista de tipos de habitacion</Title>
<Table className='h-[65vh]'>
<TableHead>
<TableRow>
          <TableHeaderCell>Id</TableHeaderCell>
          <TableHeaderCell>Tipo</TableHeaderCell>
          <TableHeaderCell>Subtipo</TableHeaderCell>
          <TableHeaderCell>USD</TableHeaderCell>
          <TableHeaderCell>Detalle</TableHeaderCell>
</TableRow>
</TableHead>
<TableBody >
  
{tipos.filter((item)=> handlerSelect(item))
         .map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.id}</TableCell>
            <TableCell>
              <Text>{item.tipo_Habitacion}</Text>
            </TableCell>
            <TableCell>
              <Text>{item.subTipo}</Text>
            </TableCell>
            
 <TableCell >
 <DescriptionOutlinedIcon className='cursor-pointer' onClick={() =>{
    setIsOpenDetalle(true)
    setDataDetail(item)
    setDataId(item.id)
    setTypeData('habitaciones')
    }}/>

 
  </TableCell>           
  

          </TableRow>
          
        ))}
      
</TableBody>
</Table>
</Card>

</Grid>
</TabPanel>

</TabPanels>
</TabGroup>   
</main>

)

}
export default Tipos