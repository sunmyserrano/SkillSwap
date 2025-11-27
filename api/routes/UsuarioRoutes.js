const express = require('express');
const route = express.Router();

const Usuario = require('../models/Usuarios')


// Crear Usuario nuevo

route.post('/', async (req, resp) => {
    const { rol_id,
        nombre,
        apellido,
        correo_electronico,
        contrasena,
        telefono,
        fecha_registro,
        estado,
        direccion } = req.body;

    const nuevoUsuario = new Usuario({
        rol_id,
        nombre,
        apellido,
        correo_electronico,
        contrasena,
        telefono,
        fecha_registro,
        estado,
        direccion
    });

    try {
        const usuarioGuardado = await nuevoUsuario.save();
        resp.status(201).json(usuarioGuardado);
    } catch (error) {
        resp.status(400).json({ mensaje: error.message });
    }
});



// Obtener todos

route.get('/', async (req, resp) => {
    try {
        const usuariosDatos = await Usuario.find();
        resp.json(usuariosDatos);
    } catch (error) {
        resp.status(500).json({ mensaje: error.message });
    }
});



// Obtener uno por ID

route.get('/:id', async (req, resp) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (!usuario) return resp.status(404).json({ mensaje: "Usuario no encontrado" });
        resp.json(usuario);
    } catch (error) {
        resp.status(500).json({ mensaje: error.message });
    }
});



// Actualizar usuario

route.put('/:id', async (req, resp) => {
    try {
        const usuarioActualizado = await Usuario.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!usuarioActualizado) {
            return resp.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        resp.json(usuarioActualizado);
    } catch (error) {
        resp.status(400).json({ mensaje: error.message });
    }
});



// Eliminar usuario

route.delete('/:id', async (req, resp) => {
    try {
        const usuarioEliminado = await Usuario.findByIdAndDelete(req.params.id);

        if (!usuarioEliminado) {
            return resp.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        resp.json({ mensaje: "Usuario eliminado" });
    } catch (error) {
        resp.status(500).json({ mensaje: error.message });
    }
});


module.exports = route;
