import { AreaChart, Card, Flex, Grid, Metric, ProgressBar, Tab, TabGroup, TabList, TabPanel, TabPanels, Table, TableHead, Text, Title, TableRow, TableHeaderCell, TableBody, TableCell, Badge, Button, MultiSelect, MultiSelectItem, Select, SelectItem } from '@tremor/react';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector,  } from 'react-redux';
import Detalle from './DashDetalle';
import Form from './DashForm';
import Usuarios from './DashUsuarios';
import Habitaciones from './DashHabitaciones';
import { GetClientes, PutClientes } from '../../redux/actions';
import axios from 'axios';
const Sidebar = () => {
const dispatch = useDispatch()
  const [sidenav, setSidenav] = useState(true);
  const [section, setSection] = useState('dashboard');
  const [selectedStatus, setSelectedStatus] = useState("all");
  const[selectedRole, setSelectedRole] = useState([])
  const [menuState, setMenuState] = useState({});
  const [doc, setDoc] = useState("")//esto deberia guardar el documento
  const clientes = useSelector((state) => state.clientes);
  const toggleMenuForItem = (item) => {
    setMenuState((prevState) => ({
      ...prevState,
      [item.nombre]: !prevState[item.nombre],
    }));
  };
  const changeSection = (newSection) => {
    setSection(newSection);
  };
  const handlerSelect = (select) => {
    return (
      (select.deleted === selectedStatus || selectedStatus === "all") &&
      (selectedRole.length === 0 || selectedRole.includes(select.nombre))
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
  const handleDelete = async(docItem, deleteItem)=>{
    let cliente = {}
    if(deleteItem === true){
     cliente.deleted = false
    }else{
      cliente.deleted = true
    }
    await dispatch(PutClientes(docItem, cliente))
    await dispatch(GetClientes())
  }
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(GetClientes());
    };
    fetchData();
  }, [dispatch]);
  //data deberian ser los clientes de las BD
  const PutForm = async(documento, cliente)=>{
    try{  
      await dispatch(PutClientes(documento, cliente))
      dispatch(GetClientes());
      setDoc("")
  }catch(error){
   console.error(error)
  } 
  }
  const data = [
    {
      name: "Viola Amherd",
      Role: "Federal Councillor",
      departement: "The Federal Department of Defence, Civil Protection and Sport (DDPS)",
      status: "active",
    },
    {
      name: "Simonetta Sommaruga",
      Role: "Federal Councillor",
      departement:
        "The Federal Department of the Environment, Transport, Energy and Communications (DETEC)",
      status: "active",
    },
    {
      name: "Alain Berset",
      Role: "Federal Councillor",
      departement: "The Federal Department of Home Affairs (FDHA)",
      status: "active",
    },
    {
      name: "Ignazio Cassis",
      Role: "Federal Councillor",
      departement: "The Federal Department of Foreign Affairs (FDFA)",
      status: "active",
    },
    {
      name: "Ueli Maurer",
      Role: "cocinero",
      departement: "The Federal Department of Finance (FDF)",
      status: "active",
    },
    {
      name: "Guy Parmelin",
      Role: "Federal Councillor",
      departement: "The Federal Department of Economic Affairs, Education and Research (EAER)",
      status: "inactive",
    },
    {
      name: "Karin Keller-Sutter",
      Role: "Federal Councillor",
      departement: "The Federal Department of Justice and Police (FDJP)",
      status: "active",
    },
  ];
  
const roles = new Set(data.filter(r => r.Role))

  const chartdata = [
    {
      date: "Jan 22",
      ingresos: 2890,
      "clientes": 2338,
    },
    {
      date: "Feb 22",
      ingresos: 2756,
      "clientes": 2103,
    },
    {
      date: "Mar 22",
      ingresos: 3322,
      "clientes": 2194,
    },
    {
      date: "Apr 22",
      ingresos: 3470,
      "clientes": 2108,
    },
    {
      date: "May 22",
      ingresos: 3475,
      "clientes": 1812,
    },
    {
      date: "Jun 22",
      ingresos: 3129,
      "clientes": 1726,
    },
  ];

  return (
    <div id="view" className="h-full w-screen flex flex-row">
      <button
        onClick={() => setSidenav(!sidenav)}
        className="p-2 border-2 bg-white rounded-md border-gray-200 shadow-lg text-gray-500 focus:bg-teal-500 focus:outline-none focus:text-white absolute top-0 left-0 sm:hidden"
      >
        <svg
          className="w-5 h-5 fill-current"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
      <div
        id="sidebar"
        className={`bg-white h-screen md:block shadow-xl px-3 w-30 md:w-60 lg:w-60 overflow-x-hidden transition-transform duration-300 ease-in-out ${sidenav ? '' : 'transform -translate-x-full'}`}
      >
        <div className="space-y-6 md:space-y-10 mt-10">
          <h1 className="font-bold text-4xl text-center md:hidden">
            D<span className="text-teal-600">.</span>
          </h1>
          <h1 className="hidden md:block font-bold text-sm md:text-xl text-center">
            Oasis<span className="text-teal-600">.</span>
          </h1>
          <div id="profile" className="space-y-3">
            <img
              src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
              alt="Avatar user"
              className="w-10 md:w-16 rounded-full mx-auto"
            />
            <div>
              <h2 className="font-medium text-xs md:text-sm text-center text-teal-500">
                Eduard Pantazi
              </h2>
              <p className="text-xs text-gray-500 text-center">Administrator</p>
            </div>
          </div>
          <div className="flex border-2 border-gray-200 rounded-md focus-within:ring-2 ring-teal-500">
            <input
              type="text"
              className="w-full rounded-tl-md rounded-bl-md px-2 py-3 text-sm text-gray-600 focus:outline-none"
              placeholder="Search"
            />
            <button className="rounded-tr-md rounded-br-md px-2 py-3 hidden md:block">
              <svg
                className="w-4 h-4 fill-current"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div id="menu" className="flex flex-col space-y-2">
            <a
            onClick={() => changeSection('dashboard')}
              href="#"
              className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out"
            >
              <svg
                className="w-6 h-6 fill-current inline-block"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 3a2 2 0 012-2h2a2 2 0 012 2h2a2 2 0 012-2h2a2 2 0 012 2h2a2 2 0 012-2h2a2 2 0 012 2V17a2 2 0 01-2 2H5a2 2 0 01-2-2V3z"
                ></path>
              </svg>
              <span>Dashboard</span>
            </a>
            <a
              href="#"
              onClick={() => changeSection('clientes')}
              className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
            >
              <svg
                className="w-6 h-6 fill-current inline-block"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"
                ></path>
              </svg>
              <span>Clientes</span>
            </a>
            {/* Add the rest of the menu items here */}
            <a
        href="#"
        onClick={() => changeSection('usuarios')}
        className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out flex items-center"
      >
        <svg
          className="w-6 h-6 fill-current inline-block mr-2"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
          <path
            fillRule="evenodd"
            d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z"
            clipRule="evenodd"
          ></path>
        </svg>
        <span>Usuarios</span>
      </a>
      <a
        href="#"
        onClick={() => changeSection('habitaciones')}
        className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out flex items-center"
      >
        <svg
          className="w-6 h-6 fill-current inline-block mr-2"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"
          ></path>
          <path
            d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"
          ></path>
        </svg>
        <span>Habitaciones</span>
      </a>
      <a
        href="#"
        onClick={() => changeSection('reservas')}
        className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out flex items-center"
      >
        <svg
          className="w-6 h-6 fill-current inline-block mr-2"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
            clipRule="evenodd"
          ></path>
        </svg>
        <span>Reservas</span>
      </a>
      <a
        href="#"
        onClick={() => changeSection('')}
        className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out flex items-center"
      >
        <svg
          className="w-6 h-6 fill-current inline-block mr-2"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          ></path>
        </svg>
        <span>Usuarios</span>
      </a>
      <a
        href="#"
        className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out flex items-center"
      >
        <svg
          className="w-6 h-6 fill-current inline-block mr-2"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012 2h2a2 2 0 012-2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z"
          ></path>
        </svg>
        <span>UI Components</span>
      </a>
      <a
        href="#"
        className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out flex items-center"
      >
        <svg
          className="w-6 h-6 fill-current inline-block mr-2"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
          ></path>
        </svg>
        <span>Users</span>
      </a>
          </div>
        </div>
      </div>
      
 {/* INFORMACION PARA EL TABLERO */}

 <div className='flex-1 bg-gray-100' >
  
     {//DASHBOARD
     section === "dashboard" && (
    <main className="p-12">
    <Title>Dashboard</Title>

    <TabGroup className="mt-6">
      <TabList>
        <Tab>Vista general</Tab>
        
      </TabList>
      <TabPanels>
        <TabPanel>
          <Grid numItemsMd={2} numItemsLg={3} className="gap-6 mt-6">
            <Card>
            
            <Text>Sales</Text>
    <Metric>$ 71,465</Metric>
    <Flex className="mt-4">
      <Text>32% of annual target</Text>
      <Text>$ 225,000</Text>
    </Flex>
    <ProgressBar value={32} className="mt-2" />
    <div className="h-2" />    
            </Card>
            <Card>
            
            <Text>Sales</Text>
    <Metric>$ 71,465</Metric>
    <Flex className="mt-4">
      <Text>32% of annual target</Text>
      <Text>$ 225,000</Text>
    </Flex>
    <ProgressBar value={32} className="mt-2" />
    <div className="h-2" />
            </Card>
            <Card>
            <Text>Sales</Text>
    <Metric>$ 71,465</Metric>
    <Flex className="mt-4">
      <Text>32% of annual target</Text>
      <Text>$ 225,000</Text>
    </Flex>
    <ProgressBar value={32} className="mt-2" />
              <div className="h-2" />
            </Card>

            

          </Grid>
      <Grid className="gap-6 mt-6">
      <Card>
            <Title>Ingresos</Title>
            <AreaChart 
            data={chartdata}
            index="date"
      categories={["ingresos", "clientes"]}
      colors={["indigo", "cyan"]}
      
      />  
      <div className="h-2 w-96" />
            </Card>
      </Grid>
         
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </main>
  
     )}
{
section === "usuarios" && ( 

<Usuarios data = {data}/>
)
}
{
section === "habitaciones" && ( 

<Habitaciones data={data}/>
)
}
{//CLIENTES
section === "clientes" && ( 
  <main className=""> 

{isOpenForm && (
    <div className=" z-50 bg-black p-4 border shadow-lg  backdrop-blur-sm bg-black/70 fixed w-full h-full flex items-center justify-center top-0 left-0  mx-auto"> 
    
      <Form estado={isOpenForm} PutForm={PutForm} cambiarEstado={setIsOpenForm} documento={doc} setDoc = {setDoc}/>
      </div>
  )}
  {isOpenDetalle && (
    <div className=" z-50 bg-black p-4 border shadow-lg  backdrop-blur-sm bg-black/70 fixed w-full h-full flex items-center justify-center top-0 left-0  mx-auto"> 
      
      <Detalle estado={isOpenDetalle} cambiarEstado={setIsOpenDetalle} documento={doc}/>
      </div>
  )}
  <TabGroup className="mt-6 ">
  <TabList>
        <Tab>Clientes</Tab>
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
    clientes.map((item)=>{
      return(
      <MultiSelectItem key={item.nombre} value={item.nombre}>
      {item.nombre}
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
<SelectItem value={false}>Active</SelectItem>
<SelectItem value={true}>Inactive</SelectItem>

</Select>          
  </div>
<Card >
<Title>Lista de clientes</Title>
<Table>
<TableHead>
<TableRow>
          <TableHeaderCell>Nombre</TableHeaderCell>
          <TableHeaderCell>Documento</TableHeaderCell>
          <TableHeaderCell>Pais</TableHeaderCell>
          <TableHeaderCell>Estado</TableHeaderCell>
</TableRow>
</TableHead>
<TableBody >
  
{clientes.filter((item)=> handlerSelect(item))
         .map((item) => (
          <TableRow key={item.nombre}>
            <TableCell>{item.nombre}</TableCell>
            <TableCell>
              <Text>{item.doc_Identidad}</Text>
            </TableCell>
            <TableCell> 
              <Text>{item.pais}</Text>
            </TableCell>
            <TableCell>
          <Button onClick={()=>handleDelete(item.doc_Identidad, item.deleted)}  color={item.deleted === false ? 'emerald' : 'red'} className='flex-row'> 
  <div className="flex items-center">
    <div className="mr-2">{item.deleted === false ? "activo":"inactivo"}</div>
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
  {menuState[item.nombre] &&(
  <TableCell> 
  <div className='bg-zinc-300 mt-2 -ml-10 w-30 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none flex flex-col h-13 w-13'
  >
  <span onClick={() =>toggleMenuDetalle(item.doc_Identidad)} className='m-1'>Detalle</span>
  <span onClick={() =>toggleMenuForm(item.doc_Identidad)} className='m-1'>Modificar</span>
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
)}
     
    </div>

{/* INFORMACION PARA EL TABLERO */}

    </div>
    
  );
};
export default Sidebar
