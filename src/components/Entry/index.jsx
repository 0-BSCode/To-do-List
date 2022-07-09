import React, { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";
import { db, auth } from "../../firebase-config";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  deleteDoc,
} from "firebase/firestore";

const Entry = ({ notes }) => {
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

  const clearFinished = async (e) => {
    notes.forEach(async (note) => {
      if (note.finished) {
        const docRef = doc(db, "notes", note.id);
        await deleteDoc(docRef);
      }
    });
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
          disabled={disable}
          variant={"contained"}
          onClick={(e) => saveText(e)}
        >
          Submit
        </Button>
        <Button
          color={"secondary"}
          variant={"outlined"}
          onClick={(e) => clearFinished(e)}
        >
          Clear Finished
        </Button>
      </Stack>
    </>
  );
};

export default Entry;
