const express = require('express');
const route = express.Router();

const Reportes = require('../models/Reportes');

// Crear reporte
route.post('/', async (req, resp) => {
    const {
        Usuario_reporte,
        Usuario_reportado,
        Intercambio_Id,
        Tipo_reporte,
        Descripcion,
        Estado
    } = req.body;

    const nuevoReporte = new Reportes({
        Usuario_reporte,
        Usuario_reportado,
        Intercambio_Id,
        Tipo_reporte,
        Descripcion,
        Estado
    });

    try {
        const guardado = await nuevoReporte.save();
        resp.status(201).json(guardado);
    } catch (error) {
        resp.status(400).json({ mensaje: error.message });
    }
});

// Obtener todos
route.get('/', async (req, resp) => {
    try {
        const datos = await Reportes.find();
        resp.json(datos);
    } catch (error) {
        resp.status(500).json({ mensaje: error.message });
    }
});

// Actualizar
route.put('/:id', async (req, resp) => {
    try {
        const actualizado = await Reportes.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!actualizado) {
            return resp.status(404).json({ mensaje: "Reporte no encontrado" });
        }

        resp.status(200).json(actualizado);

    } catch (error) {
        resp.status(400).json({ mensaje: error.message });
    }
});

// Eliminar
route.delete('/:id', async (req, resp) => {
    try {
        const eliminado = await Reportes.findByIdAndDelete(req.params.id);

        if (!eliminado) {
            return resp.status(404).json({ mensaje: "Reporte no encontrado" });
        }

        resp.status(200).json({ mensaje: 'Reporte eliminado' });

    } catch (error) {
        resp.status(400).json({ mensaje: error.message });
    }
});

module.exports = route;
