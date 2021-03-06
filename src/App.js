import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config";
import SignupForm from "./components/Signup";
import LoginForm from "./components/Login";
import { useState, useEffect } from "react";
import Home from "./components/Home";

function App() {
  // Could use auth.currentUser but that won't cause re-render
  const [user, setUser] = useState(auth.currentUser);
  const [hasAccount, setHasAccount] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  const form = hasAccount ? (
    <LoginForm hasAccount={{ get: hasAccount, set: setHasAccount }} />
  ) : (
    <SignupForm hasAccount={{ get: hasAccount, set: setHasAccount }} />
  );

  return <>{user ? <Home /> : form}</>;
}

export default App;
