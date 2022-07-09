import React from "react";
import { Button } from "@mui/material";
import { auth } from "../../firebase-config";
import { signOut } from "firebase/auth";

const Logout = () => {
  const logout = async (e) => {
    await signOut(auth);
  };

  return (
    <Button variant={"outlined"} onClick={(e) => logout(e)}>
      Logout
    </Button>
  );
};

export default Logout;
