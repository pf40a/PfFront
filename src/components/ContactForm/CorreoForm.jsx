import { useState } from 'react';
import axios from 'axios';

function CorreoForm() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [asunto, setAsunto] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleEnviarCorreo = async () => {
    // Combinamos el mensaje predefinido con el mensaje personalizado del usuario
    const mensajeCompleto = `Saludos de Oasis Hotel, recibimos tu mensaje y contactaremos contigo en las próximas 24 horas.

    
    Tu mensaje:${mensaje}`;

    const mensajeCompletoHotel = `Correo automatico, usuario envió un nuevo mensaje para contacto.

    Nombres: ${nombre},
    Correo: ${email},
    mensaje: ${mensaje}`;

    // Envío de correo
    try {
      let mensaje = mensajeCompleto;
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/hotel/email`,
        { email, asunto, mensaje, nombre }
      );

      if (response.data.message) {
        window.alert("Correo electrónico enviado");
      }
    } catch (error) {
      if (error.response.data.error) {
        window.alert("Correo electrónico no válido");
      }
    }
    // Envío correo a Oasis Hotel gmail

    try {
      let email = "pf.henry40a@gmail.com"
      let mensaje = mensajeCompletoHotel;
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/hotel/email`,
        { email, asunto, mensaje, nombre }
      );

      if (response.data.message) {
        console.log("Correo electrónico enviado");
      }
    } catch (error) {
      if (error.response.data.error) {
        console.log("Correo electrónico no válido");
      }
    }
    
    setNombre('');
    setEmail('');
    setAsunto('');
    setMensaje('');
  };

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8 relative">
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contáctanos</h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
        Estamos aquí para ayudarte.
        </p>
      </div>
      <form className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
              Nombres
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                id="first-name"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
              Tu Email
            </label>
            <div className="mt-2.5">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="asunto" className="block text-sm font-semibold leading-6 text-gray-900">
              Asunto
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                id="asunto"
                value={asunto}
                onChange={(e) => setAsunto(e.target.value)}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="mensaje" className="block text-sm font-semibold leading-6 text-gray-900">
              Mensaje
            </label>
            <div className="mt-2.5">
              <textarea
                id="mensaje"
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            className="block w-full rounded-md bg-black px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-black/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            type="button"
            onClick={handleEnviarCorreo}
          >
            Enviar correo
          </button>
        </div>
      </form>
    </div>
  );
}

export default CorreoForm;
