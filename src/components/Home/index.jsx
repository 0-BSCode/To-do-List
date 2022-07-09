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
import { Stack, Typography } from "@mui/material";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [activeNoteId, setActiveNoteId] = useState(-1);

  const notesCollectionRef = collection(db, "notes");

  const notesQuery = query(
    notesCollectionRef,
    where("createdBy", "==", auth.currentUser.uid),
    orderBy("createdAt", "desc")
  );

  useEffect(() => {
    onSnapshot(notesQuery, (snapshot) => {
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
      <Entry notes={notes} />
      {notes.length > 0 ? (
        <Notes
          notes={notes}
          activeNoteId={{ get: activeNoteId, set: setActiveNoteId }}
        />
      ) : (
        <Typography variant="p">No tasks for now.</Typography>
      )}
    </Stack>
  );
};

export default Home;
