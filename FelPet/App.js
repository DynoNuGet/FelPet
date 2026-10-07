import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { NavigationContainer, createNavigationContainerRef } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Notifications from "expo-notifications";

// Contextos
import { AuthProvider, useAuth } from "./context/AuthContext";
import { PetsProvider } from "./context/PetsContext";
import { NotifProvider } from "./context/NotifContext";

// Telas
import Home from "./screens/Home";
import Cadastro from "./screens/Cadastro";
import Notif from "./screens/Notif";
import Login from "./screens/Login";
import Perfil from "./screens/Perfil";
import Agendar from "./screens/Agendar";
import Produtos from "./screens/Produtos";

import { cores } from "./constants/tema";

const Stack = createNativeStackNavigator();
const navigationRef = createNavigationContainerRef();

// Tabelas
const telasPublicas = [
  { name: "Login", component: Login },
  { name: "Cadastro", component: Cadastro },
];

const telasPrivadas = [
  { name: "Home", component: Home, animation: "none" },
  { name: "Notificações", component: Notif, animation: "none" },
  { name: "Perfil", component: Perfil, animation: "none" },
  { name: "Agendar", component: Agendar },
  { name: "Produtos", component: Produtos },
];

function useAbrirNotificacoes(logado) {
  useEffect(() => {
    if (!logado) return;
    const abrir = () => {
      if (navigationRef.isReady()) navigationRef.navigate("Notificações");
    };
    const sub = Notifications.addNotificationResponseReceivedListener(abrir);
    return () => sub.remove();
  }, [logado]);
}

function Rotas() {
  const { user, carregando } = useAuth();
  useAbrirNotificacoes(!!user);

  if (carregando) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: cores.fundo }}>
        <ActivityIndicator size="large" color={cores.primaria} />
      </View>
    );
  }

  const telas = user ? telasPrivadas : telasPublicas;

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        {telas.map((route) => (
          <Stack.Screen
            key={route.name}
            name={route.name}
            component={route.component}
            options={{ headerShown: false, animation: route.animation }}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Função
export default function App() {
  return (
    <AuthProvider>
      <PetsProvider>
        <NotifProvider>
          <Rotas />
        </NotifProvider>
      </PetsProvider>
    </AuthProvider>
  );
}
