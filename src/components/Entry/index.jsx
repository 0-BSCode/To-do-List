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
import parseTimeForTextField from "../../_utils/parseTimeForTextField";

const Entry = () => {
  const [text, setText] = useState("");
  const [disable, setDisable] = useState(false);
  const [time, setTime] = useState(parseTimeForTextField(new Date(), false));
  const notesCollectionRef = collection(db, "notes");

  const handleChange = (e) => {
    setTime(e.target.value);
  };

  const saveText = async (e) => {
    e.preventDefault();

    const [hours, minutes] = time.split(":");
    const d = new Date();
    d.setHours(hours);
    d.setMinutes(minutes);

    await setDisable(true);
    if (text !== "") {
      await addDoc(notesCollectionRef, {
        text,
        createdAt: serverTimestamp(),
        createdBy: auth.currentUser.uid,
        dueTime: d,
        displayTime: parseTimeForTextField(d, true),
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

        <TextField
          id="time"
          label="Time"
          type="time"
          value={time}
          onChange={(e) => handleChange(e)}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
          sx={{ width: 150 }}
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
