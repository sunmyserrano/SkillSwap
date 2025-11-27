const mongoose = require('mongoose');

const EstadisticasSchema = new mongoose.Schema({
    Id: Number,
    Fecha: String,
    Total_usuarios: Number,
    Intercambios_completados: Number,
    Habilidades_populares: [String]
});

module.exports = mongoose.model('Estadisticas', EstadisticasSchema);
