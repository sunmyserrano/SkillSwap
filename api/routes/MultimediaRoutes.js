//Nuevo MultimediaRoutes.js 
// api/routes/MultimediaRoutes.js
const express = require("express");
const route = express.Router();

const Multimedia = require("../models/Archivos_multimedia");

// ====== CREAR ======
route.post("/", async (req, resp) => {
    try {
        const {
            Id,
            Usuario_Id,
            Tipo,
            URL,
            Fecha_subido,
            Descripción,
            Intercambio_Id
        } = req.body;

        const nuevo = new Multimedia({
            Id,
            Usuario_Id,
            Tipo,
            URL,
            Fecha_subido,
            Descripción,
            Intercambio_Id
        });

        const guardado = await nuevo.save();
        resp.status(201).json(guardado);
    } catch (error) {
        console.error("Error al crear archivo multimedia:", error);
        resp.status(400).json({ mensaje: error.message });
    }
});

// ====== LISTAR TODOS ======
route.get("/", async (req, resp) => {
    try {
        const lista = await Multimedia.find().sort({ Id: 1 });
        resp.json(lista);
    } catch (error) {
        console.error("Error al listar archivos multimedia:", error);
        resp.status(500).json({ mensaje: error.message });
    }
});

// ====== OBTENER POR Id (campo Id) ======
route.get("/:id", async (req, resp) => {
    try {
        const id = Number(req.params.id);
        const dato = await Multimedia.findOne({ Id: id });

        if (!dato) {
            return resp.status(404).json({ mensaje: "Archivo no encontrado" });
        }

        resp.json(dato);
    } catch (error) {
        console.error("Error al obtener archivo multimedia:", error);
        resp.status(500).json({ mensaje: error.message });
    }
});

// ====== ACTUALIZAR POR Id ======
route.put("/:id", async (req, resp) => {
    try {
        const id = Number(req.params.id);

        const actualizado = await Multimedia.findOneAndUpdate(
            { Id: id },
            req.body,
            { new: true }
        );

        if (!actualizado) {
            return resp.status(404).json({ mensaje: "Archivo no encontrado" });
        }

        resp.json(actualizado);
    } catch (error) {
        console.error("Error al actualizar archivo multimedia:", error);
        resp.status(400).json({ mensaje: error.message });
    }
});

// ====== ELIMINAR POR Id ======
route.delete("/:id", async (req, resp) => {
    try {
        const id = Number(req.params.id);
        const eliminado = await Multimedia.findOneAndDelete({ Id: id });

        if (!eliminado) {
            return resp.status(404).json({ mensaje: "Archivo no encontrado" });
        }

        resp.json({ mensaje: "Archivo eliminado" });
    } catch (error) {
        console.error("Error al eliminar archivo multimedia:", error);
        resp.status(500).json({ mensaje: error.message });
    }
});

module.exports = route;
