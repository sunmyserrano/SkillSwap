const express = require('express');
const router = express.Router();
const Valoraciones = require('../models/Valoraciones');

// Crear Valoración
router.post('/', async (req, res) => {
    try {
        const nuevaValoracion = new Valoraciones(req.body);
        const guardada = await nuevaValoracion.save();
        res.status(201).json(guardada);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

// Listar todas
router.get('/', async (req, res) => {
    try {
        const datos = await Valoraciones.find();
        res.json(datos);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

// Obtener por ID
router.get('/:id', async (req, res) => {
    try {
        const valoracion = await Valoraciones.findById(req.params.id);
        if (!valoracion) return res.status(404).json({ mensaje: "Valoración no encontrada" });
        res.json(valoracion);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

// Actualizar por ID
router.put('/:id', async (req, res) => {
    try {
        const actualizado = await Valoraciones.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!actualizado) return res.status(404).json({ mensaje: "Valoración no encontrada" });
        res.json(actualizado);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

// Eliminar por ID
router.delete('/:id', async (req, res) => {
    try {
        const eliminado = await Valoraciones.findByIdAndDelete(req.params.id);
        if (!eliminado) return res.status(404).json({ mensaje: "Valoración no encontrada" });
        res.json({ mensaje: "Valoración eliminada" });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

module.exports = router;