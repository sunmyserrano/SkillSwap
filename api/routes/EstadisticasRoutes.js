const express = require("express");
const router = express.Router();
const Estadisticas = require("../models/Estadisticas");

// Crear
router.post("/", async (req, res) => {
    try {
        const count = await Estadisticas.countDocuments();
        const nuevo = new Estadisticas({
            Id: count + 1,
            ...req.body
        });
        const guardado = await nuevo.save();
        res.json(guardado);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Listar
router.get("/", async (req, res) => {
    res.json(await Estadisticas.find());
});

// Obtener uno
router.get("/:id", async (req, res) => {
    const item = await Estadisticas.findOne({ Id: Number(req.params.id) });
    res.json(item);
});

// Actualizar
router.put("/:id", async (req, res) => {
    try {
        const actualizado = await Estadisticas.findOneAndUpdate(
            { Id: req.params.id },
            req.body,
            { new: true }
        );
        res.json(actualizado);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// ELIMINAR ✔✔✔
router.delete("/:id", async (req, res) => {
    const eliminado = await Estadisticas.findOneAndDelete({ Id: Number(req.params.id) });

    if (!eliminado) {
        return res.status(404).json({ error: "No existe la estadística" });
    }

    res.json({ mensaje: "Estadística eliminada" });
});


module.exports = router;

