const express = require("express");
const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("¡Hola! Mi app está funcionando con Docker 🚀");
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});