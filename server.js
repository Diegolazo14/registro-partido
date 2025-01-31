const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// Ruta correcta a "dist" sin "dist/public"
const publicPath = __dirname;

// Servir archivos estáticos desde "dist"
app.use(express.static(publicPath));

// Servir archivos JS desde "dist/assets"
app.use("/assets", express.static(path.join(publicPath, "assets")));

// Redirige todas las rutas a "index.html"
app.get("*", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
