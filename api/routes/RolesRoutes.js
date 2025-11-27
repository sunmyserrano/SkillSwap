const express = require('express');
const route = express.Router();

const Roles = require('../models/Roles');

// Crear rol
route.post('/', async (req, resp) => {
    const { Nombre, Descripcion, Permisos } = req.body;

    const nuevoRol = new Roles({ Nombre, Descripcion, Permisos });

    try {
        const guardado = await nuevoRol.save();
        resp.status(201).json(guardado);
    } catch (error) {
        resp.status(400).json({ mensaje: error.message });
    }
});

// Obtener todos
route.get('/', async (req, resp) => {
    try {
        const datos = await Roles.find();
        resp.json(datos);
    } catch (error) {
        resp.status(500).json({ mensaje: error.message });
    }
});

// Actualizar
route.put('/:id', async (req, resp) => {
    try {
        const actualizado = await Roles.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!actualizado) {
            return resp.status(404).json({ mensaje: "Rol no encontrado" });
        }

        resp.status(200).json(actualizado);

    } catch (error) {
        resp.status(400).json({ mensaje: error.message });
    }
});

// Eliminar
route.delete('/:id', async (req, resp) => {
    try {
        const eliminado = await Roles.findByIdAndDelete(req.params.id);

        if (!eliminado) {
            return resp.status(404).json({ mensaje: "Rol no encontrado" });
        }

        resp.status(200).json({ mensaje: 'Rol eliminado' });

    } catch (error) {
        resp.status(400).json({ mensaje: error.message });
    }
});

module.exports = route;
