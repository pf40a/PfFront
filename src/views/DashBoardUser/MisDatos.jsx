import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import {
  Alert, Button, Grid, Link, TextField, Typography,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from "@mui/material";
import { SaveAlt } from "@mui/icons-material";

import DashUserLayout from "./Layout/DashUserLayout.jsx";

const MisDatos = () => {
  const { email } = useSelector((state) => state.auth);

  // Estados para llenar los campos automaticamente y para hacer el put
  const [id, setId] = useState(""); // Estado para el id
  const [nombres, setNombre] = useState(""); // Estado para el campo de nombre
  const [apellidos, setApellido] = useState(""); // Estado para el campo de apellido
  const [correo, setCorreo] = useState(""); // Estado para el campo de correo
  const [password, setPassword] = useState(false); // Estado para el password
  const [google, setGoogle] = useState(false); // Estado para el usurio de google

  // Estados de verificación
  const [isDirty, setIsDirty] = useState([false, false, false]); // Estado para el cambio en los campos

  const [showMessage, setShowMessage] = useState(false); // Estado para mostrar el mensaje
  const [showWarning, setShowWarning] = useState(false); // Estado para mostrar el mensaje
  const [showEmailField, setShowEmailField] = useState(false); // Estado para mostrar u ocultar el campo de correo
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false); // Estado para mostrar el diálogo de confirmación

  const isSaveButtonDisabled = isDirty.some((dirty, index) => dirty && !([nombres, apellidos, correo][index]));

  const getId = async () => {
    try {
      const userId = await axios.post( `${import.meta.env.VITE_API_URL}/hotel/users/login`, { email: email } );
      return userId.data.data;
    } catch (error) {
      return { msg: "Error obteniendo los datos del backend: ", error };
    }
  };

  useEffect(() => {
    // Llamada a la función para obtener los datos del backend cuando el componente se monta
    getId().then((userData) => {
      if (userData && userData.id) {
        setId(userData.id);
        setCorreo(userData.email);
        setNombre(userData.nombre);
        setApellido(userData.apellido);
        setPassword(userData.password);
        setGoogle(userData.googleUser);
      }
    });
  }, []);

  // Funciones para manejar los cambios en los campos
  const handleNombreChange = (event) => {
    setNombre(event.target.value);
    setIsDirty([true, isDirty[1], isDirty[2]]);
  };

  const handleApellidoChange = (event) => {
    setApellido(event.target.value);
    setIsDirty([isDirty[0], true, isDirty[2]]);
  };

  const handleEmailChange = (event) => {
    setCorreo(event.target.value);
    setIsDirty([isDirty[0], isDirty[1], true]);
  };

  // Función para mostrar el mensaje de warning al hacer click en "Cambiar contraseña"
  const toggleWarning = () => {
    setShowWarning(true);
    setTimeout(() => { setShowWarning(false); }, 5000);
  };

  // Función para mostrar u ocultar el campo de correo al hacer click en "Cambiar contraseña"
  const toggleEmailField = () => {
    // Mostrar el diálogo de confirmación antes de mostrar el campo de correo
    setShowConfirmationDialog(true);
  };

  // Función para confirmar que el usuario quiere cambiar la contraseña
  const confirmChangePassword = () => {
    setShowConfirmationDialog(false);
    setShowEmailField(true);
    setPassword(true);
  };
  
  // Función para cancelar el cambio de contraseña
  const cancelChangePassword = () => {
    setShowConfirmationDialog(false);
  };

  // Funcion para guardar los cambios en los campos
  const onSubmit = async (event) => {
    event.preventDefault();

    setIsDirty([false, false, false]);
    setShowEmailField(false);

    setShowMessage(true);
    setTimeout(() => { setShowMessage(false); }, 5000);

    const dataToSend = {
      nombre: nombres,
      apellido: apellidos,
      email: correo,
      password,
    }

    try {
      const response = await axios.put( `${import.meta.env.VITE_API_URL}/hotel/users/${id}`, dataToSend );

      if (response.data) {
        if(password === true){
          console.log("Se envió un enlace para restablecer la contraseña.");
          setPassword(false);
        }
        else{
          console.log("Datos actualizados satisfactoriamente.");
        }
      }
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  return (
    <DashUserLayout title="Mis datos">
      <form onSubmit={onSubmit}>
        <Grid container>

          {/* -------- Nombre -------- */}

          <Grid container alignItems="center" sx={{ mb: 2 }}>
            <Grid item sx={{ mb: 1 }}>
              <Typography color="#000">Nombre:</Typography>
            </Grid>

            <Grid item xs={12} sx={{ mr: 2 }}>
              <TextField
                label={nombres || "Sin nombre"}
                type="text"
                placeholder="Nombre"
                fullWidth
                name="nombre"
                value={nombres}
                onChange={handleNombreChange}
              />
            </Grid>
          </Grid>

          {/* -------- Apellido -------- */}

          <Grid container alignItems="center">
            <Grid item sx={{ mb: 1 }}>
              <Typography color="#000">Apellido:</Typography>
            </Grid>

            <Grid item xs={12} sx={{ mr: 2 }}>
              <TextField
                label={apellidos || "Sin apellido"}
                type="text"
                placeholder="Apellido"
                fullWidth
                name="apellido"
                value={apellidos}
                onChange={handleApellidoChange}
              />
            </Grid>
          </Grid>

          {/* -------- Cambiar contraseña (texto) -------- */}

          <Grid item sx={{ mt: 2 }}>
            <Link
              color="#111E26"
              sx={{ cursor: "pointer" }}
              onClick={google ? toggleWarning : toggleEmailField}
            >
              Cambiar contraseña
            </Link>
            {showWarning && (
              <Alert severity="warning" sx={{ mt: 2 }}>
                Como te has registrado con Google, esta opción no se encuentra disponible.
              </Alert>
            )}
          </Grid>

          {/* ---- Campo de correo (mostrado u oculto según el estado) ---- */}

          {showEmailField && (
            <Grid container>
              <Grid item xs={12} sx={{ mt: 2 }}>
                <Alert severity="info">
                  Se enviará un enlace al correo proporcionado para restablecer
                  la contraseña.
                </Alert>
              </Grid>

              <Grid item xs={12} sx={{ mt: 2 }}>
                <TextField
                  label={correo || "Sin Correo"}
                  type="email"
                  placeholder="example@example.com"
                  fullWidth
                  name="email"
                  value={correo}
                  onChange={handleEmailChange}
                />
              </Grid>
            </Grid>
          )}

          {/* -------- Guardar y Mensaje -------- */}

          <Grid item container alignItems="center" xs={12} sx={{ mt: 2 }}>
            <Button
              sx={{
                backgroundColor: "#38a169",
                "&:hover": { backgroundColor: "#56c196" },
                mr: 2,
              }}
              disabled={!isDirty.some((dirty, index) => dirty) ||isSaveButtonDisabled}
              title="Guardar"
              type="submit"
              variant="contained"
            >
              <SaveAlt />
            </Button>

            <Grid item display={showMessage ? "" : "none"}>
              <Alert severity="success">
                Datos actualizados satisfactoriamente.
              </Alert>
            </Grid>
          </Grid>
        </Grid>
      </form>

      {/* --------- Diálogo de confirmación para cambiar la contraseña --------- */}

      <Dialog open={showConfirmationDialog} onClose={cancelChangePassword}>
        <DialogTitle>Confirmar Cambio de Contraseña</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Está seguro de que quiere cambiar la contraseña?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelChangePassword} color="primary">
            Cancelar
          </Button>
          <Button onClick={confirmChangePassword} color="primary" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </DashUserLayout>
  );
};

export default MisDatos;