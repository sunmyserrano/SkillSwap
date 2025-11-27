const express = require("express");
const route = express.Router();

const Estadisticas = require("../models/Estadisticas");

// Crear registro
route.post("/", async (req, resp) => {
    try {
        const nueva = new Estadisticas(req.body);
        const guardada = await nueva.save();
        resp.status(201).json(guardada);
    } catch (error) {
        resp.status(400).json({ mensaje: error.message });
    }
});

// Obtener todos
route.get("/", async (req, resp) => {
    const datos = await Estadisticas.find();
    resp.json(datos);
});

// Obtener por id
route.get("/:id", async (req, resp) => {
    const dato = await Estadisticas.findOne({ Id: req.params.id });
    resp.json(dato);
});

// Actualizar
route.put("/:id", async (req, resp) => {
    try {
        const actualizado = await Estadisticas.findOneAndUpdate(
            { Id: req.params.id },
            req.body,
            { new: true }
        );

        if (!actualizado)
            return resp.status(404).json({ mensaje: "Estadística no encontrada" });

        resp.json(actualizado);
    } catch (error) {
        resp.status(400).json({ mensaje: error.message });
    }
});

// Eliminar
route.delete("/:id", async (req, resp) => {
    try {
        const eliminado = await Estadisticas.findOneAndDelete({ Id: req.params.id });
        resp.json(eliminado);
    } catch (error) {
        resp.status(400).json({ mensaje: error.message });
    }
});

module.exports = route;
