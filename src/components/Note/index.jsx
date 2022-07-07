import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import parseTimeForTextField from "../../_utils/parseTimeForTextField";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { db } from "../../firebase-config";

const Note = ({ note, activeNoteId }) => {
  const [text, setText] = useState(note.text);
  const [time, setTime] = useState(
    parseTimeForTextField(note.dueTime.toDate(), false)
  );
  const docRef = doc(db, "notes", note.id);

  const handleChange = (e) => {
    setTime(e.target.value);
  };

  const handleEdit = () => {
    activeNoteId.set(note.id);
  };

  const updateNote = async (e) => {
    const [hours, minutes] = time.split(":");
    const d = new Date();
    d.setHours(hours);
    d.setMinutes(minutes);

    await updateDoc(docRef, {
      text,
      dueTime: d,
      displayTime: parseTimeForTextField(d, true),
    });
    activeNoteId.set(-1);
  };

  const deleteNote = async (e) => {
    await activeNoteId.set(-1);
    await deleteDoc(docRef);
  };

  return (
    <Card sx={{ maxWidth: 800, mx: "auto", mb: 2 }} variant={"outlined"}>
      {note.id !== activeNoteId.get ? (
        <>
          <CardContent>
            <Typography variant={"h4"}>
              {note.text} | {note.displayTime}
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton aria-label="Edit" onClick={handleEdit}>
              <EditIcon data-key={note.id} />
            </IconButton>
            <IconButton aria-label="Delete" onClick={(e) => deleteNote(e)}>
              <DeleteIcon />
            </IconButton>
          </CardActions>
        </>
      ) : (
        <Stack
          direction={"row"}
          justifyContent={"center"}
          sx={{ m: 1.5 }}
          spacing={1}
        >
          <TextField value={text} onChange={(e) => setText(e.target.value)} />

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
          <Button variant={"contained"} onClick={(e) => updateNote(e)}>
            SUBMIT
          </Button>
        </Stack>
      )}
    </Card>
  );
};

export default Note;
