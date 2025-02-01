document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM completamente cargado y listo.");

    // Variables de estadísticas
    let stats = {
        teamA: { goals: 0, passes: 0, shots: 0, possession: 0, shotsTimes: [], goalsTimes: [] },
        teamB: { goals: 0, passes: 0, shots: 0, possession: 0, shotsTimes: [], goalsTimes: [] }
    };

    // Variables para cronómetros
    let timerInterval, pausedInterval;
    let timerSeconds = 0;
    let pausedSeconds = 0;
    let possessionTimerA = 0;
    let possessionTimerB = 0;
    let possessionIntervalA = null;
    let possessionIntervalB = null;

    // Función para formatear tiempo
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
    }

    // Actualizar cronómetros principales
    function updateMainTimers() {
        document.getElementById("main-timer").textContent = formatTime(timerSeconds);
        document.getElementById("paused-timer").textContent = formatTime(pausedSeconds);
    }

    // Actualizar cronómetros de posesión
    function updatePossessionTimers() {
        document.getElementById("possession-timer-a").textContent = formatTime(possessionTimerA);
        document.getElementById("possession-timer-b").textContent = formatTime(possessionTimerB);
    }

    // Actualizar estadísticas
    function updateStats() {
        document.getElementById("counter-goals-a").textContent = stats.teamA.goals;
        document.getElementById("counter-goals-b").textContent = stats.teamB.goals;
        document.getElementById("counter-passes-a").textContent = stats.teamA.passes;
        document.getElementById("counter-passes-b").textContent = stats.teamB.passes;
        document.getElementById("counter-shots-a").textContent = stats.teamA.shots;
        document.getElementById("counter-shots-b").textContent = stats.teamB.shots;
    }

    // Funciones para cronómetro principal
    function startMainTimer() {
        if (!timerInterval) {
            timerInterval = setInterval(() => {
                timerSeconds++;
                updateMainTimers();
            }, 1000);
            updateMainTimers();
            console.log(`Cronómetro principal: ${formatTime(timerSeconds)}`);
        }   
    }

    function resetAll() {
        clearInterval(timerInterval);
        clearInterval(pausedInterval);
        clearInterval(possessionIntervalA);
        clearInterval(possessionIntervalB);
        timerInterval = null;
        pausedInterval = null;
        possessionIntervalA = null;
        possessionIntervalB = null;

        timerSeconds = 0;
        pausedSeconds = 0;
        possessionTimerA = 0;
        possessionTimerB = 0;
        stats = {
            teamA: { goals: 0, passes: 0, shots: 0, possession: 0, shotsTimes: [], goalsTimes: [] },
            teamB: { goals: 0, passes: 0, shots: 0, possession: 0, shotsTimes: [], goalsTimes: [] }
        };

        updateMainTimers();
        updatePossessionTimers();
        updateStats();
        console.log("Se reiniciaron todos los cronómetros y estadísticas.");
    }

    // Funciones para cronómetro pausado
    function startPausedTimer() {
        if (!pausedInterval) {
            pausedInterval = setInterval(() => {
                pausedSeconds++;
                updateMainTimers();
                console.log(`Tiempo pausado: ${formatTime(pausedSeconds)}`);
            }, 1000);
        }
    }

    function pauseAll() {
        clearInterval(possessionIntervalA);
        clearInterval(possessionIntervalB);
        possessionIntervalA = null;
        possessionIntervalB = null;

        startPausedTimer();
        console.log("Se pausaron los cronómetros de posesión.");
    }

    // Funciones para posesión
    function startPossessionA() {
        pausePossessionB();
        clearInterval(pausedInterval);
        pausedInterval = null;

        if (!possessionIntervalA) {
            startMainTimer();
            updateStats();
            possessionIntervalA = setInterval(() => {
                possessionTimerA++;
                stats.teamA.possession++;
                updatePossessionTimers();
            }, 1000);
            console.log(`Posesión Equipo Azul iniciada`);
        }
    }

    function pausePossessionA() {
        clearInterval(possessionIntervalA);
        possessionIntervalA = null;
    }

    function startPossessionB() {
        pausePossessionA();
        clearInterval(pausedInterval);
        pausedInterval = null;

        if (!possessionIntervalB) {
            startMainTimer();
            updateStats();
            possessionIntervalB = setInterval(() => {
                possessionTimerB++;
                stats.teamB.possession++;
                updatePossessionTimers();
            }, 1000);
            console.log(`Posesión Equipo Rojo iniciada`);
        }
    }

    function pausePossessionB() {
        clearInterval(possessionIntervalB);
        possessionIntervalB = null;
    }

    // Eventos para goles, pases y tiros
    document.getElementById("goalA")?.addEventListener("click", () => {
        stats.teamA.goals++;
        stats.teamA.goalsTimes.push(formatTime(timerSeconds)); // Guardar el tiempo en que ocurrió el gol
        updateStats();  // Asegurar que la UI se actualiza inmediatamente
        console.log(`Gol Equipo Azul: ${stats.teamA.goals} en ${formatTime(timerSeconds)}`);
    });

    document.getElementById("goalB")?.addEventListener("click", () => {
        stats.teamB.goals++;
        stats.teamB.goalsTimes.push(formatTime(timerSeconds)); 
        updateStats();
        console.log(`Gol Equipo Rojo: ${stats.teamB.goals} en ${formatTime(timerSeconds)}`);
    });    
    document.getElementById("passA")?.addEventListener("click", () => {
        stats.teamA.passes++;
        updateStats(); // 🔥 Se actualiza inmediatamente
        console.log(`Pase Equipo Azul: ${stats.teamA.passes}`);
    });   
    document.getElementById("passB")?.addEventListener("click", () => {
        stats.teamB.passes++;
        updateStats();
        console.log(`Pase Equipo Rojo: ${stats.teamB.passes}`);
});
    document.getElementById("shotA")?.addEventListener("click", () => {
        stats.teamA.shots++;
        stats.teamA.shotsTimes.push(formatTime(timerSeconds));
        updateStats();
        console.log(`Tiro Equipo Azul: ${stats.teamA.shots} en ${formatTime(timerSeconds)}`);
    });    
    document.getElementById("shotB")?.addEventListener("click", () => {
        stats.teamB.shots++;
        stats.teamB.shotsTimes.push(formatTime(timerSeconds));
        updateStats();
        console.log(`Tiro Equipo Rojo: ${stats.teamB.shots} en ${formatTime(timerSeconds)}`);
    });
    document.getElementById("pause-game")?.addEventListener("click", pauseAll);
    document.getElementById("reset-all")?.addEventListener("click", resetAll);
    document.getElementById("start-possession-a")?.addEventListener("click", startPossessionA);
    document.getElementById("start-possession-b")?.addEventListener("click", startPossessionB);
    updateStats();

    // Exportar estadísticas a CSV
    async function exportCSV() {
        try {
            const baseUrl = window.location.hostname.includes("localhost")
                ? "http://localhost:3000/export-csv"
                : "https://registro-partido.onrender.com/export-csv";

                // Construir los datos a exportar
        const csvData = {
            teamA: {
                goals: stats.teamA.goals,
                goalsTimes: stats.teamA.goalsTimes.join(", "), // Convertir lista en string
                shots: stats.teamA.shots,
                shotsTimes: stats.teamA.shotsTimes.join(", "), // Convertir lista en string
                passes: stats.teamA.passes,
                possession: stats.teamA.possession
            },
            teamB: {
                goals: stats.teamB.goals,
                goalsTimes: stats.teamB.goalsTimes.join(", "),
                shots: stats.teamB.shots,
                shotsTimes: stats.teamB.shotsTimes.join(", "),
                passes: stats.teamB.passes,
                possession: stats.teamB.possession
            }
        };
            const response = await fetch(baseUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ stats }),
                mode: "cors"
            });

            if (!response.ok) {
                throw new Error(`Error al exportar los datos. Código: ${response.status}`);
            }
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "stats_export.csv";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);

            alert("Archivo CSV exportado exitosamente.");
        } catch (error) {
            console.error("Error al exportar los datos:", error);
            alert("Error al exportar los datos.");
        }
    }

    document.getElementById("export-csv")?.addEventListener("click", exportCSV);
});

import { auth } from "./firebase";
console.log("Firebase auth importado correctamente:", auth);
