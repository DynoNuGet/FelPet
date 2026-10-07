import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence, getAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAylgbcoidWwtM663YDdl_iMXVuVCpSgEo",
  authDomain: "felpet-a8b18.firebaseapp.com",
  projectId: "felpet-a8b18",
  storageBucket: "felpet-a8b18.firebasestorage.app",
  messagingSenderId: "601425629266",
  appId: "1:601425629266:web:9edf57393f24f4f50ccf8b"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

let auth;
try {
  auth = initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) });
} catch (e) {
  auth = getAuth(app);
}

export { app, auth };
