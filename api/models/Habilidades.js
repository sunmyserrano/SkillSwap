const mongoose = require('mongoose');

const HabilidadesSchema = new mongoose.Schema(


    {
        Nombre: {
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
            enum: ["Basico", "Intermedio", "Avanzado"], // recomendado
            required: true
        },
        Usuario_Id: {
            type: String,
            required: true
        }
    }
);

module.exports = mongoose.model('Habilidades', HabilidadesSchema);
