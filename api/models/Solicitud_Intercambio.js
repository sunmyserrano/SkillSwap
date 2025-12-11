
const mongoose = require("mongoose");

const SolicitudIntercambioSchema = new mongoose.Schema({
    Id: {
        type: Number,
        required: true,
        unique: true
    },
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
        enum: ["Pendiente", "Aceptada", "Rechazada", "Cancelada"],
        default: "Pendiente"
    }
});


module.exports = mongoose.model("Solicitud_intercambio", SolicitudIntercambioSchema);