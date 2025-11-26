const mongoose = require('mongoose');

const FavoritosSchema = new mongoose.Schema(


    {
        nombre: {
            type: String,
            required: true
        },
        Descripcion: {
            type: String,
            required: true
        },
        Favoritos: {
            type: String,
            required: true
        },
        Nivel: {
            type: String,
            required: true
        }
    }
);

module.exports = mongoose.model('Favoritos', FavoritosSchema);
