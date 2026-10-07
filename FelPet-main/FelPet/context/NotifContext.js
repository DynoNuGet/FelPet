import React, { createContext, useContext, useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "./AuthContext";
import { prepararNotificacoes } from "../services/notificacoes";

const NotifContext = createContext(null);
const chave = (uid) => `@felpet:notificacoes:${uid}`;

function paraRegistro(n) {
  const c = n.request.content;
  const data = n.date ? (n.date < 1e12 ? n.date * 1000 : n.date) : Date.now();
  return {
    id: n.request.identifier,
    tipo: c.data?.tipo ?? "geral",
    titulo: c.title ?? "",
    corpo: c.body ?? "",
    data,
    lida: false,
  };
}

function mesclar(base, novos) {
  const ids = new Set(base.map((x) => x.id));
  const extras = novos.filter((x) => !ids.has(x.id));
  return [...extras, ...base].sort((a, b) => b.data - a.data);
}

export function NotifProvider({ children }) {
  const { user } = useAuth();
  const uid = user?.uid;
  const [lista, setLista] = useState([]);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    setCarregado(false);
    if (!uid) {
      setLista([]);
      return;
    }
    let ativo = true;
    (async () => {
      const salvo = JSON.parse((await AsyncStorage.getItem(chave(uid))) || "[]");
      let naBarra = [];
      try {
        naBarra = (await Notifications.getPresentedNotificationsAsync()).map(paraRegistro);
      } catch (e) {}
      if (!ativo) return;
      setLista((atual) => mesclar(mesclar(salvo, atual), naBarra));
      setCarregado(true);
    })();
    return () => {
      ativo = false;
    };
  }, [uid]);

  useEffect(() => {
    if (uid && carregado) AsyncStorage.setItem(chave(uid), JSON.stringify(lista));
  }, [lista, uid, carregado]);

  useEffect(() => {
    if (!uid) return;
    prepararNotificacoes();
    const sub = Notifications.addNotificationReceivedListener((n) => {
      setLista((atual) => mesclar(atual, [paraRegistro(n)]));
    });
    return () => sub.remove();
  }, [uid]);

  const marcarLida = (id) => setLista((l) => l.map((n) => (n.id === id ? { ...n, lida: true } : n)));
  const marcarTodasLidas = () => setLista((l) => l.map((n) => ({ ...n, lida: true })));
  const limpar = () => setLista([]);
  const naoLidas = lista.filter((n) => !n.lida).length;

  return (
    <NotifContext.Provider value={{ lista, naoLidas, marcarLida, marcarTodasLidas, limpar }}>
      {children}
    </NotifContext.Provider>
  );
}

export const useNotif = () => useContext(NotifContext);
