import { auth } from "./firebase-config";
import SignupForm from "./components/Signup";
import Entry from "./components/Entry";

function App() {
  return <>{auth.currentUser ? <Entry /> : <SignupForm />}</>;
}

export default App;
