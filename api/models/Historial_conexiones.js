const mongoose = require('mongoose');

const Historial_conexionSchema = new mongoose.Schema(


    {   Usuario_Id: {
            type: Number,
            required: true
        },
        fechaHora_inicio: {
            type: Date,
            required: true,
            default: Date.now
        },
        fechaHora_fin: {
            type: Date,
            required: true,
            default: Date.now
        },
        Dispositivo: {
            type: String,
            required: true
        }
    }
);

module.exports = mongoose.model('Historial_conexion', Historial_conexionSchema);
