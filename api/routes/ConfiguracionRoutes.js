//Nuevo configuracionRoutes.js
// api/routes/ConfiguracionRoutes.js
const express = require("express");
const route = express.Router();

const Configuracion = require("../models/Configuracion");

// ================== CREAR ==================
route.post("/", async (req, resp) => {
    try {
        const { Id, Parámetros, Descripción } = req.body;

        const nueva = new Configuracion({
            Id,
            Parámetros,
            Descripción
        });

        const guardada = await nueva.save();
        resp.status(201).json(guardada);
    } catch (error) {
        console.error("Error al crear configuración:", error);
        resp.status(400).json({ mensaje: error.message });
    }
});

// ================== OBTENER TODAS ==================
route.get("/", async (req, resp) => {
    try {
        const lista = await Configuracion.find().sort({ Id: 1 });
        resp.json(lista);
    } catch (error) {
        console.error("Error al listar configuraciones:", error);
        resp.status(500).json({ mensaje: error.message });
    }
});

// ================== OBTENER UNA POR Id ==================
route.get("/:id", async (req, resp) => {
    try {
        const id = Number(req.params.id);
        const cfg = await Configuracion.findOne({ Id: id });

        if (!cfg) {
            return resp.status(404).json({ mensaje: "Configuración no encontrada" });
        }

        resp.json(cfg);
    } catch (error) {
        console.error("Error al obtener configuración:", error);
        resp.status(500).json({ mensaje: error.message });
    }
});

// ================== ACTUALIZAR POR Id ==================
route.put("/:id", async (req, resp) => {
    try {
        const id = Number(req.params.id);

        const actualizado = await Configuracion.findOneAndUpdate(
            { Id: id },
            req.body,
            { new: true }
        );
    }
    catch (error) {
        resp.status(400).json({ mensaje: error.message });
    }
});