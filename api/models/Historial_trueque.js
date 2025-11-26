const mongoose = require('mongoose');

const Historial_TruequeSchema = new mongoose.Schema(


    {
        Usuario_Id: {
            type: Number,
            required: true
        },
        Habilidad1: {
            type: String,
            required: true
        },
        Habilidad2: {
            type: String,
            required: true
        },
        fecha_inicio: {
            type: Date,
            required: true,
            default: Date.now
        },
        fecha_fin: {
            type: Date,
            required: true,
            default: Date.now
        },
        estado: {
            type: String,
            enum: ['Activo', 'Inactivo'],
            required: true,
            default: 'Activo'
        },
        Valoracion_final: {
            type: Number,
            required: true
        }
    }
);

module.exports = mongoose.model('HistorialTrueque', Historial_TruequeSchema);
