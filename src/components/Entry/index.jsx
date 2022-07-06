import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
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
import Note from "../Note";

const Entry = () => {
  const [text, setText] = useState("");
  const [notes, setNotes] = useState([]);
  const [disable, setDisable] = useState(false);
  const notesCollectionRef = collection(db, "notes");

  const notesQuery = query(
    notesCollectionRef,
    orderBy("createdAt", "desc"),
    where("createdBy", "==", auth.currentUser.uid)
  );

  useEffect(() => {
    const unsubNotes = onSnapshot(notesQuery, (snapshot) => {
      console.log("SNAPSHOT");
      console.log(snapshot);
      const notes = [];
      snapshot.docs.forEach((doc) => {
        notes.push({ ...doc.data(), id: doc.id });
      });

      setNotes(notes);
    });
  }, []);

  useEffect(() => {
    console.log("Current User: ", auth.currentUser.uid);
    console.log("Notes: ", notes);
  });

  const saveText = async (e) => {
    e.preventDefault();

    await setDisable(true);
    if (text !== "") {
      await addDoc(notesCollectionRef, {
        text,
        createdAt: serverTimestamp(),
        createdBy: auth.currentUser.uid,
      });
      setText("");
    }
    await setDisable(false);
  };

  const logout = async (e) => {
    await signOut(auth);
  };

  return (
    <>
      <TextField
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

      {notes.length && (
        <>
          {notes.map((note) => {
            return <Note note={note} />;
          })}
        </>
      )}
      <Button variant={"outlined"} onClick={(e) => logout(e)}>
        Logout
      </Button>
    </>
  );
};

export default Entry;
