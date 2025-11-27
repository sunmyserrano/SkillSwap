const express = require('express');
const route = express.Router();
const Solicitud = require('../models/Solicitud_Intercambio');

// Crear solicitud
route.post('/', async (req, resp) => {
    const nuevaSolicitud = new Solicitud(req.body);

    try {
        const guardada = await nuevaSolicitud.save();
        resp.status(201).json(guardada);
    } catch (error) {
        resp.status(400).json({ mensaje: error.message });
    }
});

// Update
route.put('/:id', async (req, resp) => {
    try {
        const actualizado = await Solicitud.findByIdAndUpdate(
            req.params.id, req.body, { new: true }
        );

        if (!actualizado) {
            return resp.status(404).json({ mensaje: "Solicitud no encontrada" });
        }

        resp.status(200).json(actualizado);
    } catch (error) {
        resp.status(400).json({ mensaje: error.message });
    }
});

// Delete
route.delete('/:id', async (req, resp) => {
    try {
        const eliminado = await Solicitud.findByIdAndDelete(req.params.id);

        if (!eliminado) {
            return resp.status(404).json({ mensaje: "Solicitud no encontrada" });
        }

        resp.status(200).json({ mensaje: 'Solicitud eliminada' });
    } catch (error) {
        resp.status(400).json({ mensaje: error.message });
    }
});

// Obtener datos
route.get('/', async (req, resp) => {
    try {
        const datos = await Solicitud.find();
        resp.json(datos);
    } catch (error) {
        resp.status(500).json({ mensaje: error.message });
    }
});

module.exports = route;
