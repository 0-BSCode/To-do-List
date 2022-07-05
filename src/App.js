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
import { db, auth } from "./firebase-config";
import SignupForm from "./components/Signup";
import Entry from "./components/Entry";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  });

  return <>{auth.currentUser ? <Entry /> : <SignupForm />}</>;
}

export default App;
