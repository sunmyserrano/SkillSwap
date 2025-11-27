const express = require('express');
const route = express.Router();

const Notificaciones = require('../models/Notificaciones');

// Crear notificación
route.post('/', async (req, resp) => {
    const {
        Usuario_Id,
        Titulo,
        Mensaje,
        Tipo,
        Estado
    } = req.body;

    const nuevaNotificacion = new Notificaciones({
        Usuario_Id,
        Titulo,
        Mensaje,
        Tipo,
        Estado
    });

    try {
        const guardado = await nuevaNotificacion.save();
        resp.status(201).json(guardado);
    } catch (error) {
        resp.status(400).json({ mensaje: error.message });
    }
});

// Obtener todas
route.get('/', async (req, resp) => {
    try {
        const datos = await Notificaciones.find();
        resp.json(datos);
    } catch (error) {
        resp.status(500).json({ mensaje: error.message });
    }
});

// Actualizar
route.put('/:id', async (req, resp) => {
    try {
        const actualizado = await Notificaciones.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!actualizado) {
            return resp.status(404).json({ mensaje: "Notificación no encontrada" });
        }

        resp.status(200).json(actualizado);

    } catch (error) {
        resp.status(400).json({ mensaje: error.message });
    }
});

// Eliminar
route.delete('/:id', async (req, resp) => {
    try {
        const eliminado = await Notificaciones.findByIdAndDelete(req.params.id);

        if (!eliminado) {
            return resp.status(404).json({ mensaje: "Notificación no encontrada" });
        }

        resp.status(200).json({ mensaje: 'Notificación eliminada' });

    } catch (error) {
        resp.status(400).json({ mensaje: error.message });
    }
});

module.exports = route;
