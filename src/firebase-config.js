import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAwr-0dnuDcYM4VWlexNX8OWw3G93l8YHY",
  authDomain: "react-firebase-9511f.firebaseapp.com",
  projectId: "react-firebase-9511f",
  storageBucket: "react-firebase-9511f.appspot.com",
  messagingSenderId: "233295397608",
  appId: "1:233295397608:web:12c9790f5d36a79cdebf5d",
};

const app = initializeApp(firebaseConfig);

// Services
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
