import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config";
import SignupForm from "./components/Signup";
import Entry from "./components/Entry";
import { useState } from "react";

function App() {
  // Could use auth.currentUser but that won't cause re-render
  const [user, setUser] = useState(auth.currentUser);
  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });
  return <>{user ? <Entry /> : <SignupForm />}</>;
}

export default App;
