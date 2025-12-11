const express = require('express');
const route = express.Router();
const Favoritos = require('../models/Favoritos');
const FavoritosModel = require('../models/Favoritos');

// Crear Favorito
route.post('/', async (req, resp) => {
    try {

        const { Usuario_Id, Favoritos: datosFavoritos } = req.body;

        // Validar estructura
        if (!Usuario_Id || !datosFavoritos?.Tipo || !datosFavoritos?.Favorito_Id) {
            return resp.status(400).json({
                mensaje: "Los campos Usuario_Id, Favoritos.Tipo y Favoritos.Favorito_Id son obligatorios"
            });
        }

        const nuevoFavorito = new FavoritosModel({
            Usuario_Id,
            Favoritos: {
                Tipo: datosFavoritos.Tipo,
                Favorito_Id: datosFavoritos.Favorito_Id
            }
        });

        const guardado = await nuevoFavorito.save();
        resp.status(201).json(guardado);

    } catch (error) {
        resp.status(400).json({ mensaje: error.message });
    }
});


//Update put
route.put('/:id', async (req, resp) => {

    try {

        const FavoritoActualizado = await Favoritos.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }

        );

        if (!FavoritoActualizado) {
            return resp.status(404).json({ mesaje: "Favorito no encontrado" });
        }

        resp.status(200).json(FavoritoActualizado);
    } catch (error) {
        resp.status(400).json({ mesaje: error.message });
    }

}
);


//Delete 
route.delete('/:id', async (req, resp) => {

    try {

        const FavoritoEliminado = await Favoritos.findByIdAndDelete(
            req.params.id,
        );

        if (!FavoritoEliminado) {
            return resp.status(404).json({ mesaje: "Favorito no encontrado" });
        }

        resp.status(200).json({ mesaje: 'Favorito Eliminado' });
    } catch (error) {
        resp.status(400).json({ mesaje: error.message });
    }

}
);

//Obtener todos los favoritos
route.get('/', async (req, resp) => {
    try {
        const FavoritosDatos = await Favoritos.find();
        resp.json(FavoritosDatos);
    } catch (error) {
        resp.status(500).json({ mesaje: error.message });
    }
}
);

//Obtener favorito por id
route.get('/:id', async (req, resp) => {
    try {
        const FavoritoData = await Favoritos.findById(req.params.id);
        resp.json(FavoritoData);
    } catch (error) {
        resp.status(500).json({ mesaje: error.message });
    }
}
);

module.exports = route;