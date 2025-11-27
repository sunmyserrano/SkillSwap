const mongoose = require('mongoose');

const SociosSchema = new mongoose.Schema(
    {
        Nombre: {
            type: String,
            required: true
        },
        Tipo: {
            type: String,
            required: true
        },
        Contacto: {
            type: String,
            required: true
        },
        Descripcion: {
            type: String,
            required: true
        },
        URL_sitio: {
            type: String,
            required: true
        }
    }
);

module.exports = mongoose.model('Socios_Aliados', SociosSchema);
