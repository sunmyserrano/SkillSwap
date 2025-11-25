//Server Principal

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 6000;

//const Rutas

const usuarioRoutes = require ('./routes/UsuarioRoutes');

//Middlewares 
app.use(cors());
app.use(bodyParser.json());

//conexion hacia mongo

mongoose.connect('mongodb://localhost:27017/SkillSwap_DB')
  .then(() => console.log('Mongo DB Success'))
  .catch(err => console.log('Mongo DB error: ', err));

//Rutas
app.use('/api/usuarios', usuarioRoutes);

//Inciar el servidor, o como veremos el server.
app.listen(PORT, () => {
    console.log(`Servidor encendido https://localhost:${PORT}`);
});