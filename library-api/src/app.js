const express = require("express");
const mongoose = require("mongoose");
const { envs } = require("./config/config");

const app = express();
app.use(express.json());

//Conexion a MongoDB
const mongoUrl = `${envs.mongoUrl}${envs.mongoDbName}`;

mongoose
  .connect(mongoUrl)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((error) => console.error("Error al conectar a MongoDB:", error));

//Routes
const authorRoutes = require("./routes/authors.route")
const bookRoutes = require("./routes/books.route")

app.use("/", authorRoutes);
app.use("/", bookRoutes);

app.listen(envs.port, () => {
  console.log(`Servidor corriendo en el puerto ${envs.port}`);
});
