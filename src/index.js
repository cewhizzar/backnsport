const express = require("express");

// Cargar variables de entorno
require("dotenv").config();

// conectar a DB
require("./config/db");

// Create a new express application instance
const app = express();
app.use(express.json());

app.use("/users", require("./users/routes"));
app.use("/tournamets", require("./tournamets/routes"));
app.use("/pirlo", require("./prlotv.fr/routes"));
app.use("/matches", require("./matches/routes"));

app.listen(process.env.APP_PORT, () =>
  console.log("Servidor escuchando en el puerto " + process.env.APP_PORT)
);
module.exports = app;
