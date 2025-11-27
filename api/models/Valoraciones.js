const mongoose = require('mongoose');

const ValoracionesSchema = new mongoose.Schema(
{
    Usuario_Id: { type: Number, required: true },
    Intercambio_Id: { type: Number, required: true },
    Puntuacion: { type: Number, required: true },
    Comentario: { type: String, required: true },
    Fecha: { type: Date, required: true }
}
);

module.exports = mongoose.model('Valoraciones', ValoracionesSchema);
