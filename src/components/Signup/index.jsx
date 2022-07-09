import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";
import { Grid, Paper, TextField, Button, Typography } from "@mui/material";

const SignupForm = ({ hasAccount }) => {
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const createUser = async (e) => {
    if (signupEmail.length && signupPassword.length) {
      await createUserWithEmailAndPassword(auth, signupEmail, signupPassword);
    }
  };

  return (
    <>
      <Grid
        container
        spacing={3}
        direction={"column"}
        justify={"center"}
        alignItems={"center"}
        mt={3}
      >
        <Typography variant="h1">Sign Up</Typography>
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
        <Grid item xs={12}>
          <Typography variant="p">Already have an account?</Typography>
          <Button onClick={(e) => hasAccount.set(true)}>Login</Button>
        </Grid>
      </Grid>
    </>
  );
};

export default SignupForm;
