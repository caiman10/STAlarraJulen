const express = require("express");

const app = express();

app.use(express.json());

const peliculasruta= require(".rutas/peliculas");
const actoresruta= require(".rutas/actores");

app.use("/peliculas",peliculasruta);
app.use("/actores",actoresruta);

app.listen(3000, () => {
	console.log("Servidor funcionando en puerto 3000");
}
)
;
