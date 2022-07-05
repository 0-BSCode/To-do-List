import React, { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase-config";
import { Grid, Paper, TextField, Button } from "@mui/material";

const SignupForm = () => {
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const createUser = async (e) => {
    if (signupEmail.length && signupPassword.length) {
      await createUserWithEmailAndPassword(auth, signupEmail, signupPassword);
    }
  };

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
        <Grid item xs={12}>
          <TextField
            label="Email"
            type={"email"}
            value={signupEmail}
            onChange={(e) => setSignupEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Password"
            type={"password"}
            value={signupPassword}
            onChange={(e) => setSignupPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant={"contained"}
            fullWidth
            onClick={(e) => createUser(e)}
          >
            Sign Up
          </Button>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={3}
        direction={"column"}
        justify={"center"}
        alignItems={"center"}
        mt={3}
      >
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
      </Grid>
    </Paper>
  );
};

export default SignupForm;
