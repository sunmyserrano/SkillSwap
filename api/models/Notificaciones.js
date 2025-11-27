const mongoose = require('mongoose');

const NotificacionesSchema = new mongoose.Schema(
    {
        Usuario_Id: {
            type: Number,
            required: true
        },
        Titulo: {
            type: String,
            required: true
        },
        Mensaje: {
            type: String,
            required: true
        },
        Tipo: {
            type: String,
            enum: ['sistema', 'intercambio', 'alerta', 'recordatorio'],
            required: true
        },
        Fecha_envio: {
            type: Date,
            default: Date.now
        },
        Estado: {
            type: String,
            enum: ['leída', 'no leída'],
            default: 'no leída'
        }
    }
);

module.exports = mongoose.model('Notificaciones', NotificacionesSchema);
