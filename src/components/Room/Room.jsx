import React from "react";

function Room() {
  return (
    <div className="bg-gray-300 flex border rounded-lg mx-auto w-1/2 h-80 ml-10 self-end">
      <div
        className="w-1/3 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://plus.unsplash.com/premium_photo-1676320514175-8a41932fcd46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aGFiaXRhY2lvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60)",
          height: "100%",
          minHeight: "300px",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="w-2/3 p-4 flex flex-col justify-between">
        <div className="text-3xl font-bold ">FAMILIAR</div>
        <div className="text-lg mb-11">Economica</div>
        <div className="flex items-center text-xl mb-10">
          <span className="mr-1">2023-10-24 hasta 2023-10-27</span>
          <span className="mx-1">|</span>
          <span>Adultos 2 - Niños 1</span>
        </div>
        <div className="text-3xl font-bold flex items-center justify-center">
          <span className="mr-1">USD 250</span>
        </div>
        <div className="mt-auto flex justify-center">
          <button className="bg-yellow-700 text-white rounded-lg px-4 py-2 hover:bg-yellow-800">
            +Info
          </button>
          <button className="bg-yellow-700 text-white rounded-lg px-4 py-2 ml-2 hover:bg-yellow-800">
            Seleccionar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Room;
