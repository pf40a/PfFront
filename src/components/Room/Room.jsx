import React from "react";

function Room({handleClick, id ,tipo_Habitacion,subTipo,precio,image }) {

  return (
    <div
    id={id}
    className="bg-gray-300 flex flex-col sm:flex-row border rounded-lg mx-auto w-full h-auto sm:h-80 sm:ml-10 self-stretch"
  >
    <div className="sm:max-w-sm border border-gray-300 rounded-lg overflow-hidden">
      <img className="h-full w-full  sm:h-auto" src={image} alt="" />
    </div>
    <div className="w-full sm:w-2/3 p-4 flex flex-col justify-between">
      <div className="text-xl sm:text-3xl font-bold mb-2 sm:mb-4">{tipo_Habitacion}</div>
      <div className="text-base sm:text-lg mb-4">{subTipo}</div>
      <div className="flex flex-col sm:flex-row items-center text-base sm:text-lg mb-4">
        <span className="mr-1">2023-10-24 hasta 2023-10-27</span>
        <span className="mx-1 hidden sm:inline">|</span>
        <span className="sm:ml-1">Adultos 2 - Niños 1</span>
      </div>
      <div className="text-xl sm:text-3xl font-bold flex items-center justify-center mb-4">
        <span className="mr-1">${precio} USD</span>
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleClick}
          className="bg-yellow-700 text-white rounded-lg px-4 py-2 hover:bg-yellow-800 mb-2 sm:mb-0 sm:mr-2"
        >
          +Info
        </button>
        <button className="bg-yellow-700 text-white rounded-lg px-4 py-2 hover:bg-yellow-800">
          Seleccionar
        </button>
      </div>
    </div>
  </div>
  );
}

export default Room;
