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

//  Update (PUT)
route.put('/:id', async (req, resp) => {
    try {
        const usuarioActualizado = await Usuario.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!usuarioActualizado) {
            return resp.status(404).json({ mesaje: "Usuario no encontrado" });
        }

        resp.status(200).json(usuarioActualizado);
    } catch (error) {
        resp.status(400).json({ mesaje: error.message });
    }
});

//  Delete

route.delete('/:id', async (req, resp) => {
    try {
        const usuarioEliminado = await Usuario.findByIdAndDelete(req.params.id);

        if (!usuarioEliminado) {
            return resp.status(404).json({ mesaje: "Usuario no encontrado" });
        }

        resp.status(200).json({ mesaje: 'Usuario Eliminado' });
    } catch (error) {
        resp.status(400).json({ mesaje: error.message });
    }
});

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