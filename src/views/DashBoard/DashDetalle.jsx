import { useEffect, useState } from 'react';
import axios from 'axios';

function UserDetail({ userId, onClose }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Realizar la solicitud Axios para obtener los detalles del usuario
    axios.get(`${import.meta.env.VITE_API_URL}/api/usuario/${userId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los detalles del usuario', error);
      });
  }, [userId]);

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <button onClick={onClose}>Cerrar</button>
      <img src={user.imagen} alt="Imagen de perfil" />
      <p>Nombre: {user.nombre}</p>
      <p>Apellido: {user.apellido}</p>
      <p>Correo Electrónico: {user.correo}</p>
    </div>
  );
}

export default UserDetail;
