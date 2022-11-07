import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  setDoc,
  doc,
  addDoc,
  collection,
  getDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGED_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth();
const database = getFirestore(firebaseApp);

export {
  firebaseApp,
  auth,
  database,
  GoogleAuthProvider,
  signInWithPopup,
  setDoc,
  doc,
  addDoc,
  collection,
  createUserWithEmailAndPassword,
  getDoc,
  signInWithEmailAndPassword,
  signOut,
};
