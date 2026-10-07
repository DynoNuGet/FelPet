import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [, setTick] = useState(0);

  useEffect(() => {
    const cancelar = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setCarregando(false);
    });
    return cancelar;
  }, []);
  const refresh = () => setTick((t) => t + 1);

  return <AuthContext.Provider value={{ user, carregando, refresh }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
