//firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Configuración del proyecto Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC1iOjvZxwW6nlOqzFdLEtFgZbuu8XYJbI",
  authDomain: "futbol7-af5c8.firebaseapp.com",
  projectId: "futbol7-af5c8",
  storageBucket: "futbol7-af5c8.firebasestorage.app",
  messagingSenderId: "981838542086",
  appId: "1:981838542086:web:ae6b9a66dcb192b918da87",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };