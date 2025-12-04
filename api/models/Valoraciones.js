const mongoose = require('mongoose');

const ValoracionesSchema = new mongoose.Schema({
    Intercambio_Id: {
        type: Number,
        required: true
    },
    Puntuacion: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    Comentario: {
        type: String,
        required: true
    },
    Fecha: {
        type: Date,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Valoraciones', ValoracionesSchema);
