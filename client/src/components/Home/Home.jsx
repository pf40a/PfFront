import React from "react";

const Home = () => {
  return (
    <div class="flex min-h-screen items-center justify-center bg-neutral-900">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-20">
        <div className="group relative items-center justify-center overflow-hidden cursor-pointer hover:shadow-xl hover:shadow-black/30 transition-shadow">
          <div className="h-96 w-72">
            <img
              class="h-full w-full object-cover group-hover:rotate-3 group-hover:scale-125 transition-transform duration-500"
              src="https://plus.unsplash.com/premium_photo-1675537843200-78c1a0ea1736?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
              alt=""
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center px-9 text-center translate-y-[60%] group-hover:translate-y-0 transition-all duration-700">
            <h1 class="text-4xl font-bold text-white">Economica</h1>
            <p class="text-lg italic text-white mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              Donde la sencillez se combina con la comodidad. Disfruta de un
              espacio acogedor que te brinda todo lo necesario para un descanso
              tranquilo.
            </p>
            <button class="rounded-full shadow shadow-white/60 bg-neutral-600 py-2 px-3.5 text-sm capitalize text-white">
              See More
            </button>
          </div>
        </div>

        <div className="group relative items-center justify-center overflow-hidden cursor-pointer hover:shadow-xl hover:shadow-black/30 transition-shadow">
          <div className="h-96 w-72">
            <img
              class="h-full w-full object-cover group-hover:rotate-3 group-hover:scale-125 transition-transform duration-500"
              src="https://images.unsplash.com/photo-1531835551805-16d864c8d311?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGRvcm1pdG9yaW8lMjBwcmVtaXVtfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
              alt=""
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center px-9 text-center translate-y-[60%] group-hover:translate-y-0 transition-all duration-700">
            <h1 class="text-4xl font-bold text-white">Confort</h1>
            <p class="text-lg italic text-white mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              Eleva tus sueños a un nivel superior con nuestra opción
              intermedia. Sumérgete en un mundo de comodidad con nuestro
              dormitorio Confort. Un sueño reparador.
            </p>
            <button class="rounded-full shadow shadow-white/60 bg-neutral-600 py-2 px-3.5 text-sm capitalize text-white">
              See More
            </button>
          </div>
        </div>

        <div className="group relative items-center justify-center overflow-hidden cursor-pointer hover:shadow-xl hover:shadow-black/30 transition-shadow">
          <div className="h-96 w-72">
            <img
              class="h-full w-full object-cover group-hover:rotate-3 group-hover:scale-125 transition-transform duration-500"
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
            <button class="rounded-full shadow shadow-white/60 bg-neutral-600 py-2 px-3.5 text-sm capitalize text-white">
              See More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
