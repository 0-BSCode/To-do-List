import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { auth } from "../../firebase-config";
import { signOut } from "firebase/auth";

const Entry = ({ notes, collectionRef }) => {
  const [text, setText] = useState("");

  const saveText = async (e) => {
    e.preventDefault();

    if (text !== "") {
      await addDoc(collectionRef, {
        text,
        createdAt: serverTimestamp(),
        createdBy: auth.currentUser.uid,
      });
      setText("");
    }
  };

  const logout = async (e) => {
    await signOut(auth);
    console.log(auth.currentUser);
  };

  return (
    <>
      <TextField
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />

      <Button variant={"contained"} onClick={(e) => saveText(e)}>
        Submit
      </Button>

      {/* <Grid container> */}
      {notes.map((note) => {
        return <div item>{note.text}</div>;
      })}
      {/* </Grid> */}
      <Button variant={"outlined"} onClick={(e) => logout(e)}>
        Logout
      </Button>
    </>
  );
};

export default Entry;
