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
  getDownloadURL,
  setDoc,
  storage,
  storageRef,
  uploadBytesResumable,
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
  handleCreateProduct: (
    name: string,
    file: any,
    category: string,
    price: string,
    quantity: number,
    description: string,
    setProgress?: (progress: number) => void
  ) => void;

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
          const user = auth.currentUser;
          console.log(user);
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

  const handleCreateProduct = (
    name: string,
    file: any,
    category: string,
    price: string,
    quantity: number,
    description: string,
    setProgress?: (progress: number) => void
  ) => {
    // Create the file metadata
    /** @type {any} */
    const metadata = {
      contentType: "image/jpeg",
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageref = storageRef(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageref, file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        if (setProgress) {
          setProgress(progress);
        }

        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          // console.log("File available at", downloadURL);

          try {
            const docRef = await addDoc(collection(database, "products"), {
              name,
              product_image: downloadURL,
              category,
              price,
              quantity,
              description,
            });

            await setDoc(
              doc(database, "products", docRef.id),
              {
                id: docRef.id,
              },
              { merge: true }
            );

            return true;
          } catch (error) {
            return false;
          }
        });
      }
    );
  };

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
        handleCreateProduct,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
