//firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Configuración del proyecto Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB2j1SdhX_4bPFQJPQxgKZocE2cptashXo",
  authDomain: "registro-partido.firebaseapp.com",
  projectId: "registro-partido",
  storageBucket: "registro-partido.firebasestorage.app",
  messagingSenderId: "286507654061",
  appId: "1:286507654061:web:8e3098ec691b41a0295f24",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };