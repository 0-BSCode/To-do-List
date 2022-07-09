import React, { useState } from "react";
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
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import { db } from "../../../firebase-config";

const Note = ({ note, activeNoteId }) => {
  const [text, setText] = useState(note.text);
  const docRef = doc(db, "notes", note.id);

  const handleEdit = () => {
    activeNoteId.set(note.id);
  };

  const updateNote = async (e) => {
    await updateDoc(docRef, {
      text,
    });
    activeNoteId.set(-1);
  };

  const deleteNote = async (e) => {
    await activeNoteId.set(-1);
    await deleteDoc(docRef);
  };

  const finishNote = async (e) => {
    await updateDoc(docRef, {
      finished: !note.finished,
    });
  };

  const textStyle = note.finished
    ? { textDecoration: "line-through", color: "gray" }
    : null;

  return (
    <Card
      sx={{ minWidth: 500, maxWidth: 800, mx: "auto", mb: 2 }}
      variant={"outlined"}
    >
      {note.id !== activeNoteId.get ? (
        <>
          <CardContent>
            <Typography variant={"h4"} sx={textStyle}>
              {note.text}
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton aria-label="Edit" onClick={handleEdit}>
              <EditIcon data-key={note.id} />
            </IconButton>
            <IconButton aria-label="Delete" onClick={(e) => deleteNote(e)}>
              <DeleteIcon />
            </IconButton>
            <IconButton aria-label="Finish" onClick={(e) => finishNote(e)}>
              <CheckIcon />
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
          <Button variant={"contained"} onClick={(e) => updateNote(e)}>
            SUBMIT
          </Button>
        </Stack>
      )}
    </Card>
  );
};

export default Note;
