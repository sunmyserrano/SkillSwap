const express = require("express");
const route = express.Router();

const Multimedia = require("../models/Archivos_multimedia");

// Crear archivo
route.post("/", async (req, resp) => {
    try {
        const nuevo = new Multimedia(req.body);
        const guardado = await nuevo.save();
        resp.status(201).json(guardado);
    } catch (error) {
        resp.status(400).json({ mensaje: error.message });
    }
});

// Obtener todos
route.get("/", async (req, resp) => {
    const lista = await Multimedia.find();
    resp.json(lista);
});

// Obtener por ID
route.get("/:id", async (req, resp) => {
    const dato = await Multimedia.findOne({ Id: req.params.id });
    resp.json(dato);
});

// Actualizar
route.put("/:id", async (req, resp) => {
    try {
        const actualizado = await Multimedia.findOneAndUpdate(
            { Id: req.params.id },
            req.body,
            { new: true }
        );
        resp.json(actualizado);
    } catch (error) {
        resp.status(400).json({ mensaje: error.message });
    }
});

// Eliminar
route.delete("/:id", async (req, resp) => {
    const eliminado = await Multimedia.findOneAndDelete({ Id: req.params.id });
    resp.json(eliminado);
});

module.exports = route;
