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
  apiKey: "AIzaSyB2A_eaXghuX0J7lkSS7UMTDZVK8G_v2aQ",
  authDomain: "diplomado-30e12.firebaseapp.com",
  projectId: "diplomado-30e12",
  storageBucket: "diplomado-30e12.appspot.com",
  messagingSenderId: "283646397328",
  appId: "1:283646397328:web:3d9e34b7f3019c48490115",
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
