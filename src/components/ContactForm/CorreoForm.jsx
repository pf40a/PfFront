import { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

function CorreoForm() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [asunto, setAsunto] = useState('');
  const [mensaje, setMensaje] = useState('');

  // Estado para controlar si el modal está abierto o cerrado
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función para abrir el modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    handleEnviarCorreo()
    closeModal();
  };

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
    <div className="flex items-center justify-center h-100">
      <div className="bg-gray-100 p-4 rounded-md shadow-md my-4">
        <h1 className="text-2xl font-semibold mb-4">Contáctanos</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
              Nombres:
            </label>
            <input
              type="email"
              id="email"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          </div>
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
            onClick={openModal}
          >
            Enviar correo
          </button>
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Confirmación"
            className="fixed inset-0 flex items-center justify-center z-50 outline-none"
            overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-50"
          >
            <div className="bg-white w-full max-w-md p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">¿Aceptas recibir información en este correo electronico?</h2>
              <div className="flex justify-end">
                <button
                  onClick={handleConfirm}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg mr-2"
                >
                  Confirmar
                </button>
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </Modal>
        </form>
      </div>
    </div>
  );
}

export default CorreoForm;
