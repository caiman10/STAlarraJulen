const express=require("express");
const router=express.Router();
const database = require("../data/pelis.json");



router.get("/:id", (req,res) => {
	const pelicula = database.peliculas.find((item) => item.id === Number(req.params.id));
	if (!pelicula) {
		return res.status(404).json({ error: "Película no encontrada" });
	}
	res.json(pelicula);
});
router.get("/", (req, res) => {
    // 1. Capturamos el valor del query parameter 'nombre'
    const nombreBuscado = req.query.nombre;

    // 2. Si NO ponen nada (es decir, viene vacío o undefined), devolvemos TODAS las películas
    if (!nombreBuscado) {
        return res.json(database.peliculas);
    }

    // 3. Si SÍ escribieron un nombre, filtramos o buscamos como antes
    const peliculaEncontrada = database.peliculas.find(
        (item) => item.nombre.toLowerCase() === nombreBuscado.toLowerCase()
    );

    // 4. Si no existe, devolvemos un 404
    if (!peliculaEncontrada) {
        return res.status(404).json({ error: "Película no encontrada" });
    }

    // 5. Si la encuentra, la devuelve individualmente
    res.json(peliculaEncontrada);
});

module.exports = router;
