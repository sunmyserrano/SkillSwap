const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema(


    {
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
        rol_id: {
            type: Number,
            required: true
        },
        direccion: {
            type: String,
            required: true
        }
    }
);

module.exports = mongoose.model('Usuario', UsuarioSchema);
