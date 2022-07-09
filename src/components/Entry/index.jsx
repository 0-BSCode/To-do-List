import React, { useState, useEffect } from "react";
import { TextField, Button, Stack, Paper } from "@mui/material";
import { db, auth } from "../../firebase-config";
import { signOut } from "firebase/auth";
import {
  collection,
  addDoc,
  serverTimestamp,
  where,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

const Entry = () => {
  const [text, setText] = useState("");
  const [disable, setDisable] = useState(false);
  const notesCollectionRef = collection(db, "notes");

  const saveText = async (e) => {
    e.preventDefault();

    await setDisable(true);
    if (text !== "") {
      await addDoc(notesCollectionRef, {
        text,
        createdAt: serverTimestamp(),
        createdBy: auth.currentUser.uid,
        finished: false,
      });
      setText("");
    }
    await setDisable(false);
  };

  return (
    <>
      <Stack direction={"row"} spacing={1} justifyContent={"center"}>
        <TextField
          label="Reminder"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <Button
          alignSelf={"center"}
          disabled={disable}
          variant={"contained"}
          onClick={(e) => saveText(e)}
        >
          Submit
        </Button>
      </Stack>
    </>
  );
};

export default Entry;
