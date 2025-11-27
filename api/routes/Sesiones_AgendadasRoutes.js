const express = require('express');
const route = express.Router();

const Sesiones = require('../models/Sesiones_Agendadas');

// Crear sesión
route.post('/', async (req, resp) => {
    const {
        Intercambio_Id,
        Usuario_Id,
        Fecha,
        Hora_inicio,
        Hora_fin,
        Estado,
        Observaciones
    } = req.body;

    const nuevaSesion = new Sesiones({
        Intercambio_Id,
        Usuario_Id,
        Fecha,
        Hora_inicio,
        Hora_fin,
        Estado,
        Observaciones
    });

    try {
        const guardado = await nuevaSesion.save();
        resp.status(201).json(guardado);
    } catch (error) {
        resp.status(400).json({ mensaje: error.message });
    }
});

// Obtener todas
route.get('/', async (req, resp) => {
    try {
        const datos = await Sesiones.find();
        resp.json(datos);
    } catch (error) {
        resp.status(500).json({ mensaje: error.message });
    }
});

// Actualizar
route.put('/:id', async (req, resp) => {
    try {
        const actualizado = await Sesiones.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!actualizado) {
            return resp.status(404).json({ mensaje: "Sesión no encontrada" });
        }

        resp.status(200).json(actualizado);

    } catch (error) {
        resp.status(400).json({ mensaje: error.message });
    }
});

// Eliminar
route.delete('/:id', async (req, resp) => {
    try {
        const eliminado = await Sesiones.findByIdAndDelete(req.params.id);

        if (!eliminado) {
            return resp.status(404).json({ mensaje: "Sesión no encontrada" });
        }

        resp.status(200).json({ mensaje: 'Sesión eliminada' });

    } catch (error) {
        resp.status(400).json({ mensaje: error.message });
    }
});

module.exports = route;
