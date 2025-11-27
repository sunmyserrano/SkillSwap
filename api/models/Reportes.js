const mongoose = require('mongoose');

const ReportesSchema = new mongoose.Schema(
    {
        Usuario_reporte: {
            type: Number,
            required: true
        },
        Usuario_reportado: {
            type: Number,
            required: true
        },
        Intercambio_Id: {
            type: Number,
            required: true
        },
        Tipo_reporte: {
            type: String,
            required: true
        },
        Descripcion: {
            type: String,
            required: true
        },
        Fecha: {
            type: Date,
            default: Date.now
        },
        Estado: {
            type: String,
            enum: ['pendiente', 'procesado', 'cancelado'],
            default: 'pendiente'
        }
    }
);

module.exports = mongoose.model('Reportes', ReportesSchema);
