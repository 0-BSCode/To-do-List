import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { db, auth } from "../../firebase-config";
import { signOut } from "firebase/auth";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  serverTimestamp,
  where,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

const Entry = () => {
  const [text, setText] = useState("");
  const [notes, setNotes] = useState([]);
  const notesCollectionRef = collection(db, "notes");

  console.log(auth.currentUser.uid);
  const notesQuery = query(
    notesCollectionRef,
    where("createdBy", "==", auth.currentUser.uid)
  );

  useEffect(() => {
    const unsubNotes = onSnapshot(notesQuery, (snapshot) => {
      const notes = [];
      snapshot.docs.forEach((doc) => {
        notes.push({ ...doc.data(), id: doc.id });
      });

      setNotes(notes);
    });
  }, []);

  const saveText = async (e) => {
    e.preventDefault();

    if (text !== "") {
      await addDoc(notesCollectionRef, {
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
