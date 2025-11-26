const mongoose = require('mongoose');

const FavoritosSchema = new mongoose.Schema(


    {
        Usuario_Id: {
            type: Number,
            required: true
        },
        Favoritos: {
            type: String,
            required: true
        }
    }
);

module.exports = mongoose.model('Favoritos', FavoritosSchema);
