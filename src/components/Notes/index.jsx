import React from "react";
import { Paper } from "@mui/material";
import Note from "./Note";

const Notes = ({ notes, activeNoteId }) => {
  return (
    <Paper sx={{ p: 3 }}>
      {notes.length > 0 && (
        <>
          {notes.map((note) => {
            return (
              <Note key={note.id} note={note} activeNoteId={activeNoteId} />
            );
          })}
        </>
      )}
    </Paper>
  );
};

export default Notes;
