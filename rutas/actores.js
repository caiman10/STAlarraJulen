const express = require("express");
const router=express.Router();

router.get("/", (req,res) => {
	res.send("Has pedido todos los actores")});

router.get("/:id", (req,res) => {
	res.send("Has pedido un actor con Id" + req.params.id);});
module.exports = router;
