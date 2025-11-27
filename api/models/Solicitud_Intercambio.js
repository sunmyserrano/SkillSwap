const mongoose = require('mongoose');

const SolicitudSchema = new mongoose.Schema(
    {
        Usuario_Id: {
            type: Number,
            required: true
        },
        Habilidad_solicitada: {
            type: String,
            required: true
        },
        Habilidad_ofrecida: {
            type: String,
            required: true
        },
        Fecha_solicitud: {
            type: Date,
            required: true
        },
        Estado: {
            type: String,
            required: true
        }
    }
);

module.exports = mongoose.model('Solicitud_Intercambio', SolicitudSchema);
