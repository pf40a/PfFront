import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { Grid, Typography, TextField, Button, Link, Alert } from "@mui/material";
import { Google } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import AuthLayout from "../Layout/AuthLayout";
import { useForm } from "../../../Hooks/useForm";
import { checkingCredentials, login, logout } from "../../../redux/actions";
import { loginWithEmailPassword, singInWithGoogle } from "../../../Firebase/Providers";

const LoginPage = () => {
  const { status, errorMessage } = useSelector((state) => state.auth);

  const navigate = useNavigate()
  const dispatch = useDispatch();

  const { email, password, onInputChange } = useForm({
    email: "",
    password: "",
  });

  const isAuthenticating = useMemo(() => status === "checking", [status]);

  const startGoogleSignIn = () => {
    return async (dispatch) => {
      dispatch(checkingCredentials());
      const result = await singInWithGoogle();
      if (!result.ok) return dispatch(logout(result.errorMessage));

      dispatch(login(result));
    };
  };

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
  };

  const startLoginWithEmailPassword = ({ email, password }) => {
    return async (dispatch) => {
      dispatch(checkingCredentials());

      const result = await loginWithEmailPassword({ email, password });

      if (!result.ok) return dispatch(logout(result));
      dispatch(login(result));
    };
  };

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(startLoginWithEmailPassword({ email, password }));
    navigate("/")
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={onSubmit}>
        <Grid container>

          {/* Correo */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="example@exaple.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
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
            />
          </Grid>

          <Grid 
            container
            display={!!errorMessage ? "" : "none"}
            sx={{ mt: 1 }}
          >
            <Grid item xs={12} >
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            {/* Normal Login */}
            <Grid item xs={12} sm={6}>
              <Button
                sx={{
                  backgroundColor: "#111E26",
                  "&:hover": { backgroundColor: "#1e3451" },
                }}
                // disabled={isAuthenticating}
                type="submit"
                variant="contained"
                fullWidth
              >
              Login
              </Button>
            </Grid>

            {/* Google Login */}
            <Grid item xs={12} sm={6}>
              <Button
                sx={{
                  backgroundColor: "#111E26",
                  "&:hover": { backgroundColor: "#1e3451" },
                }}
                // disabled={isAuthenticating}
                onClick={onGoogleSignIn}
                variant="contained"
                fullWidth
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Link component={RouterLink} color="#111E26" to="/register">
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
