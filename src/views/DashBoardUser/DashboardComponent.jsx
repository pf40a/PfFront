import React from 'react'

const DashboardComponent = () => {
  return (
    <div>
    <div className="grid grid-cols-2 gap-8 p-4">
      <div className="w-96 h-96 rounded-3xl bg-[#16242f] flex items-center justify-center hitem item--1">
        <div className=' fixed items-center justify-center flex flex-col'>
        <span className=" text-white text-2xl quantity"> 90+ </span>
        <span className=" text-white text-2xl text--1"> Mis Reservas </span>
        </div>
      </div>
      <div className="w-96 h-96 rounded-3xl bg-[#16242f] flex items-center justify-center item item--2">
        <div className=' fixed items-center justify-center flex flex-col'>
        <span className=" text-white text-2xl quantity"> 90+ </span>
        <span className=" text-white text-2xl text--1"> Hacer Check-in/Check-out </span>
        </div>
      </div>
      <div className="w-96 h-96 rounded-3xl bg-[#16242f] flex items-center justify-center item item--3">
        <span className="text-white text-2xl quantity"> 150+ </span>
        <span className="text-white text-2xl text text--3"> Mis reseñas </span>
      </div>
      <div className="w-96 h-96 rounded-3xl bg-[#16242f] flex items-center justify-center item item--4">
        <span className="text-white text-2xl quantity"> 30+ </span>
        <span className="text-white text-2xl text text--4"> Modificar mis Datos </span>
      </div>
    </div>
    </div>
  )
}

export default DashboardComponent