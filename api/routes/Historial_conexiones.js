const express = require('express');
const route = express.Router();

const Historial_conexion = require('../models/Historial_conexion');

//Crear Historial_conexion nuevo
route.post('/', async (req, resp) => {
    const { 
        fecha_inicio,
        fecha_fin,
        Dispositivo } = req.body;

    const nuevoHistorial_conexion = new Historial_conexion(
        { 
            fecha_inicio,
            fecha_fin,
            Dispositivo
        }
    );
    try {
        const Historial_conexionGuardado = await nuevoHistorial_conexion.save();
        resp.status(201).json(Historial_conexionGuardado);
    } catch (error) {
        resp.status(400).json({ mensaje: error.message });
    }
}
);

//Obtener datos
route.get('/', async(req, resp) =>{
               try {
                         const Historial_conexionDatos = await Historial_conexion.find();
                         resp.json(Historial_conexionDatos);
               }catch(error){
                         resp.status(500).json({mesaje: error.message});
               }
      }
);

module.exports = route;