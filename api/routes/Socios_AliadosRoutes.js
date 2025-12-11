const express = require('express');
const route = express.Router();
const Socios = require('../models/Socios_Aliados');

route.post('/', async (req, resp) => {
    const nuevoSocio = new Socios(req.body);

    try {
        const guardado = await nuevoSocio.save();
        resp.status(201).json(guardado);
    } catch (error) {
        resp.status(400).json({ mensaje: error.message });
    }
});

route.get('/', async (req, resp) => {
    try {
        const datos = await Socios.find();
        resp.json(datos);
    } catch (error) {
        resp.status(500).json({ mensaje: error.message });
    }
});

// ESTA RUTA FALLABA POR LA LLAVE EXTRA AL FINAL DEL ARCHIVO
route.get('/:id', async (req, resp) => {
    try {
        const socio = await Socios.findById(req.params.id);

        if (!socio) {
            return resp.status(404).json({ mensaje: "Socio no encontrado" });
        }

        resp.status(200).json(socio);

    } catch (error) {
        resp.status(400).json({ mensaje: error.message });
    }
});

route.put('/:id', async (req, resp) => {
    try {
        const actualizado = await Socios.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );

        if (!actualizado) {
            return resp.status(404).json({ mensaje: "Socio no encontrado" });
        }

        resp.status(200).json(actualizado);

    } catch (error) {
        resp.status(400).json({ mensaje: error.message });
    }
});

route.delete('/:id', async (req, resp) => {
    try {
        const eliminado = await Socios.findByIdAndDelete(req.params.id);

        if (!eliminado) {
            return resp.status(404).json({ mensaje: "Socio no encontrado" });
        }

        resp.status(200).json({ mensaje: 'Socio eliminado' });

    } catch (error) {
        resp.status(400).json({ mensaje: error.message });
    }
});

route.get('/test', (req, res) => {
    res.send("Router Socios Aliados funcionando");
});

module.exports = route;
