import {
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { getDocs, query, where } from "firebase/firestore";
import { createContext, ReactNode, useEffect, useState } from "react";
import {
  addDoc,
  auth,
  collection,
  createUserWithEmailAndPassword,
  database,
  doc,
  getDoc,
  setDoc,
} from "../services/firebase";

type User = {
  id: string;
  name: string;
  email: string;
  address: string;
  telefone: string;
  birth_date: Date;
  cpf: string;
};

type AuthContextType = {
  user: User | null;
  handleRegisterClient: (
    name: string,
    email: string,
    password: string,
    adress: string,
    telefone: string,
    birth_date: Date,
    cpf: string
  ) => Promise<boolean>;
  handleResetPassword: (email: string) => Promise<boolean>;
  handleLogin: (email: string, password: string) => Promise<boolean>;
  handleSignOut: () => Promise<void>;
  handleChangeEmail: (email: string) => Promise<boolean>;
  handleChangePassword: (email: string) => Promise<boolean>;
  handleUpdateUser: (
    username?: string,
    address?: string,
    telefone?: string,
    birth_date?: string,
    cpf?: string
  ) => Promise<boolean>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(database, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const u = docSnap.data() as User;
          setUser(u);
          console.log(u);
        } else {
          // doc.data() will be undefined in this case
          console.log("usuário não encontrado");
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function handleRegisterClient(
    name: string,
    email: string,
    password: string,
    address: string,
    telefone: string,
    birth_date: Date,
    cpf: string
  ) {
    const createdUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    if (createdUser) {
      const userdata = {
        id: createdUser.user.uid,
        name,
        email,
        address,
        telefone,
        birth_date,
        cpf,
      };

      await setDoc(doc(database, "users/", createdUser.user.uid), userdata);

      setUser(userdata);

      return true;
    }

    return false;
  }

  async function handleLogin(email: string, password: string) {
    const result = await signInWithEmailAndPassword(auth, email, password);

    if (result) {
      return true;
    } else {
      return false;
    }
  }

  const handleResetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return true;
    } catch (err) {
      return false;
    }
  };

  async function handleSignOut() {
    await signOut(auth);
    setUser(null);
  }

  async function handleUpdateUser(
    username?: string,
    address?: string,
    telefone?: string,
    birth_date?: string,
    cpf?: string
  ) {
    const u = auth.currentUser as any;
    try {
      await setDoc(
        doc(database, "users", u.uid),
        {
          username,
          address,
          telefone,
          birth_date,
          cpf,
        },
        { merge: true }
      );
      return true;
    } catch (err) {
      return false;
    }
  }

  async function handleChangeEmail(email: string) {
    const u = auth.currentUser as any;

    try {
      await updateEmail(u, email);
      await setDoc(
        doc(database, "users", u.uid),
        {
          email,
        },
        { merge: true }
      );
      return true;
    } catch (err) {
      return false;
    }
  }
  async function handleChangePassword(password: string) {
    const u = auth.currentUser as any;

    try {
      await updatePassword(u, password);
      return true;
    } catch (err) {
      return false;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        handleRegisterClient,
        handleResetPassword,
        handleLogin,
        handleSignOut,
        handleChangeEmail,
        handleChangePassword,
        handleUpdateUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
