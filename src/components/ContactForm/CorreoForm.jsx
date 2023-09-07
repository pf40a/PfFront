import { useState } from 'react';
import axios from 'axios';

function CorreoForm() {
  const [email, setEmail] = useState('');
  const [asunto, setAsunto] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleEnviarCorreo = async () => {
    // Combinamos el mensaje predefinido con el mensaje personalizado del usuario
    const mensajeCompleto = `Saludos de Oasis Hotel, recibimos tu mensaje y contactaremos contigo en las próximas 24 horas.

    Tu mensaje:
    ${mensaje}`;

    // Envío de correo
    try {
      let mensaje = mensajeCompleto;
      const response = await axios.post(
        "http://localhost:3001/hotel/email",
        { email, asunto, mensaje }
      );

      if (response.data.message) {
        window.alert("Correo electrónico enviado");
      }
    } catch (error) {
      if (error.response.data.error) {
        window.alert("Correo electrónico no válido");
      }
    }

    setEmail('');
    setAsunto('');
    setMensaje('');
  };

  return (
    <div className="flex items-center justify-center h-100">
      <div className="bg-gray-100 p-4 rounded-md shadow-md my-4">
        <h1 className="text-2xl font-semibold mb-4">Contáctanos</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
             Tu Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="asunto">
              Asunto:
            </label>
            <input
              type="text"
              id="asunto"
              value={asunto}
              onChange={(e) => setAsunto(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="mensaje">
              Mensaje:
            </label>
            <textarea
              id="mensaje"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <button
            className="w-full bg-blue-500 text-white py-2 rounded-md"
            type="button"
            onClick={handleEnviarCorreo}
          >
            Recibir correo
          </button>
        </form>
      </div>
    </div>
  );
}

export default CorreoForm;
