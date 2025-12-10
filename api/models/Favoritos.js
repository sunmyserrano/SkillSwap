const mongoose = require('mongoose');

const FavoritosSchema = new mongoose.Schema({
    Usuario_Id: {
        type: String,
        required: true
    },
    Favoritos: {
        Tipo: {
            type: String,
            enum: ["usuario", "habilidad"], // recomendado
            required: true
        },
        Favorito_Id: {
            type: String,
            required: true
        }
    }
});


module.exports = mongoose.model('Favoritos', FavoritosSchema);
