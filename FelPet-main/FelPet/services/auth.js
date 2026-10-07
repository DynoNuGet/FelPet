import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../config/firebase";

export async function cadastrar(nome, email, senha) {
  const cred = await createUserWithEmailAndPassword(auth, email.trim(), senha);
  await updateProfile(cred.user, { displayName: nome.trim() });
  return cred.user;
}

export function entrar(email, senha) {
  return signInWithEmailAndPassword(auth, email.trim(), senha);
}

export function sair() {
  return signOut(auth);
}

export function mensagemErro(e) {
  switch (e?.code) {
    case "auth/invalid-email":
      return "E-mail inválido.";
    case "auth/email-already-in-use":
      return "Este e-mail já está cadastrado.";
    case "auth/weak-password":
      return "A senha precisa ter pelo menos 6 caracteres.";
    case "auth/invalid-credential":
    case "auth/user-not-found":
    case "auth/wrong-password":
      return "E-mail ou senha incorretos.";
    case "auth/too-many-requests":
      return "Muitas tentativas. Tente novamente em instantes.";
    case "auth/network-request-failed":
      return "Sem conexão com a internet.";
    default:
      return "Algo deu errado. Tente novamente.";
  }
}
