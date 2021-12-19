import React, { useState, useEffect, useContext, createContext } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth";
const AuthContext = createContext({});

const firebaseConfig = {
  apiKey: "AIzaSyAgEUJB9CiZF-XoYSnsDDPMggzMucI4KgY",
  authDomain: "dnd99-7df46.firebaseapp.com",
  projectId: "dnd99-7df46",
  storageBucket: "dnd99-7df46.appspot.com",
  messagingSenderId: "901675227818",
  appId: "1:901675227818:web:e70ae239d48451e9fb0ed3",
};
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
