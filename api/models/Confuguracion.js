const mongoose = require('mongoose');

const ConfiguracionSchema = new mongoose.Schema({
    Id: Number,
    Parámetros: String,
    Descripción: String
});

module.exports = mongoose.model("Configuracion", ConfiguracionSchema);
