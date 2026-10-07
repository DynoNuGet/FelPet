import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "./AuthContext";

const PetsContext = createContext(null);
const chavePets = (uid) => `@felpet:pets:${uid}`;
const chaveFoto = (uid, id) => `@felpet:petfoto:${uid}:${id}`;

export function PetsProvider({ children }) {
  const { user } = useAuth();
  const uid = user?.uid;
  const [pets, setPets] = useState([]);

  useEffect(() => {
    if (!uid) {
      setPets([]);
      return;
    }
    let ativo = true;
    (async () => {
      const salvo = JSON.parse((await AsyncStorage.getItem(chavePets(uid))) || "[]");
      const fotos = await AsyncStorage.multiGet(salvo.map((p) => chaveFoto(uid, p.id)));
      if (!ativo) return;
      setPets(salvo.map((p, i) => ({ ...p, foto: fotos[i][1] })));
    })();
    return () => {
      ativo = false;
    };
  }, [uid]);

  async function adicionarPet({ nome, especie, raca, foto }) {
    const id = String(Date.now());
    const meta = { id, nome, especie, raca };
    const novos = [...pets, { ...meta, foto }];
    setPets(novos);
    await AsyncStorage.setItem(chavePets(uid), JSON.stringify(novos.map(({ foto: _f, ...m }) => m)));
    if (foto) await AsyncStorage.setItem(chaveFoto(uid, id), foto);
  }

  async function removerPet(id) {
    const novos = pets.filter((p) => p.id !== id);
    setPets(novos);
    await AsyncStorage.setItem(chavePets(uid), JSON.stringify(novos.map(({ foto: _f, ...m }) => m)));
    await AsyncStorage.removeItem(chaveFoto(uid, id));
  }

  return <PetsContext.Provider value={{ pets, adicionarPet, removerPet }}>{children}</PetsContext.Provider>;
}

export const usePets = () => useContext(PetsContext);
