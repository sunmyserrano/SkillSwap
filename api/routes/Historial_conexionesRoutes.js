const express = require('express');
const route = express.Router();

const Historial_conexion = require('../models/Historial_conexiones');

//Crear Historial_conexion nuevo
route.post('/', async (req, resp) => {
    const { 
        Usuario_Id,
        fecha_inicio,
        fecha_fin,
        Dispositivo } = req.body;

    const nuevoHistorial_conexion = new Historial_conexion(
        { 
            Usuario_Id,
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


//Update put
route.put('/:id', async (req, resp) => {
        try {
            const Historial_conexionActualizado = await Historial_conexion.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            if (!Historial_conexionActualizado) {
                return resp.status(404).json({ mesaje: "Historial de conexion no encontrado" });
            }
            resp.status(200).json(Historial_conexionActualizado);
        } catch (error) {
            resp.status(400).json({ mesaje: error.message });
        }
}
);

//Delete 
route.delete('/:id', async (req, resp) => {
     try {
          const Historial_conexionEliminado = await Historial_conexion.findByIdAndDelete(
               req.params.id,
          );
            if (!Historial_conexionEliminado) {
                return resp.status(404).json({ mesaje: "Historial de conexion no encontrado" });
            }
          resp.status(200).json({ mesaje: 'Historial de conexion Eliminado' });
     } catch (error) {
          resp.status(400).json({ mesaje: error.message });
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