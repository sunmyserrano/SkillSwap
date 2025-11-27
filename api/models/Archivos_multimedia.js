const mongoose = require("mongoose");

const ArchivosMultimediaSchema = new mongoose.Schema({
    Id: Number,
    Usuario_Id: Number,
    Tipo: String,
    URL: String,
    Fecha_subido: String,
    Descripción: String,
    Intercambio_Id: Number
});

module.exports = mongoose.model("Archivos_multimedia", ArchivosMultimediaSchema);
