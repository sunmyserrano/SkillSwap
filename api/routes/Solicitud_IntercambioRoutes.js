const express = require("express");
const router = express.Router();
const Solicitud = require("../models/Solicitud_intercambio");

// CREAR
router.post("/", async (req, res) => {
    try {
        const count = await Solicitud.countDocuments();

        const nueva = new Solicitud({
            Id: count + 1,
            Usuario_solicita: req.body.Usuario_solicita,
            Usuario_ofrece: req.body.Usuario_ofrece,
            Habilidad_solicitada: req.body.Habilidad_solicitada,
            Habilidad_ofrecida: req.body.Habilidad_ofrecida,
            Estado: req.body.Estado,
            Fecha: req.body.Fecha
        });

        const guardada = await nueva.save();
        res.json(guardada);

    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// LISTAR TODAS
router.get("/", async (req, res) => {
    res.json(await Solicitud.find());
});

// OBTENER UNA
router.get("/:id", async (req, res) => {
    res.json(await Solicitud.findOne({ Id: Number(req.params.id) }));
});

// ACTUALIZAR
router.put("/:id", async (req, res) => {
    const actualizada = await Solicitud.findOneAndUpdate(
        { Id: Number(req.params.id) },
        req.body,
        { new: true }
    );
    res.json(actualizada);
});

// ELIMINAR
router.delete("/:id", async (req, res) => {
    await Solicitud.findOneAndDelete({ Id: Number(req.params.id) });
    res.json({ message: "Eliminada" });
});

module.exports = router;