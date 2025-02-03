const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { parse } = require("json2csv");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // Permite recibir JSON en el body

// Servir archivos estáticos desde "dist"
app.use(express.static("dist"));

// Ruta para exportar CSV
app.post("/export-csv", (req, res) => {
    try {
        const { stats } = req.body;
         // Crear los encabezados del CSV
         const csvHeader = "Equipo,Goles,Tiempos de Goles,Tiros,Tiempos de Tiros,Pases,Posesión,Jugadas Destacadas,Tiempo Total,Tiempo Pausado\n";
         const csvData = [
             `Equipo Azul,${stats.teamA.goals},"${stats.teamA.goalsTimes.replace(/,/g, ' / ')}",${stats.teamA.shots},"${stats.teamA.shotsTimes.replace(/,/g, ' / ')}",${stats.teamA.passes},${stats.teamA.possession},"${stats.highlights.replace(/,/g, ' / ')}",${stats.timeElapsed},${stats.timePaused}`,
             `Equipo Rojo,${stats.teamB.goals},"${stats.teamB.goalsTimes.replace(/,/g, ' / ')}",${stats.teamB.shots},"${stats.teamB.shotsTimes.replace(/,/g, ' / ')}",${stats.teamB.passes},${stats.teamB.possession},"${stats.highlights.replace(/,/g, ' / ')}",${stats.timeElapsed},${stats.timePaused}`
         ].join("\n");

        // Unir el encabezado con los datos
        const csvContent = csvHeader + csvData;

        // Enviar el archivo CSV al cliente
        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", "attachment; filename=stats_export.csv");
        res.status(200).send(csvContent);
    } catch (error) {
        console.error("Error al procesar la exportación CSV:", error);
        res.status(500).json({ error: "Error al exportar CSV" });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
