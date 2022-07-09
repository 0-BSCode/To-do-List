import React, { useState, useEffect } from "react";
import Entry from "../Entry";
import Notes from "../Notes";
import Logout from "../Logout";
import { db, auth } from "../../firebase-config";
import {
  collection,
  query,
  orderBy,
  where,
  onSnapshot,
} from "firebase/firestore";
import { Stack } from "@mui/material";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [activeNoteId, setActiveNoteId] = useState(-1);

  const notesCollectionRef = collection(db, "notes");

  const notesQuery = query(
    notesCollectionRef,
    orderBy("dueTime", "asc"),
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

  return (
    <Stack spacing={2} alignItems={"center"} sx={{ m: 3 }}>
      <Logout />
      <Entry />
      <Notes
        notes={notes}
        activeNoteId={{ get: activeNoteId, set: setActiveNoteId }}
      />
    </Stack>
  );
};

export default Home;
