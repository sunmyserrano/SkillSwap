const express = require('express');
const route = express.Router();

const Historial_trueque = require('../models/Historial_trueque');

//Crear Historial_trueque nuevo
route.post('/', async (req, resp) => {
    const { 
        Usuario_Id,
        Habilidad1,
        Habilidad2,
        fecha_inicio,
        fecha_fin,
        estado,
        Valoracion_final } = req.body;

    const nuevoHistorial_trueque = new Historial_trueque(
        { 
            Usuario_Id,
            Habilidad1,
            Habilidad2,
            fecha_inicio,
            fecha_fin,
            estado,
            Valoracion_final
        }
    );
    try {
        const Historial_truequeGuardado = await nuevoHistorial_trueque.save();
        resp.status(201).json(Historial_truequeGuardado);
    } catch (error) {
        resp.status(400).json({ mensaje: error.message });
    }
}
);

//Update put
route.put('/:id', async (req, resp) => {
        try {
            const Historial_truequeActualizado = await Historial_trueque.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            if (!Historial_truequeActualizado) {
                return resp.status(404).json({ mesaje: "Historial de trueque no encontrado" });
            }
            resp.status(200).json(Historial_truequeActualizado);
        } catch (error) {
            resp.status(400).json({ mesaje: error.message });
        }   
}
);

//Delete 
route.delete('/:id', async (req, resp) => {
     try {
            const Historial_truequeEliminado = await Historial_trueque.findByIdAndDelete(
                req.params.id,
              );
            if (!Historial_truequeEliminado) {
                return resp.status(404).json({ mesaje: "Historial de trueque no encontrado" });
            }
            resp.status(200).json({ mesaje: 'Historial de trueque Eliminado' });
        } catch (error) {
            resp.status(400).json({ mesaje: error.message });
        }
}
);

//Obtener datos
route.get('/', async(req, resp) =>{
               try {
                         const Historial_truequeDatos = await Historial_trueque.find();
                         resp.json(Historial_truequeDatos);
               }catch(error){
                         resp.status(500).json({mesaje: error.message});
               }
      }
);

module.exports = route;