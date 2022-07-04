import { TextField, Button, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { collection, getDocs, addDoc, doc } from "firebase/firestore";
import { db, auth } from "./firebase-config";

function App() {
  const [text, setText] = useState("");
  const [notes, setNotes] = useState([]);
  const notesCollectionRef = collection(db, "notes");

  const saveText = async (e) => {
    e.preventDefault();

    const newNote = await addDoc(notesCollectionRef, { text });
    console.log(newNote);
    setText("");
  };

  useEffect(() => {
    const getNotes = async () => {
      const data = await getDocs(notesCollectionRef);
      setNotes(data.docs.map((doc) => ({ ...doc.data() })));
    };

    getNotes();
  });

  return (
    <>
      <TextField
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />

      <Button variant={"outlined"} onClick={(e) => saveText(e)}>
        Submit
      </Button>

      {notes.map((note) => {
        return <Typography variant="p">{note.text}</Typography>;
      })}
    </>
  );
}

export default App;
