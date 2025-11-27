const express = require("express");
const route = express.Router();

const Configuracion = require("../models/Configuracion");

// Crear configuración
route.post("/", async (req, resp) => {
    try {
        const nueva = new Configuracion(req.body);
        const guardada = await nueva.save();
        resp.status(201).json(guardada);
    } catch (error) {
        resp.status(400).json({ mensaje: error.message });
    }
});

// Obtener todas
route.get("/", async (req, resp) => {
    const datos = await Configuracion.find();
    resp.json(datos);
});

// Obtener una por ID
route.get("/:id", async (req, resp) => {
    const dato = await Configuracion.findOne({ Id: req.params.id });
    resp.json(dato);
});

// Actualizar
route.put("/:id", async (req, resp) => {
    try {
        const actualizado = await Configuracion.findOneAndUpdate(
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
    const eliminado = await Configuracion.findOneAndDelete({ Id: req.params.id });
    resp.json(eliminado);
});

module.exports = route;
