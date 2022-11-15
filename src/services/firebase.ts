import { initializeApp } from "firebase/app";

import {
  uploadBytesResumable,
  getStorage,
  ref as storageRef,
  getDownloadURL,
} from "firebase/storage";

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
  apiKey: "AIzaSyA3CgwaZLsztCweuREATncbg8YPMHH0lcQ",
  authDomain: "loja2-4879f.firebaseapp.com",
  projectId: "loja2-4879f",
  storageBucket: "loja2-4879f.appspot.com",
  messagingSenderId: "461392481298",
  appId: "1:461392481298:web:fe7556dd71a5e78d1fdccb",
  measurementId: "G-DW816BMT9M",
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth();
const database = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

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
  storage,
  storageRef,
  uploadBytesResumable,
  getDownloadURL,
};
