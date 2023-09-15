import React from 'react'

const DashboardComponent = () => {
  return (
    <div>
    <div className="grid grid-cols-2 gap-8 p-4">
      <div className="w-60 h-60 rounded-3xl bg-[#16242f] flex items-center justify-center hitem item--1">

        <span className=" text-white text-2xl text--1"> Mis Reservas </span>

      </div>
      <div className="w-60 h-60 rounded-3xl bg-[#16242f] flex items-center justify-center item item--2">

        <span className=" text-white text-xl text--1"> Hacer Check-in/Check-out </span>

      </div>
      <div className="w-60 h-60 rounded-3xl bg-[#16242f] flex items-center justify-center item item--3">

        <span className="text-white text-2xl text text--3"> Mis reseñas </span>
      </div>
      <div className="w-60 h-60 rounded-3xl bg-[#16242f] flex items-center justify-center item item--4">

        <span className="text-white text-2xl text text--4"> Modificar mis Datos </span>
      </div>
    </div>
    </div>
  )
}

export default DashboardComponent