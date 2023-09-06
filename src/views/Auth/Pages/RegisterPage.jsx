import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";

import AuthLayout from "../Layout/AuthLayout";
import { useForm } from "../../../Hooks/useForm";
import { checkingCredentials, login, logout } from "../../../redux/actions";
import { registerUserWithEmailPassword } from "../../../Firebase/Providers";

const formData = {
  nombre: "",
  apellido: "",
  email: "",
  password: "",
};

const formValidations = {
  nombre: [(value) => value.trim() !== "", "Este campo es obligatorio"],
  apellido: [(value) => value.trim() !== "", "Este campo es obligatorio"],
  email: [
    (value) => value.trim() !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    "El correo debe ser válido (debe ser un correo electrónico)",
  ],
  password: [
    (value) =>
      value.trim() !== "" &&
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/.test( value ),
    "La contraseña debe tener al menos 6 caracteres y contener al menos una letra mayúscula, una minúscula, un número y un carácter especial",
  ],
};

const RegisterPage = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const { status, errorMessage } = useSelector((state) => state.auth);

  const isCheckingAuthentication = useMemo( () => status === "checking", [status] );

  const {
    nombre, nombreValid, apellido, apellidoValid,
    email, emailValid, password, passwordValid,
    onInputChange, isFormValid, formState,
  } = useForm(formData, formValidations);

  useEffect(() => {
    if(status === "authenticated"){
      navigate("/");
    }
  }, [ status ]);

  const startCreatingUserWithEmailPassword = ({ email, password, nombre, apellido }) => {
    return async (dispatch) => {
      dispatch(checkingCredentials());

      const displayName = `${nombre} ${apellido}`;

      const result = await registerUserWithEmailPassword({ email, password, displayName });
      if (!result.ok) return dispatch(logout(result.errorMessage));
      const resultCopia = {...result, nombre: nombre, apellido: apellido};
      console.log(resultCopia);
      
      dispatch(login(resultCopia));
      return result;
    };
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;

    const updatedFormState = {
      ...formState,
      displayName: `${formState.nombre} ${formState.apellido}`,
    };

    dispatch(startCreatingUserWithEmailPassword(updatedFormState))
    .then(async (result) => {

      if (result.ok) {

        // Creando una copia de updatedFormState
        const updatedFormStateCopia = { ...updatedFormState };

        // Registro exitoso, actualiza el updatedFormStateCopia con el uid
        updatedFormStateCopia.id = result.uid;

        // Eliminando el displayName de updatedFormStateCopia
        delete updatedFormStateCopia.displayName;

        try {
          const response = await axios.post( "http://localhost:3001/hotel/users", updatedFormStateCopia );
          if (response.data) {
            console.log("Usuario creado", response.data);
          }
        }
        catch (error) {
          console.error("Error sending data to backend:", error);
        }
      }
    });
  };

  return (
    <AuthLayout title="Crear Cuenta">
      <form onSubmit={onSubmit}>
        <Grid container>
          {/* Nombre */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Nombre"
              type="text"
              placeholder="Nombre"
              fullWidth
              name="nombre"
              value={nombre}
              onChange={onInputChange}
              error={!!nombreValid && formSubmitted}
              helperText={!!nombreValid && formSubmitted ? nombreValid : ""}
            />
          </Grid>

          {/* Apellido */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Apellido"
              type="text"
              placeholder="Apellido"
              fullWidth
              name="apellido"
              value={apellido}
              onChange={onInputChange}
              error={!!apellidoValid && formSubmitted}
              helperText={apellidoValid && formSubmitted ? apellidoValid : ""}
            />
          </Grid>

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

          {/* Contraseña */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid && formSubmitted ? passwordValid : ""}
            />
          </Grid>

          {/* Crear Cuenta */}
          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} display={!!errorMessage ? "" : "none"}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>

            <Grid item xs={12}>
              <Button
                sx={{
                  backgroundColor: "#111E26",
                  "&:hover": { backgroundColor: "#1e3451" },
                }}
                disabled={isCheckingAuthentication}
                type="submit"
                variant="contained"
                fullWidth
              >
                Crear Cuenta
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Typography color="#111E26" sx={{ mr: 1 }}>
              ¿Ya tienes cuenta?
            </Typography>
            <Link component={RouterLink} color="#111E26" to="/login">
              Ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
