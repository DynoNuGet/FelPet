import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Telas
import Cabecalho from "./components/cabecalho"
import Home from "./screens/Home";
import Cadastro from "./screens/Cadastro";
import Notif from "./screens/Notif";
import Login from "./screens/Login";
import Perfil from "./screens/Perfil";

const Stack = createNativeStackNavigator();

// Tabelas
const screenTable = [
  { name: "Home", component: Home },
  { name: "Cadastro", component: Cadastro },
  { name: "Notificações", component: Notif },
  { name: "Login", component: Login },
  { name: "Perfil", component: Perfil },
];

// Função
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {screenTable.map((route) => {
          return (
            <Stack.Screen 
              key={route.name} 
              name={route.name} 
              component={route.component}
              options={{headerShown: false}}
            />
          );
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
}