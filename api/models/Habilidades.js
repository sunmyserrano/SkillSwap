const mongoose = require('mongoose');

const HabilidadesSchema = new mongoose.Schema(


    {
        nombre: {
            type: String,
            required: true
        },
        Descripcion: {
            type: String,
            required: true
        },
        Categoria: {
            type: String,
            required: true
        },
        Nivel: {
            type: String,
            required: true
        }
    }
);

module.exports = mongoose.model('Habilidades', HabilidadesSchema);
