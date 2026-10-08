
const express = require("express");
const router=express.Router();
const database = require("../data/pelis.json");


router.get("/", (req,res) => {
	res.json(database.actores);
});

router.get("/:id", (req,res) => {
	const actor = database.actores.find((actores) => actores.id === Number(req.params.id));
	if (!actor) {
		return res.status(404).json({ error: "Actor no encontrado" });
	}
	res.json(actor);
});

router.post("/", (req,res) => {
	const {nombre_completo,año_nacimiento} = req.body;


	if ((!nombre_completo) || (!año_nacimiento)){
        return res.status(400).json({ error: "El campo 'nombre_completo y año_nacimiento' son obligatorios" });
    	}

	const nuevoId = database.actores.length > 0 ? database.actores[database.actores.length - 1].id + 1 : 1;

    const nuevoActor = {
        id: nuevoId,
        nombre_completo: nombre_completo,
        año_nacimiento: año_nacimiento,
    };
	// 5. La añadimos a nuestra "base de datos" simulada
    database.peliculas.push(nuevoActor);

    // 6. Respondemos al cliente confirmando que se creó con éxito (Código HTTP 201 Created)
    res.status(201).json({
        mensaje: "Actor añadido con éxito",
        actor: nuevoActor
    });

});
router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = database.actores.findIndex((item) => item.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "Actor no encontrado para eliminar" });
    }

    // Eliminamos el actor del array
    database.actores.splice(index, 1);

    res.json({ mensaje: "Actor eliminado correctamente" });
});

// PATCH /actores/:id - Modificar un actor parcialmente
router.patch("/:id", (req, res) => {
    const id = Number(req.params.id);
    const actores = database.actores.find((a) => a.id === id);

    if (!actores) {
        return res.status(404).json({ error: "Actor no encontrado" });
    }

    // 1. Modificar nombre
    if (req.body.nombre_completo) {
        actores.nombre_completo = req.body.nombre_completo;
    }

    // 2. Modificar año (o edad)
    if (req.body.año_nacimiento) {
        actores.año_nacimiento = req.body.año_nacimiento;
    }

    res.json({
        mensaje: "Actor actualizado con éxito",
        actores: actores
    });
});



module.exports = router;
