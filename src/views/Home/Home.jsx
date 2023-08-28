import React from "react";
import pool from "../../assets/imgHome/pool.png";
import wifi from "../../assets/imgHome/wifi.png";
import taxi from "../../assets/imgHome/taxi.png";
import bf from "../../assets/imgHome/breakfast.png";

const Home = () => {
  return (
    <div>
      <div className="w-full h-96">
        <img
          src="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex mt-36 items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-40">
          <div className="group relative items-center justify-center overflow-hidden cursor-pointer hover:shadow-xl hover:shadow-black/30 transition-shadow">
            <div className="h-96 w-72">
              <img
                className="h-full w-full object-cover group-hover:rotate-3 group-hover:scale-125 transition-transform duration-500"
                src="https://plus.unsplash.com/premium_photo-1675537843200-78c1a0ea1736?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                alt=""
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center px-9 text-center translate-y-[60%] group-hover:translate-y-0 transition-all duration-700">
              <h1 className=" bg-orange text-4xl font-bold text-white">
                Economica
              </h1>
              <p class="text-lg italic text-white mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                Donde la sencillez se combina con la comodidad. Disfruta de un
                espacio acogedor que te brinda todo lo necesario para un
                descanso tranquilo.
              </p>
              <button className="rounded-full shadow shadow-white/60 bg-neutral-600 py-2 px-3.5 text-sm capitalize text-white">
                See More
              </button>
            </div>
          </div>

          <div className="group relative items-center justify-center overflow-hidden cursor-pointer hover:shadow-xl hover:shadow-black/30 transition-shadow">
            <div className="h-96 w-72">
              <img
                className="h-full w-full object-cover group-hover:rotate-3 group-hover:scale-125 transition-transform duration-500"
                src="https://plus.unsplash.com/premium_photo-1675537843200-78c1a0ea1736?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                alt=""
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center px-9 text-center translate-y-[60%] group-hover:translate-y-0 transition-all duration-700">
              <h1 className=" bg-orange text-4xl font-bold text-white">
                Confort
              </h1>
              <p className="text-lg italic text-white mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                Eleva tus sueños a un nivel superior con nuestra opción
                intermedia. Sumérgete en un mundo de comodidad con nuestro
                dormitorio Confort.
              </p>
              <button className="rounded-full shadow shadow-white/60 bg-neutral-600 py-2 px-3.5 text-sm capitalize text-white">
                See More
              </button>
            </div>
          </div>

          <div className="group relative items-center justify-center overflow-hidden cursor-pointer hover:shadow-xl hover:shadow-black/30 transition-shadow">
            <div className="h-96 w-72">
              <img
                className="h-full w-full object-cover group-hover:rotate-3 group-hover:scale-125 transition-transform duration-500"
                src="https://images.unsplash.com/photo-1588046130717-0eb0c9a3ba15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjJ8fGRvcm1pdG9yaW8lMjBwcmVtaXVtfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
                alt=""
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center px-9 text-center translate-y-[60%] group-hover:translate-y-0 transition-all duration-700">
              <h1 class="text-4xl font-bold text-white">Gold</h1>
              <p class="text-lg italic text-white mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                Sumérgete en el máximo lujo con nuestro dormitorio Gold. Una
                experiencia de descanso que redefine la comodidad y la
                sofisticación.
              </p>
              <button className="rounded-full shadow shadow-white/60 bg-neutral-600 py-2 px-3.5 text-sm capitalize text-white">
                See More
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center  m-16">
        <p className="text-center text-4xl font-semibold font-serif">
          Nuestros Servicios
        </p>
        <p className="mt-3 text-center text-lg font-serif text-gray-800">
          Oasis Hotel te ofrece todos los servicios que necesitas.
        </p>
      </div>

      <div className="w-4/5 mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 place-content-center">
        <div className="flex flex-col items-center justify-center w-full h-full text-center">
          <img src={pool} alt="Piscina" className="w-15 h-15 mb-2 mx-auto" />
          <div className="flex flex-col items-center w-48">
            <p className="text-lg font-semibold">Piscina</p>
            <p className="mt-2 text-sm break-words">
              Disfruta de un refrescante baño junto a la piscina. El lugar
              perfecto para relajarte 10.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full h-full text-center">
          <img
            src={wifi}
            alt="WiFi Gratis"
            className="w-15 h-15 mb-2 mx-auto"
          />
          <div className="flex flex-col items-center w-48">
            <p className="text-lg font-semibold">WiFi Gratis</p>
            <p className="mt-2 text-sm break-words">
              Mantente conectado en nuestro Hotel con WiFi gratuito.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full h-full text-center">
          <img
            src={taxi}
            alt="Traslado al Aeropuerto"
            className="w-15 h-15 mb-2 mx-auto"
          />
          <div className="flex flex-col items-center w-48">
            <p className="text-lg font-semibold">Traslado al Aeropuerto</p>
            <p className="mt-2 text-sm break-words">
              Traslados seguros desde el aeropuerto para tu comodidad.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full h-full text-center">
          <img src={bf} alt="Desayuno" className="w-15 h-15 mb-2 mx-auto" />
          <div className="flex flex-col items-center w-48">
            <p className="text-lg font-semibold">Desayuno</p>
            <p className="mt-2 text-sm break-words">
              Comienza el día con un delicioso desayuno preparado especialmente
              para ti.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
