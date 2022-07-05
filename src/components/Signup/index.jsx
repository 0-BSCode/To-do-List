import React, { useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Grid, Paper, TextField, Button } from "@mui/material";

const SignupForm = () => {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createUser = async (e) => {
    if (email.length && password.length) {
      await createUserWithEmailAndPassword(auth, email, password);
    }
  };

  return (
    <Paper>
      <Grid
        container
        spacing={3}
        direction={"column"}
        justify={"center"}
        alignItems={"center"}
      >
        <Grid item xs={12}>
          <TextField
            label="Email"
            type={"email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Password"
            type={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
    </Paper>
  );
};

export default SignupForm;
