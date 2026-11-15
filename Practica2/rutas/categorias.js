const express = require("express");
const router = express.Router();
const database = require("../data/pelis.json");

// GET /categorias - Devuelve la lista de categorías distintas (sin repetir)
router.get("/", (req, res) => {
    const categorias = [...new Set(database.peliculas.map((p) => p.categoria).filter(Boolean))];
    res.json(categorias);
});

module.exports = router;
