import { TextField, Button, Typography, Grid } from "@mui/material";
import { useState, useEffect } from "react";
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
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "./firebase-config";
import SignupForm from "./components/Signup";
import Entry from "./components/Entry";

function App() {
  const [notes, setNotes] = useState([]);
  const notesCollectionRef = collection(db, "notes");
  const notesQuery = query(notesCollectionRef, orderBy("createdAt", "desc"));

  useEffect(() => {
    const unsubNotes = onSnapshot(notesQuery, (snapshot) => {
      const notes = [];
      snapshot.docs.forEach((doc) => {
        notes.push({ ...doc.data(), id: doc.id });
      });

      setNotes(notes);

      const unsubAuth = onAuthStateChanged(auth, (user) => {
        console.log(auth.currentUser);
      });
    });
  }, []);

  console.log(auth.currentUser);
  console.log(notes);
  return (
    <>
      {auth.currentUser ? (
        <Entry notes={notes} collectionRef={notesCollectionRef} />
      ) : (
        <SignupForm />
      )}
    </>
  );
}

export default App;
