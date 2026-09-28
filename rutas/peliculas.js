const express=require("express");
const router=express.Router();

router.get("/",(req,res) => {
	res.send("Has pedido todas las peliculas");
});

router.get("/:id", (req,res) => {
	res.send("Has pedido la pelicula con ID" + req.params.id);});

module.exports = router;
