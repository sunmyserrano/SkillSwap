//Server Principal

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 6000;

//const Rutas

const usuarioRoutes = require ('./routes/UsuarioRoutes');
const FavoritosRoutes = require ('./routes/FavoritosRoutes');
const HabilidadesRoutes = require ('./routes/HabilidadesRoutes');
const Historial_conexionesRoutes = require ('./routes/Historial_conexionesRoutes');
const Historial_truequeRoutes = require ('./routes/Historial_truequeRoutes');


//Middlewares 
app.use(cors());
app.use(bodyParser.json());

//conexion hacia mongo

mongoose.connect('mongodb://localhost:27017/SkillSwap_DB')
  .then(() => console.log('Mongo DB Success'))
  .catch(err => console.log('Mongo DB error: ', err));

//Rutas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/favoritos', FavoritosRoutes);
app.use('/api/habilidades', HabilidadesRoutes);
app.use('/api/historial_conexiones', Historial_conexionesRoutes);
app.use('/api/historial_trueque', Historial_truequeRoutes);

//Inciar el servidor, o como veremos el server.
app.listen(PORT, () => {
    console.log(`Servidor encendido https://localhost:${PORT}`);
});