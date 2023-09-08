import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Alert, Button, Grid, Link, TextField } from "@mui/material";

import AuthLayout from "../Layout/AuthLayout";
import { useForm } from "../../../Hooks/useForm";

const formData = { email: "" };

const formValidations = {
  email: [
    (value) => value.trim() !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    "El correo debe ser válido (debe ser un correo electrónico)",
  ],
};

const PassRecoverPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const { email, emailValid, onInputChange, isFormValid } = useForm(
    formData,
    formValidations
  );

  // ----- Obtener id de la BD de acuerdo al correo proporcionado -----

  const getId = async () => {
    try {
      const userId = await axios.post(
        "http://localhost:3001/hotel/users/login",
        { email: email }
      );
      const { id } = userId.data.data;
      return id;
    } catch (error) {
      return { msg: "Error obteniendo los datos del backend: ", error };
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (!isFormValid) return;

    try {
      getId().then(async (result) => {
        if (result) {
 
          const response = await axios.put( `http://localhost:3001/hotel/users/${result}`, { email: email } );

          if (response.data) {
            setShowMessage(true);
            console.log(
              "Se ha enviado un enlace al email proporcionado para cambiar la contraseña",
              response.data
            );
          }
        }
      });
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  return (
    <AuthLayout title="Recuperar Contraseña">
      <form onSubmit={onSubmit}>
        <Grid container>
          {/* Correo */}

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="example@example.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={emailValid && formSubmitted ? emailValid : ""}
            />
          </Grid>
        </Grid>

        {/* Enviar */}

        <Grid item xs={12} sx={{ mt: 2 }} display={!!showMessage ? "" : "none"}>
          <Alert severity="info">
            Se ha enviado un correo al email proporcionado para restablecer la
            contraseña.
          </Alert>
        </Grid>

        <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
          <Grid item xs={12}>
            <Button
              sx={{
                backgroundColor: "#111E26",
                "&:hover": { backgroundColor: "#1e3451" },
              }}
              disabled={!isFormValid}
              type="submit"
              variant="contained"
              fullWidth
            >
              Enviar
            </Button>
          </Grid>
        </Grid>

        <Grid container direction="row" justifyContent="center">
          <Link component={RouterLink} color="#111E26" to="/login">
            Regresar
          </Link>
        </Grid>

      </form>
    </AuthLayout>
  );
};

export default PassRecoverPage;