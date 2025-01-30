import { auth } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// Mostrar formulario de registro
document.getElementById("register-btn").addEventListener("click", () => {
    const contentDiv = document.getElementById("content");
    contentDiv.innerHTML = `
        <h2 class="text-xl font-semibold mb-4">Registro</h2>
        <form id="register-form" class="space-y-4">
            <input type="email" id="register-email" placeholder="Correo electrónico" class="w-full px-4 py-2 border rounded-lg" required>
            <input type="password" id="register-password" placeholder="Contraseña" class="w-full px-4 py-2 border rounded-lg" required>
            <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700">Registrarse</button>
        </form>
    `;

    document.getElementById("register-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("register-email").value;
        const password = document.getElementById("register-password").value;

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            alert(`Usuario registrado: ${userCredential.user.email}`);
        } catch (error) {
            console.error("Error en el registro:", error);
            alert(`Error en el registro: ${error.message}`);
        }
    });
});

// Mostrar formulario de inicio de sesión
document.getElementById("login-btn").addEventListener("click", () => {
    const contentDiv = document.getElementById("content");
    contentDiv.innerHTML = `
        <h2 class="text-xl font-semibold mb-4">Iniciar Sesión</h2>
        <form id="login-form" class="space-y-4">
            <input type="email" id="login-email" placeholder="Correo electrónico" class="w-full px-4 py-2 border rounded-lg" required>
            <input type="password" id="login-password" placeholder="Contraseña" class="w-full px-4 py-2 border rounded-lg" required>
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Iniciar Sesión</button>
        </form>
    `;

    document.getElementById("login-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            alert(`Bienvenido: ${userCredential.user.email}`);
            window.location.href = "/profile.html"; // Redirigir al perfil
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            alert(`Error al iniciar sesión: ${error.message}`);
        }
    });
});

// Redirigir al análisis de partidos
document.getElementById("register-match-btn").addEventListener("click", () => {
    window.location.href = "/match.html";
});
