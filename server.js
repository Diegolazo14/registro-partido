const express = require("express");
const path = require("path");
const cors = require("cors"); // Importar CORS
const fs = require("fs"); // Importar File System para generar CSV

const app = express();
const port = process.env.PORT || 3000;

// Habilitar CORS para permitir solicitudes desde localhost y otros orígenes
app.use(cors({
    origin: ["http://localhost:3000", "https://futbol7.onrender.com"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json()); // Habilitar procesamiento de JSON en las peticiones

// Ruta correcta a "dist" sin "dist/public"
const publicPath = __dirname;

// Servir archivos estáticos desde "dist"
app.use(express.static(publicPath));

// Servir archivos JS desde "dist/assets"
app.use("/assets", express.static(path.join(publicPath, "assets")));


// **Nuevo Endpoint: Exportar CSV con CORS habilitado**
app.post("/export-csv", (req, res) => {
    try {
        const stats = req.body.stats; // Datos enviados desde el frontend

        if (!stats) {
            return res.status(400).send("No se recibieron datos.");
        }

        // Construir el contenido del CSV
        const csvHeaders = "Equipo,Goles,Pases,Tiros,Posesión (s)\n";
        const csvData = [
            `Equipo Azul,${stats.teamA.goals},${stats.teamA.passes},${stats.teamA.shots},${stats.teamA.possession}`,
            `Equipo Rojo,${stats.teamB.goals},${stats.teamB.passes},${stats.teamB.shots},${stats.teamB.possession}`
        ].join("\n");

        const filePath = "stats_export.csv";
        fs.writeFileSync(filePath, csvHeaders + csvData);

        // Configurar encabezados CORS para permitir la descarga
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Content-Type", "text/csv");
        res.download(filePath, "stats_export.csv", (err) => {
            if (err) {
                console.error("Error al descargar el archivo:", err);
                res.status(500).send("Error al exportar el archivo.");
            }
            fs.unlinkSync(filePath); // Eliminar el archivo después de enviarlo
        });
    } catch (error) {
        console.error("Error al generar CSV:", error);
        res.status(500).send("Error interno del servidor.");
    }
});

// Redirige todas las rutas a "index.html"
app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
