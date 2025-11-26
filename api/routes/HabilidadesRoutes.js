const express = require('express');
const route = express.Router();

const Habilidades = require('../models/Habilidades');

//Crear Habilidades nuevo
route.post('/', async (req, resp) => {
    const { 
        nombre,
        Descripcion,
        Categoria,
        Nivel,
        Usuario_Id } = req.body;

    const nuevoHabilidades = new Habilidades(
        { 
          nombre,
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

//Obtener datos
route.get('/', async(req, resp) =>{
               try {
                         const HabilidadesDatos = await Habilidades.find();
                         resp.json(HabilidadesDatos);
               }catch(error){
                         resp.status(500).json({mesaje: error.message});
               }
      }
);

module.exports = route;