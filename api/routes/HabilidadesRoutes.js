const express = require('express');
const route = express.Router();
const Habilidades = require('../models/Habilidades');

//Crear Habilidades nuevo
route.post('/', async (req, resp) => {
     const {
          Nombre,
          Descripcion,
          Categoria,
          Nivel,
          Usuario_Id } = req.body;

     const nuevoHabilidades = new Habilidades(
          {
               Nombre,
               Descripcion,
               Categoria,
               Nivel,
               Usuario_Id
          }
     );
     try {
          const HabilidadesGuardado = await nuevoHabilidades.save();
          resp.status(201).json(HabilidadesGuardado);
     } catch (error) {
          resp.status(400).json({ mensaje: error.message });
     }
}
);

//Update put
route.put('/:id', async (req, resp) => {

     try {

          const HabilidadActualizada = await Habilidades.findByIdAndUpdate(
               req.params.id,
               req.body,
               { new: true }

          );

          if (!HabilidadActualizada) {
               return resp.status(404).json({ mesaje: "Habilidad no encontrada" });
          }

          resp.status(200).json(HabilidadActualizada);
     } catch (error) {
          resp.status(400).json({ mesaje: error.message });
     }

}
);


//Delete 
route.delete('/:id', async (req, resp) => {

     try {

          const HabilidadEliminada = await Habilidades.findByIdAndDelete(
               req.params.id,
          );

          if (!HabilidadEliminada) {
               return resp.status(404).json({ mesaje: "Habilidad no encontrada" });
          }

          resp.status(200).json({ mesaje: 'Habilidad Eliminada' });
     } catch (error) {
          resp.status(400).json({ mesaje: error.message });
     }

}
);


//Obtener datos
route.get('/', async (req, resp) => {
     try {
          const HabilidadesDatos = await Habilidades.find();
          resp.json(HabilidadesDatos);
     } catch (error) {
          resp.status(500).json({ mesaje: error.message });
     }
}
);

//Obtener Habilidades por ID
route.get('/:id', async (req, resp) => {
     try {

          const HabilidadDatos = await Habilidades.findById(req.params.id);
          resp.json(HabilidadDatos);
     } catch (error) {
          resp.status(500).json({ mesaje: error.message });
     }
}
);

module.exports = route;