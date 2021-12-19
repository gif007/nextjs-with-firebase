import React, { useState, useEffect, useContext, createContext } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseConfig } from "../lib/firebaseConfig";
const AuthContext = createContext({});

initializeApp(firebaseConfig);
export const db = getFirestore();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      console.log("auth changed");
      console.log(user ? user.uid : "Nothing");
      if (!user) {
        setUser(null);
        return;
      }
      setUser(user);
    });
  }, []);
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
