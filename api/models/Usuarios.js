const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema(


    {
        rol_id: {
            type: Number,
        },
        nombre: {
            type: String,
            required: true
        },
        apellido: {
            type: String,
            required: true
        },
        correo_electronico: {
            type: String,
            required: true
        },
        contrasena: {
            type: String,
            required: true
        },
        telefono: {
            type: String,
            required: true
        },
        fecha_registro: {
            type: Date,
            required: true,
            default: Date.now
        },
        estado: {
            type: String,
            enum: ['Activo', 'Inactivo'],
            required: true,
            default: 'Activo'
        },

        direccion: {
            type: String,
            required: true
        }
    }
);

module.exports = mongoose.model('Usuario', UsuarioSchema);
