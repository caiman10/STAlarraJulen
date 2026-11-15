const express = require("express");

const app = express();

app.use(express.json());

// Permitimos peticiones desde el frontend (Vite corre en otro puerto)
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	next();
});

const peliculasruta= require("./rutas/peliculas");
const actoresruta= require("./rutas/actores");
const categoriasruta= require("./rutas/categorias");


app.use("/peliculas",peliculasruta);
app.use("/actores",actoresruta);
app.use("/categorias",categoriasruta);


app.listen(3000, () => {
	console.log("Servidor funcionando en puerto 3000");
}
)
;
