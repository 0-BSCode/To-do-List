import React, { useState } from "react";
import { auth } from "../../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Grid, Paper, TextField, Button, Typography } from "@mui/material";

const LoginForm = ({ hasAccount }) => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const login = async (e) => {
    await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
  };
  return (
    <Paper>
      <Grid
        container
        spacing={3}
        direction={"column"}
        justify={"center"}
        alignItems={"center"}
        mt={3}
      >
        <Typography variant="h1">Login</Typography>
        <Grid item xs={12}>
          <TextField
            label="Email"
            type={"email"}
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Password"
            type={"password"}
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant={"contained"} fullWidth onClick={(e) => login(e)}>
            Login
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="p">No account?</Typography>
          <Button onClick={(e) => hasAccount.set(false)}>Sign up</Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default LoginForm;
