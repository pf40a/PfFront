import { useState } from 'react';
import axios from 'axios';
import styles from './CorreoForm.module.css'

function CorreoForm() {
  const [email, setEmail] = useState('');
  const [asunto, setAsunto] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleEnviarCorreo = async () => {
    // Combinamos el mensaje predefinido con el mensaje personalizado del usuario
    const mensajeCompleto = `Saludos de Oasis Hotel, recibimos tu mensaje y contactaremos contigo en las próximas 24 horas.

    Tu mensaje:
    ${mensaje}`;

    //envio correo
    try {
      let mensaje = mensajeCompleto;
      const response = await axios.post(
        "http://localhost:3001/hotel/email",
        { email, asunto, mensaje }
      )

      if (response.data.message) {
        window.alert("Correo electronico enviado")
      }

    } catch (error) {
      if (error.response.data.error) {
        window.alert("Correo electronico no valido")
      }
    }

    
    setEmail('');
    setAsunto('');
    setMensaje('');
  };

  return (
    <div className={styles.container}>
      <h1>Enviar Correo</h1>
      <form className={styles.form}>
        <div>
          <label className={styles.label} htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
        </div>
        <div>
          <label className={styles.label}  htmlFor="asunto">Asunto:</label>
          <input
            type="text"
            id="asunto"
            value={asunto}
            onChange={(e) => setAsunto(e.target.value)}
            className={styles.input}
          />
        </div>
        <div>
          <label className={styles.label} htmlFor="mensaje">Mensaje:</label>
          <textarea
            id="mensaje"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            className={styles.input}
          />
        </div>
        <button className={styles.button} type="button" onClick={handleEnviarCorreo}>
          Enviar Correo
        </button>
      </form>
    </div>
  );
}

export default CorreoForm;