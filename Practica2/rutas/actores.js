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


module.exports = router;
