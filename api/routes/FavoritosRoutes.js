const express = require('express');
const route = express.Router();

const Favoritos = require('../models/Favoritos');

//Crear Favoritos nuevo
route.post('/', async (req, resp) => {
    const { 
        Usuario_Id,
        Favoritos } = req.body;

    const nuevoFavoritos = new Favoritos(
        { 
          Usuario_Id,
          Favoritos,
        }
    );
    try {
        const FavoritosGuardado = await nuevoFavoritos.save();
        resp.status(201).json(FavoritosGuardado);
    } catch (error) {
        resp.status(400).json({ mensaje: error.message });
    }
}
);

//Obtener datos
route.get('/', async(req, resp) =>{
               try {
                         const FavoritosDatos = await Favoritos.find();
                         resp.json(FavoritosDatos);
               }catch(error){
                         resp.status(500).json({mesaje: error.message});
               }
      }
);

module.exports = route;