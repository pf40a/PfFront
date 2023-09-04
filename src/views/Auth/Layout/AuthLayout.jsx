import { Grid, Typography, TextField, Button, Link } from "@mui/material";
import { Google, Padding } from "@mui/icons-material";

import style from "./AuthLayout.module.css";

const AuthLayout = ({ children, title = "" }) => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", padding: 4, backgroundColor: "#111e26" }}
    >
      <Grid
        item
        className={style.box}
        xs={3}
        sx={{
          width: { sm: 450, md: 600 },
          backgroundColor: "#fff",
          padding: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" sx={{ mb: 1 }}>
          {title}
        </Typography>
        {children}
      </Grid>
    </Grid>
  );
};

export default AuthLayout;
