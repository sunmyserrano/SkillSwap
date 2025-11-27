const mongoose = require('mongoose');

const SesionesAgendadasSchema = new mongoose.Schema(
    {
        Intercambio_Id: {
            type: Number,
            required: true
        },
        Usuario_Id: {
            type: Number,
            required: true
        },
        Fecha: {
            type: Date,
            required: true
        },
        Hora_inicio: {
            type: String,
            required: true
        },
        Hora_fin: {
            type: String,
            required: true
        },
        Estado: {
            type: String,
            enum: ['pendiente', 'completada', 'cancelada'],
            default: 'pendiente'
        },
        Observaciones: {
            type: String,
            required: false
        }
    }
);

module.exports = mongoose.model('Sesiones_agendadas', SesionesAgendadasSchema);
