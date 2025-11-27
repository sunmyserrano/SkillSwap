const mongoose = require('mongoose');

const RolesSchema = new mongoose.Schema(
    {
        Nombre: {
            type: String,
            required: true
        },
        Descripcion: {
            type: String,
            required: true
        },
        Permisos: {
            type: Array,
            required: true
        }
    }
);

module.exports = mongoose.model('Roles', RolesSchema);
