const express = require('express');
const route = express.Router();

const Usuario = require('../models/Usuarios')

//Crear Usuario nuevo
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

    const nuevoUsuario = new Usuario(
        {
            rol_id,
            nombre,
            apellido,
            correo_electronico,
            contrasena,
            telefono,
            fecha_registro,
            estado,
            direccion
        }
    );
    try {
        const usuarioGuardado = await nuevoUsuario.save();
        resp.status(201).json(usuarioGuardado);
    } catch (error) {
        resp.status(400).json({ mensaje: error.message });
    }
}
);

//Obtener datos
route.get('/', async(req, resp) =>{
               try {
                         const usuariosDatos = await Usuario.find();
                         resp.json(usuariosDatos);
               }catch(error){
                         resp.status(500).json({mesaje: error.message});
               }
      }
);

module.exports = route;