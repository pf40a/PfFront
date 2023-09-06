import { AreaChart, Card, Flex, Grid, Metric, ProgressBar, Tab, TabGroup, TabList, TabPanel, TabPanels, Table, TableHead, Text, Title, TableRow, TableHeaderCell, TableBody, TableCell, Badge, Button, MultiSelect, MultiSelectItem, Select, SelectItem } from '@tremor/react';
import React, { useState } from 'react';
import Detalle from './DashDetalle';
import Form from './DashForm';


function Usuarios(params) {
  const  {data} = params
    const [selectedStatus, setSelectedStatus] = useState("all");
    const[selectedRole, setSelectedRole] = useState([])
    const [menuState, setMenuState] = useState({});
  
    const [doc, setDoc] = useState("")//esto deberia guardar el documento
    const toggleMenuForItem = (item) => {
      setMenuState((prevState) => ({
        ...prevState,
        [item.name]: !prevState[item.name],
      }));
    };
    const handlerSelect = (select) => {
      return (
        (select.status === selectedStatus || selectedStatus === "all") &&
        (selectedRole.length === 0 || selectedRole.includes(select.Role))
      );
    }; 
    const changeStatus = (status)=>{
      //deberia hacer un borrado logico
     
    }
    const [isOpenForm, setIsOpenForm] = useState(false);
    const [isOpenDetalle, setIsOpenDetalle] = useState(false);
    const toggleMenuDetalle = (document) => {
      setIsOpenDetalle(!isOpenDetalle);
      setDoc(document)
    };
    const toggleMenuForm = (document) => {
      setIsOpenForm(!isOpenForm);
      setDoc(document)
    };
return(

<main className=""> 

{isOpenForm && (
    <div className=" z-50 bg-white p-4 border shadow-lg  backdrop-blur-sm bg-black/70 fixed w-full h-full flex items-center justify-center top-0 left-0  mx-auto"> 
    
      <Form estado={isOpenForm} cambiarEstado={setIsOpenForm} documento={doc}/>
      </div>
  )}
  {isOpenDetalle && (
    <div className=" z-50 bg-white p-4 border shadow-lg  backdrop-blur-sm bg-black/70 fixed w-full h-full flex items-center justify-center top-0 left-0  mx-auto"> 
      
      <Detalle estado={isOpenDetalle} cambiarEstado={setIsOpenDetalle} documento={doc}/>
      </div>
  )}
  <TabGroup className="mt-6 ">
  <TabList>
        <Tab>Usuarios</Tab>
      </TabList>
      <TabPanels> 
      <TabPanel> 
  <Grid className="gap-6 m-6"> 
  <div className="flex space-x-2">
 <MultiSelect
 className="max-w-full sm:max-w-xs"
 onValueChange={setSelectedRole}
 placeholder="Select Role..."
 >
  {
    data.map((item)=>{
      return(
      <MultiSelectItem key={item.Role} value={item.Role}>
      {item.Role}
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
<SelectItem value="active">Active</SelectItem>
<SelectItem value="inactive">Inactive</SelectItem>

</Select>          
  </div>
<Card >
<Title>Lista de usuarios</Title>
<Table>
<TableHead>
<TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Position</TableHeaderCell>
          <TableHeaderCell>Department</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
</TableRow>
</TableHead>
<TableBody >
  
{data.filter((item)=> handlerSelect(item))
         .map((item) => (
          <TableRow key={item.name}>
            <TableCell>{item.name}</TableCell>
            <TableCell>
              <Text>{item.Role}</Text>
            </TableCell>
            <TableCell>
              <Text>{item.departement}</Text>
            </TableCell>
            <TableCell>
          <Button /*BORRADO LOGICO*/  color={item.status === 'active' ? 'emerald' : 'red'} className='flex-row'> 
  <div className="flex items-center">
    <div className="mr-2">{item.status}</div>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
  </div>
</Button>

            </TableCell>
 <TableCell >
 <div className='flex inline-flex'>
  <span onClick={() => toggleMenuForItem(item)}>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
</svg>
  </span>
 


</div>
  </TableCell>           
  {menuState[item.name] &&(
  <TableCell> 
  <div className='bg-zinc-300 mt-2 -ml-10 w-30 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none flex flex-col h-13 w-13'
  >
  <span onClick={() =>toggleMenuDetalle(item.name)} className='m-1'>Detalle</span>
  <span onClick={() =>toggleMenuForm(item.name)} className='m-1'>Modificar</span>
  </div>
  </TableCell>
  )
}
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
export default Usuarios