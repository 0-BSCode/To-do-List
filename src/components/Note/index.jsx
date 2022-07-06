import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { db } from "../../firebase-config";

const Note = ({ note }) => {
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState(note.text);
  const docRef = doc(db, "notes", note.id);

  const updateNote = async (e) => {
    await updateDoc(docRef, {
      text,
    });
    setEdit(false);
  };

  const deleteNote = async (e) => {
    await deleteDoc(docRef);
  };

  return (
    <Card sx={{ maxWidth: 800, mx: "auto", mb: 2 }} variant={"outlined"}>
      {!edit ? (
        <>
          <CardContent>
            <Typography variant={"h4"}>{note.text}</Typography>
          </CardContent>
          <CardActions>
            <IconButton
              aria-label="Edit"
              onClick={(e) => {
                console.log(text);
                setEdit(!edit);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton aria-label="Delete" onClick={(e) => deleteNote(e)}>
              <DeleteIcon />
            </IconButton>
          </CardActions>
        </>
      ) : (
        <>
          <TextField value={text} onChange={(e) => setText(e.target.value)} />
          <Button variant={"contained"} onClick={(e) => updateNote(e)}>
            SUBMIT
          </Button>
        </>
      )}
    </Card>
  );
};

export default Note;
