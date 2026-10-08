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

router.post("/", (req,res) => {
	const {nombre,año_publicacion,actores} = req.body;


	if (!nombre) {
        return res.status(400).json({ error: "El campo 'nombre' es obligatorio" });
    	}

		const nuevoId = database.peliculas.length > 0 ? database.peliculas[database.peliculas.length - 1].id + 1 : 1;

    const nuevaPelicula = {
        id: nuevoId,
        nombre: nombre,
        año_publicacion: año_publicacion || "Desconocido",
        actores: actores || "Desconocido"
    };

	// 5. La añadimos a nuestra "base de datos" simulada
    database.peliculas.push(nuevaPelicula);

    // 6. Respondemos al cliente confirmando que se creó con éxito (Código HTTP 201 Created)
    res.status(201).json({
        mensaje: "Película añadida con éxito",
        pelicula: nuevaPelicula
    });
});

router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = database.peliculas.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "Película no encontrada" });
    }

    // Eliminamos el elemento del array
    database.peliculas.splice(index, 1);

    res.json({ mensaje: "Película eliminada correctamente" });
});

// PATCH /peliculas/:id - Modificar una película parcialmente
router.patch("/:id", (req, res) => {
    const id = Number(req.params.id);
    const peli = database.peliculas.find((p) => p.id === id);

    if (!peli) {
        return res.status(404).json({ error: "Película no encontrada" });
    }

    // 1. Cambiar nombre (Título)
    if (req.body.nombre) {
        peli.Title = req.body.Title;
    }

    // 2. Cambiar año
    if (req.body.año_publicacion) {
        peli.Year = req.body.Year;
    }

    // 3. Añadir actor (suponiendo que guardas un array de actores en la película, ej: peli.actores = [])
    if (req.body.addActores) {
        if (!peli.actores) peli.actores = [];
        // Evitamos duplicados si ya existe
        if (!peli.actores.includes(req.body.addActores)) {
            peli.actores.push(req.body.addActores);
        }
    }

    // 4. Quitar actor
    if (req.body.removeActores && peli.actores) {
        peli.actores = peli.actores.filter(actores => actores !== req.body.removeActores);
    }

    res.json({
        mensaje: "Película actualizada con éxito",
        pelicula: peli
    });
});

module.exports = router;
