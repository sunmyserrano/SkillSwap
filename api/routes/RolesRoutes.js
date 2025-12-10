const express = require('express');
const route = express.Router();
const Roles = require('../models/Roles');

// Crear rol
route.post('/', async (req, res) => {
    try {
        const { Nombre, Descripcion, Permisos } = req.body;
        if (!Nombre || !Descripcion || !Permisos) {
            return res.status(400).json({ mensaje: "Faltan datos requeridos" });
        }
        const nuevoRol = new Roles({ Nombre, Descripcion, Permisos });
        const guardado = await nuevoRol.save();
        res.status(201).json(guardado);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

// Obtener todos los roles
route.get('/', async (req, res) => {
    try {
        const roles = await Roles.find();
        res.json(roles);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

// Obtener un rol por ID
route.get('/:id', async (req, res) => {
    try {
        const rol = await Roles.findById(req.params.id);
        if (!rol) return res.status(404).json({ mensaje: "Rol no encontrado" });
        res.json(rol);
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});

// Actualizar rol
route.put('/:id', async (req, res) => {
    try {
        const { Nombre, Descripcion, Permisos } = req.body;
        if (!Nombre || !Descripcion || !Permisos) {
            return res.status(400).json({ mensaje: "Faltan datos requeridos" });
        }

        const actualizado = await Roles.findByIdAndUpdate(
            req.params.id,
            { Nombre, Descripcion, Permisos },
            { new: true }
        );

        if (!actualizado) return res.status(404).json({ mensaje: "Rol no encontrado" });

        res.json(actualizado);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

// Eliminar rol
route.delete('/:id', async (req, res) => {
    try {
        const eliminado = await Roles.findByIdAndDelete(req.params.id);
        if (!eliminado) return res.status(404).json({ mensaje: "Rol no encontrado" });
        res.json({ mensaje: "Rol eliminado" });
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
});

module.exports = route;
